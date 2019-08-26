var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('chat.ejs', {userInfo : req.session.user});
})


module.exports = router;