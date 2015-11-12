var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('./message');

var Conversation = new Schema({
    user: String,
    friend: String,
    date: Date,
    messages: [Message]
});

module.exports = mongoose.model('message', Message);
