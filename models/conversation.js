var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Conversation = new Schema({
    user: String,
    friend: String,
    date: Date,
    messages: [{
        date: Date,
        content: String,
        author: String
    }]
});

module.exports = mongoose.model('conversation', Conversation);
