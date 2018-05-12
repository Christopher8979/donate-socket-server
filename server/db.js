"use strict";

let mongoose = require("mongoose");
const Promise = require("bluebird");
const _ = require("lodash");

module.exports = (details) => {

    const COLLECTION =  mongoose.model(details.collectionName, details.collectionShema);       
    
    details.collectionShema.statics.getAll = () => {
        return new Promise((resolve, reject) => {
            let _query = {};
    
            COLLECTION.find(_query)
                .exec((err, docs) => {
                  err ? reject(err)
                      : resolve(docs);
                });
        });
    };
    
    details.collectionShema.statics.getById = (id) => {
        return new Promise((resolve, reject) => {
            if (!id) {
              return reject(new TypeError("Id is not defined."));
            }
    
            COLLECTION.findById(id)
                .exec((err, docs) => {
                  err ? reject(err)
                      : resolve(docs);
                });
        });
    }
    
    details.collectionShema.statics.newDoc = (doc) => {
        return new Promise((resolve, reject) => {
          if (!_.isObject(doc)) {
              return reject(new TypeError("Provided document/object is not a valid object."));
          }
    
          let _collection = new COLLECTION(doc);

          _collection.save((err, saved) => {
            return err ? reject(err)
                : resolve(saved);
          });
        });
    }
    
    details.collectionShema.statics.deleteDoc = (id) => {
        return new Promise((resolve, reject) => {
            if (!_.isString(id)) {
                return reject(new TypeError("Id is not a valid string."));
            }
    
            COLLECTION.findByIdAndRemove(id)
                .exec((err, deleted) => {
                  err ? reject(err)
                      : resolve();
                });
        });
    }


    details.collectionShema.statics.findWithDetails = (details) => {
        return new Promise((resolve, reject) => {
    
            let _query = details;
            
            COLLECTION.find(_query)
                .exec((err, docs) => {
                    err ? reject(err)
                        : resolve(docs);
                });

        });
    }
    
    details.collectionShema.statics.fetchAndUpdate = (id, details) => {
        return new Promise((resolve, reject) => {

            delete details._id;
            
            COLLECTION.findByIdAndUpdate(id, details)
                .exec((err, docs) => {
                    err ? reject(err)
                        : resolve(docs);
                });

        });
    }

    return COLLECTION;
}