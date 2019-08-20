var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.get('/', function(req, res){
        res.render('home.ejs', {userName : req.session.user.userName});
});

router.post('/', function(req, res, next){
   
});

module.exports = router;