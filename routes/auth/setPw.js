var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('setpw.ejs', {userID : req.session.temp.userID, userName : req.session.temp.userName});
});

router.post('/', function(req, res, next){
    var userID = req.session.temp.userID;
    var userPW = req.body.userPW;

    mysql.query("update user set userPW = ? where userID = ?;", [userPW, userID], function(err, rows, fields){
        if(err){
            res.send("ㅇ?");
        }else{
            req.session.destroy();
            res.redirect('/auth/signin');
        }
    });
});

module.exports = router;