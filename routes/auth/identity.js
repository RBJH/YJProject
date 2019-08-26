var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('identity.ejs', {err : "none"});
});

router.post('/', function(req, res, next){
    var userId = req.body.userId;
    var userName = req.body.userName;

    mysql.query("select * from user where userID = ? and userName = ?", [userId, userName], function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            if(rows[0] == undefined){
                res.render('identity.ejs', {err : "no_data"});
            }else{
                req.session.temp = {
                    userId : rows[0].userId,
                    userName : rows[0].userName
                }
                res.redirect('/auth/setPw');
            }
        }
    });
});

module.exports = router;