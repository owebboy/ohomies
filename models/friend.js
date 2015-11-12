var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Friend = new Schema({
    user: String,
    friend: String
});

module.exports = mongoose.model('friend', Friend);
