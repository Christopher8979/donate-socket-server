var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    commentCount: { type: Number, default: 0 },
    donationCount: { type: Number, default: 0 },
    category: { type: String, required: true, trim: true },
    quantityRequired: { type: Number, required: true, trim: true },
    quantityInHand: { type: Number, required: false, trim: true, default: 0 },
    ageOfProduct: { type: Number, required: true, trim: true },
    isPostActive: { type: Boolean, required: false, default: true},
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    lastUpdateAt:{type: Date,default: Date.now}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;