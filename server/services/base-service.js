
var BaseCtrl = function (model) {
    this.model = model;

    var _this = this;
    this.respondErrorMessage = function (cb, err) {
        return cb(err, null);
    };
    // Get all
    this.getAll = function (req, cb) {
        _this.model.find({}, function (err, docs) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, docs);
        });
    };
    // Count all
    this.count = function (req, cb) {
        _this.model.count(function (err, count) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, count);
        });
    };
    // Insert
    this.insert = function (details, cb) {
        var obj = new _this.model(details);
        obj.save(function (err, item) {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                cb({error: 400}, null);
            }
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, item);
        });
    };
    // Get by id
    this.get = function (req, cb) {
        _this.model.findOne({ _id: req.params.id }, function (err, item) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, item);
        });
    };
    // Update by id
    this.update = function (details, cb) {
        _this.model.findOneAndUpdate({ _id: details._id }, details, function (err) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, {});
        });
    };
    // Delete by id
    this.delete = function (req, cb) {
        _this.model.findOneAndRemove({ _id: req.params.id }, function (err) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, {});
        });
    };
    // Get only few details
    this.getDetails = function (details, cb) {
        _this.model
        .find({_id: details.id})
        .select(details.fields.join(' '))
        .exec(function (err, requiredDetails) {
            if (err) {
                return _this.respondErrorMessage(cb, err);
            }
            cb(null, requiredDetails[0]);
        });

    };

    return this;
};

module.exports = BaseCtrl;
