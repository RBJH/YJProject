var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.get('/', function(req, res){
    res.render('signup.ejs', {err : 'NONE'});
});

router.post('/', function(req, res, next){
   
    var userID = req.body['userID'];
    var userPW = req.body['userPW'];
    
    mysql.query("INSERT INTO user VALUES (?,?);", [userID, userPW], function(err,  rows, fields){
        
        if(err){
            if(err.code == 'ER_DUP_ENTRY'){
                res.render('signup.ejs', {err : 'DUPLICATE_ERR'})
            }else{
                res.render('signup.ejs', {err : 'NETWORK_ERR'});
            }
        } else {
            res.send('success');
            console.log("Sign up Success");
        }
    });
});

module.exports = router;