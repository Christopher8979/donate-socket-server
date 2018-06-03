var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donationSchema = new Schema({
    quantityOffered: { type: Number, required: true, trim: true },
    scheduledOn : {type: Date, required: true},
    donationBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    post: { type: Schema.Types.ObjectId, ref: 'Post' }
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;