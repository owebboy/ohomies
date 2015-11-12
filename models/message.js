var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    date: Date,
    content: String
});

module.exports = mongoose.model('message', Message);
