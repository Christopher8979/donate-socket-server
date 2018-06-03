var BaseCtrl = require('./base-service');
var donationModel = require('../model/donation');
var postService = require('./post-service');

var donationCtrl = new BaseCtrl(donationModel);

// Update donations count on post on addition of donation.
donationCtrl.insert = function (donation, cb) {

    postService = require('./post-service');
    postService.getDetails({
        id : donation.post,
        fields: ['donationCount', 'quantityInHand', 'quantityRequired', 'isPostActive']
    }, (err, details) => {
        if (err) {
            return cb(err, null);
        }

        if (!details.isPostActive){
            return cb({
                "reason": "Post is inactive or closed",
                "solution": "Refresh post to get updated post details",
                "postCLosed": true
            }, null);
        }

        if (details.quantityInHand + donation.quantityOffered > details.quantityRequired) {
            return cb({
                "reason": "Offer quantity is greater that required",
                "solution": "Refresh post to get updated post details",
                "offeredMore": true
            }, null);
        }

        var obj = new this.model(donation);
        obj.save(function (err, donation) {
            if (err) {
                return cb(err, null);
            }

            var fieldsToUpdate = {
                _id : donation.post,
                donationCount: details.donationCount + 1,
                quantityInHand: details.quantityInHand + donation.quantityOffered,
            }

            if(details.quantityInHand + donation.quantityOffered === details.quantityRequired) {
                fieldsToUpdate.isPostActive = false
            }

            postService.update(fieldsToUpdate, (err, resp) => {
                if (err) {
                    return cb(err, null);
                }
                cb(null, donation);
            });
        });

    });
};

// As of now donation cannot be deleted. App can be extended later

// Method to get comments on a post.
donationCtrl.fetchPostDonations = function (postID, cb) {
    this.model.find({ post: postID })
        .populate('donationBy', 'name emailID')
        .sort({createdAt: 'desc'})
        .lean()
        .exec(function (err, docs) {
        if (err) {
            return cb(err, null);
        }
        cb(null, docs);
    });
};

module.exports = donationCtrl;
