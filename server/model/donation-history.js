"use strict";

const mongoose = require("mongoose");


const donationSchema = {
    quantityOffered: { type: Number, required: true, trim: true },
    scheduledOn : {type: Date, required: true}
}

module.exports = mongoose.Schema(donationSchema);
