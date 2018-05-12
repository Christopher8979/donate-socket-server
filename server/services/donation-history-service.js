"use-strict";

const dbService = require("../db.js");
const collectionUtils = dbService({
    "collectionShema": require("../model/donation-history"), "collectionName": "DonationHistory"
});

module.exports = class DonationHistoryController {
    static getAll() {
        return collectionUtils.getAll();
    }
    
    static getById(id) {
        return collectionUtils.getById(id);
    }
    
    static create(_body) {
        return collectionUtils.newDoc(_body);
    }
    
    static delete(_id) {
        return collectionUtils.deleteDoc(_id);
    }
}
