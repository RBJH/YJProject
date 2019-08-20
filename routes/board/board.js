var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/', function(req, res){
    
    mysql.query("select postId, title, writer, writeDate, views, recommend from board",function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            res.render('board.ejs', {posts : rows});
        }
    });
});

module.exports = router;