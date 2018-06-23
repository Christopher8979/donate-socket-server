var async = require('async');
var BaseCtrl = require('./base-service');
var postModel = require('../model/post');
var commentService = require('./comment-service');
var donationService = require('./donation-service');
var ImageService = require('./image-service');

var postCtrl = new BaseCtrl(postModel);


postCtrl.get = function (id, cb) {
    this.model
        .findOne({ _id: id })
        .populate('postedBy', 'name emailID')
        .lean()
        .exec(function (err, post) {
            if (err) {
                return cb(err, null);
            }

            if (post === null) {
                return cb({
                    'reason': 'post not found'
                }, null);
            }

            commentService.fetchPostComments(post._id, (err, comments) => {
                if (err) {
                    return cb(err, null);
                }

                post.comments = comments;

                donationService.fetchPostDonations(post._id, (err, donations) => {
                    if (err) {
                        return cb(err, null);
                    }

                    post.donationHistory = donations;

                    post.lastUpdateAt = new Date(post.lastUpdateAt);
                    post.createdAt = new Date(post.createdAt);
                    return cb(null, post);

                });

            });
        });
};

postCtrl.getLimitedResults = function (cb) {
    this.model.find({})
        .populate('postedBy', 'name emailID')
        .sort({ createdAt: 'desc' })
        .limit(parseInt(process.env.FEEDS_LIMIT, 10) || 5)
        .lean()
        .exec(function (err, docs) {
            if (err) {
                return cb(err, null);
            }
            cb(null, docs);
        });
};

postCtrl.cumulativeFilter = function (filterDetails, cb) {
    // filterDetails.title = "/^.*" + (filterDetails.title ? filterDetails.title : "") + ".*$/";
    // filterDetails.title = { $search: filterDetails.title }
    console.log(filterDetails);
    this.model.find(filterDetails)
        .populate('postedBy', 'name emailID')
        .sort({ createdAt: 'desc' })
        .lean()
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
                return cb(err, null);
            }
            cb(null, docs);
        });
};

postCtrl.userPosts = function (useID, cb) {
    this.model.find({ postedBy: useID })
        .populate('postedBy', 'name emailID')
        .sort({ createdAt: 'desc' })
        .lean()
        .exec(function (err, docs) {
            if (err) {
                console.log(err);
                return cb(err, null);
            }
            cb(null, docs);
        });
}

postCtrl.getAll = function (cb) {
    this.model.find({})
        .populate('postedBy', 'name emailID')
        .sort({ createdAt: 'desc' })
        .lean()
        .exec(function (err, docs) {
            if (err) {
                return cb(err, null);
            }
            cb(null, docs);
        });
}


postCtrl.insert = function (details, cb) {

    this.model(details)
        .save()
        .then(function (savedPost) {
            async.each(details.images, (image, errCB) => {

                console.log({
                    postID: savedPost._id.toString(),
                    reference: image.toString()
                });


                ImageService.insert({
                    postID: savedPost._id.toString(),
                    reference: image.toString()
                }, (err, savedImage) => {
                    if (err) {
                        console.log(err);
                        return errCB(err, null);
                    }
                    errCB();
                })
            }, (err) => {
                if (err) {
                    console.log(err);
                    return cb(err, null);
                }

                cb(null, savedPost);
            });
        })
        .catch(function (err) {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                cb({ error: 400 }, null);
            }
            if (err) {
                console.log(err);
                return cb(err, null);
            }
        });
}


// Deletion of post is pending!

module.exports = postCtrl;
