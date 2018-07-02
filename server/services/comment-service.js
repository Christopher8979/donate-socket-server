var BaseCtrl = require('./base-service');
var commentModel = require('../model/comment');
var auth = require('../auth');
var postService = require('./post-service');

var commentCtrl = new BaseCtrl(commentModel);

// Update comments count on post on addition comment.
commentCtrl.insert = function (comment, cb) {
    var obj = new this.model(comment);
    obj.save(function (err, comment) {
        if (err) {
            return cb(err, null);
        }

        postService = require('./post-service');
        postService.getDetails({
            id: comment.post,
            fields: ['commentCount']
        }, (err, details) => {
            if (err) {
                return cb(err, null);
            }

            if (!details) {
                return cb({ message: 'post ID is not valid' }, null);
            }

            postService.update({
                _id: comment.post,
                commentCount: details.commentCount + 1
            }, (err, resp) => {
                if (err) {
                    return cb(err, null);
                }
                cb(null, resp);

            });
        });

    });
};

// Update comments count on post on deletion of comment
commentCtrl.delete = function (details, cb) {
    _this = this;
    // Decrement first then delete because once child reference is gone then parent will not be accessable
    postService = require('./post-service');
    postService.getDetails({
        id: details.postID,
        fields: ['commentCount']
    }, (err, resp) => {
        if (err) {
            return cb(err, null);
        }

        if (!resp) {
            return cb({
                message: 'Post with this ID is not present.'
            }, null);
        }

        postService.update({
            _id: details.postID,
            commentCount: resp.commentCount - 1
        }, (err, resp) => {
            if (err) {
                return cb(err, null);
            }

            _this.model.findOneAndRemove({ _id: details.id }, function (err) {
                if (err) {
                    return cb(err, null);
                }
                cb(null, {});
            });
        });
    });
};

// Method to get comments on a post.
commentCtrl.fetchPostComments = function (postID, cb) {
    if (!postID) {
        return cb({
            "message": 'Send Post ID to fetch all comments'
        }, null);
    }
    this.model.find({ post: postID })
        .populate('postedBy', 'name emailID type')
        .sort({ createdAt: 'desc' })
        .lean()
        .exec(function (err, docs) {
            if (err) {
                return cb(err, null);
            }
            cb(null, docs);
        });
};

module.exports = commentCtrl;
