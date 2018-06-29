var BaseCtrl = require('./base-service');
var imageModel = require('../model/images');

var imageCtrl = new BaseCtrl(imageModel);

// Method to get images on a post.
imageCtrl.fetchPostImages = function (postID, cb) {
    if (!postID) {
        return cb({
            "message": 'Send Post ID to fetch all images'
        }, null);
    }
    this.model.find({ postID: postID })
        .sort({ createdAt: 'desc' })
        .lean()
        .exec(function (err, docs) {
            if (err) {
                return cb(err, null);
            }
            cb(null, docs);
        });
};

module.exports = imageCtrl;
