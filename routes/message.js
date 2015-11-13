var express = require('express');
var router = express.Router();

var Conversation = require('../models/conversation');
var Friend = require('../models/friend');
var Account = require('../models/account');

router.get('/', function (req, res) {
    Account.find({}, function(err, account) {
        if (err) throw err;
        Conversation.find({ user: req.user._id }, function(err, conversation) {
            console.log(conversation);
            if (err) throw err;
            res.render('message', {
              user : req.user,
              title: 'message',
              active: 'messages',
              conversation: conversation,
              friend: account
            });
        });
    });
});

router.get('/create/:id', function(req, res) {
    Account.findOne({ _id: req.params.id }, function(err, friend) {
        console.log(friend);
        if (err) throw err;
        if (!friend) {
            res.redirect('/messages');
        } else {
            Conversation.create({
                date: new Date(),
                user: req.user._id,
                friend: friend._id
            }, function(err, conversation) {
                if (err) throw err;
                console.log(conversation);
                res.redirect('/messages/conversation/' + conversation._id);
            });
        }
    });
});

router.get('/conversation/:id', function(req, res) {
    Conversation.findOne({ _id: req.params.id }, function(err, conversation) {
        if (err) throw err;
        res.render('conversation', {
            title: 'message',
            active: 'messages',
            conversation: conversation,
            user: req.user
        });
    });
});

router.post('/add/:conversation', function(req, res) {
   Conversation.findByIdAndUpdate(req.params.conversation, { $push: { messages: { content: req.body.content, date: new Date() } } }, function(err, conversation) {
   });
   Conversation.findOne({ _id: req.params.conversation }, function(err, conversation) {
       res.json(conversation);
   });
});

router.get('/receive/:conversation', function(req, res) {
    Conversation.findOne({ _id: req.params.conversation }, function(err, conversation) {
        res.json(conversation);
    });
});

module.exports = router;
