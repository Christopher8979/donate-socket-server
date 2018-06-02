var BaseCtrl = require('./base-service');
var userModel = require('../model/user');
var auth = require('../auth');

var userCtrl = new BaseCtrl(userModel);


userCtrl.login = function (details, cb) {
    this.model.findOne({ emailID: details.emailID }, function (err, user) {
        if (!user) {
            return cb({errpr:401}, null);
        }

        user.comparePassword(details.password, function (error, isMatch) {
            if (!isMatch) {
                return cb({error:403}, null);
            }

            var token = auth.createJWToken({
                user: user
            });

            cb(null, {
                token: token,
                user: user.toJSON()
            });
        });
    });
};

module.exports = userCtrl;
