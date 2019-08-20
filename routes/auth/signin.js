var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('signin.ejs', {validateErr : false});
});

router.post('/', function(req, res, next){
   
    var userID = req.body['userID'];
    var userPW = req.body['userPW'];
    
    mysql.query("SELECT * FROM user WHERE userID=? and userPW=?", [userID, userPW], function(err,  rows, fields){
        
        if(err){
            res.send('err : ' + err);
            console.log(err);
        } else {
            if(rows[0] == undefined){
                //잘못된 id 또는 비밀번호
                res.render('signin.ejs', {validateErr : true});
                ;
            }else{
                //로그인 성공
                console.log("Sign in success");
                
                req.session.user = {
                    userID : userID,
                    userName : rows[0]['userName']
                }
                res.redirect('/');
            }
        }
    });
});

module.exports = router;