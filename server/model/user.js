"use strict";

const mongoose = require("mongoose");

const UserSchema = {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    emailID: { type: String, required: true, trim: true, unique: true },
    mobile: { type: Number, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    ID: { type: Number, required: false, trim: true }
}

module.exports = mongoose.Schema(UserSchema);
