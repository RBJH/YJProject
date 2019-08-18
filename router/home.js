var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.get('/', function(req, res){
    if(req.session.user == undefined){
        res.redirect("/signin");
    }else{
        res.render('home.ejs', {userName : req.session.user.userName});
    }
});

router.post('/', function(req, res, next){
   
});

router.post('/signout', function(req, res, next){
    req.session.destroy();
    res.redirect('/signin');
});

module.exports = router;