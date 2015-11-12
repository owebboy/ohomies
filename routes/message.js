var express = require('express');
var router = express.Router();

var Conversation = require('../models/conversation');
var Friend = require('../models/friend');
var Account = require('../models/account');

router.get('/', function (req, res) {
    Account.find({}, function(err, account) {
        if (err) throw err;
        Conversation.find({ user: req.user.id }, function(err, conversation) {
            if (err) throw err;
            res.render('message', { user : req.user, title: 'message', active: 'messages', conversation: conversation, friend: account });
        });
    });
});

router.post('/create', function(req, res) {
   Friend.findOne({ friend: req.body.friend }, function(err, friend) {
       if (err) throw err;
       if (!friend) {
           res.redirect('/messages');
       } else {
           Conversation.create({
               user: req.user.id,
               friend: friend.id,
               date: new Date()
           }, function(err, conversation) {
               if (err) throw err;
               console.log(conversation);
               res.redirect('/messages/conversation/' + conversation.id);
           });
       }
   });
});

router.get('/conversation/:id', function(req, res) {
    Conversation.findOne({ _id: req.params.id }, function(err, conversation) {
        if (err) throw err;
        res.render('message', {
            title: 'message', 
            active: 'messages',
            conversation: conversation,
            user: req.user
        });
    });
});

router.post('/add/:conversation', function(req, res) {
   Conversation.findOne({ _id: req.params.conversation }, function(err, conversation) {
      if (err) throw err;
      conversation.messages.push({
          content: req.body.content,
          date: new Date()
      });
      conversation.save(function(err) {
          if (err) throw err;
          res.redirect('/messages/conversation/' + conversation.id);
      });
   }); 
});

module.exports = router;