var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var Friend = require('./friend');

var Account = new Schema({
    email: String,
    name: String,
    username: String,
    password: String,
    friends: [Friend]
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account);
