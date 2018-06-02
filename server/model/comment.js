var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    description: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;