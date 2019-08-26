var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('signin.ejs');
});

router.post('/', function(req, res, next){
   
    var userId = req.body.userId;
    var userPw = req.body.userPw;
    
    mysql.query("SELECT * FROM user WHERE userID=? and userPW=?", [userId, userPw], function(err,  rows, fields){
        
        if(err){
            res.send('err : ' + err);
            console.log(err);
        } else {
            if(rows[0] == undefined){
                //잘못된 id 또는 비밀번호
                res.render('signin.ejs', {msg:"asdf"});
                ;
            }else{
                //로그인 성공
                console.log("Sign in success");
                
                req.session.user = {
                    userId : userId,
                    userName : rows[0]['userName']
                }
                res.redirect('/');
            }
        }
    });
});

module.exports = router;