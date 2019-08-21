var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    res.render('write.ejs');
});

router.post('/', function(req, res, next){
    const title = req.body.title;
    const content = req.body.content;
    const writer = req.session.user.userName;
    
    mysql.query("insert into board values(0, ?,?,?,curdate(),0,0);", [title, content, writer], function(err, rows, fields){
        if(err){
            res.send(err);
        }else{
            res.redirect('/board');
        }
    });
   
});

module.exports = router;