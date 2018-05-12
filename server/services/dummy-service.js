"use-strict";

const dbService = require("../db.js");
const collectionUtils = dbService({
    "collectionShema": require("../model/dummy"), "collectionName": "DUMMY"
});

module.exports = class DummyController {
    static getAll() {
        return collectionUtils.getAll();
    }
    
    static getById(id) {
        collectionUtils
          .getById(id)
          .then(doc => doc)
          .catch(error => error);
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
