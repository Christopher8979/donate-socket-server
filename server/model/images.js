var mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  postID: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  reference: { type: Schema.Types.ObjectId, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
