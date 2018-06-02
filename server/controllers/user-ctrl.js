var BaseCtrl = require('./base-ctrl');
var userModel = require('../model/user');

var userCtrl = new BaseCtrl(userModel);

console.log('--- user ctrl');
console.log(Object.keys(userCtrl));

module.exports = userCtrl;
