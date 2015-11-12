var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Message = require('./message');

var Conversation = new Schema({
    user: String,
    date: Date,
    messages: [Messages]
});

module.exports = mongoose.model('message', Message);
