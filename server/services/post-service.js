var BaseCtrl = require('./base-service');
var postModel = require('../model/post');
var auth = require('../auth');
var commentService = require('./comment-service');
var donationService = require('./donation-service');


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


// Deletion of post is pending!

module.exports = postCtrl;
