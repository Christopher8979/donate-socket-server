"use strict";

const mongoose = require("mongoose");


const postSchema = {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    quantityRequired: { type: Number, required: true, trim: true },
    quantityInHand: { type: Number, required: false, trim: true, default: 0},
    ageOfProduct: { type: Number, required: true, trim: true },
    postStatus: { type: String, required: false, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    donationHistory: [{type: Schema.Types.ObjectId, ref: 'DonationHistory'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}

module.exports = mongoose.Schema(postSchema);
