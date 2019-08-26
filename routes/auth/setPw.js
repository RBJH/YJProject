var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('setpw.ejs', {userId : req.session.temp.userId, userName : req.session.temp.userName});
});

router.post('/', function(req, res, next){
    var userId = req.session.temp.userId;
    var userPw = req.body.userPw;

    mysql.query("update user set userPW = ? where userID = ?;", [userPw, userId], function(err, rows, fields){
        if(err){
            res.send("ㅇ?");
        }else{
            req.session.destroy();
            res.redirect('/auth/signin');
        }
    });
});

module.exports = router;