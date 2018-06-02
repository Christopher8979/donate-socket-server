var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  emailID: { type: String, required: true, trim: true, unique: true },
  mobile: { type: Number, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  ID: { type: Number, required: false, trim: true }
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
