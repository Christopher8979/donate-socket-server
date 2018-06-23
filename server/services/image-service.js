var BaseCtrl = require('./base-service');
var imageModel = require('../model/comment');

var imageCtrl = new BaseCtrl(imageModel);

// Method to get comments on a post.
imageCtrl.fetchPostImages = function (postID, cb) {
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
