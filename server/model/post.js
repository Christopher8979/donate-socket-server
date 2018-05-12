"use strict";

const mongoose = require("mongoose");

const dummySchema = {
    first: {type: String, required:true, trim: true},
    last: {type: String, required:true, trim: true}
}

module.exports = mongoose.Schema(dummySchema);
