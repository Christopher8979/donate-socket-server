"use-strict";

const dbService = require("../db.js");
const collectionUtils = dbService({
    "collectionShema": require("../model/post"), "collectionName": "Post"
});

module.exports = class PostController {
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

    static fetchAndUpdate(details) {
        return collectionUtils.fetchAndUpdate(details._id, details);
    }

    static getLimitedResults() {
        return collectionUtils.getLimited();
    }

    static cumulativeFilter(filterDetails) {
        if (filterDetails._id) {
            return collectionUtils.getById(filterDetails._id);
        } else {
            filterDetails.title = "/.*" + (filterDetails.title ? filterDetails.title : "") + ".*/";
            return collectionUtils.filterWith(filterDetails);
        }
    }
    
}
