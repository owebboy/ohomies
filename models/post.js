var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    user: String,
    date: Date,
    content: {
      image: [],
      text: String
    }
});

module.exports = mongoose.model('post', Post);
