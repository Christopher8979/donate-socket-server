"use strict";

const mongoose = require("mongoose");


const commentSchema = {
    description: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}

module.exports = mongoose.Schema(commentSchema);
