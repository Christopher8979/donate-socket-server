const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new mongoose.Schema({
  postID: { type: Schema.Types.ObjectId, ref: 'Post' },
  reference: { type: String, required: true }
});

const User = mongoose.model('ImageReferrences', userSchema);

module.exports = User;
