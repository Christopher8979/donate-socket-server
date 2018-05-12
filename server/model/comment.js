"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const commentSchema = {
    description: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}

module.exports = mongoose.Schema(commentSchema);
