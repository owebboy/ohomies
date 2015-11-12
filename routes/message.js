var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('message', { user : req.user, title: 'message', active: 'messages' });
});

module.exports = router;
