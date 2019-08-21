var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');
var moment = require('moment');

router.get('/', function(req, res){
    
    mysql.query("select postId, title, writer, writeDate, views, recommend from board",function(err, rows, fields){
        if(err){
            console.log(err);
        }else{
            res.render('board.ejs', {posts : rows, moment : moment});
        }
    });
});

module.exports = router;