"use-strict";

const dbService = require("../db.js");
const collectionUtils = dbService({
    "collectionShema": require("../model/user"), "collectionName": "User"
}); 

module.exports = class UserController {
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

    static findWithDetails(details) {
        return collectionUtils.findWithDetails(details);
    }
}
