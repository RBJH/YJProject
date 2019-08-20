var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('identity.ejs', {err : "none"});
});

router.post('/', function(req, res, next){
    var userID = req.body.userID;
    var userName = req.body.userName;

    mysql.query("select * from user where userID = ? and userName = ?", [userID, userName], function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            if(rows[0] == undefined){
                res.render('identity.ejs', {err : "no_data"});
            }else{
                req.session.temp = {
                    userID : rows[0].userID,
                    userName : rows[0].userName
                }
                res.redirect('/auth/setPw');
            }
        }
    });
});

module.exports = router;