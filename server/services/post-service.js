var BaseCtrl = require('./base-service');
var postModel = require('../model/post');
var auth = require('../auth');
var commentService = require('./comment-service');


var postCtrl = new BaseCtrl(postModel);


postCtrl.get = function(id, cb) {
    this
        .model
        .findOne({ _id: id })
        .populate('createdBy', 'name email')
        .lean()
        .exec(function (err, post) {
        if (err) {
            return cb(err, null);
        }

        commentService.fetchPostComments(post._id, (err, comments) => {
            if (err) {
                return cb(err, null);
            }

            post.comments = comments;
            post.donationHistory = [];
    
            return cb(null, post);
            
        });
    });
};

postCtrl.getLimitedResults = function (cb) {
    this.model.find({})
        .populate('createdBy', 'name email')
        .sort({createdAt: 'desc'})
        .limit(process.env.FEEDS_LIMIT || 5)
        .lean()
        .exec(function (err, docs) {
        if (err) {
            return cb(err, null);
        }
        cb(null, docs);
    });
};

postCtrl.cumulativeFilter = function (filterDetails, cb) {
    filterDetails.title = "/.*" + (filterDetails.title ? filterDetails.title : "") + ".*/";
    
    this.model.find(filterDetails)
        .populate('createdBy', 'name email')
        .sort({createdAt: 'desc'})
        .lean()
        .exec(function (err, docs) {
        if (err) {
            return cb(err, null);
        }
        cb(null, docs);
    });
};

module.exports = postCtrl;
