"use-strict";

const dbService = require("../db.js");
const collectionUtils = dbService({
    "collectionShema": require("../model/user"), "collectionName": "user"
});

module.exports = class UserController {
    static getAll() {
        return collectionUtils.getAll();
    }
    
    static getById(id) {
        return collectionUtils.getById(id);
    }
    
    static create(details) {
        let _body = details;
        return collectionUtils.newDoc(_body);
    }
    
    static delete(id) {
        let _id = id;        
        return collectionUtils.deleteDoc(_id);
    }
}
