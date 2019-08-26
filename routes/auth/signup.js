var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('signup.ejs', {err : 'NONE'});
});

router.post('/', function(req, res, next){
   
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    var userName = req.body.userName;
    
    mysql.query("INSERT INTO user VALUES (?,?,?);", [userId, userPw, userName], function(err,  rows, fields){
        
        if(err){
            if(err.code == 'ER_DUP_ENTRY'){
                res.render('signup.ejs', {err : 'DUPLICATE_ERR'})
            }else{
                res.render('signup.ejs', {err : 'NETWORK_ERR'});
            }
        } else {
            console.log("Sign up Success");
            res.redirect('/auth/signin');
        }
    });
});

module.exports = router;