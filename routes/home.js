var express = require('express');
var router = express.Router();
var mysql = require('../mysql');

router.get('/', function(req, res){
        if(req.session.user == undefined){
                res.redirect('/');
        }else{

                const query = "select * from bestPost order by recommend desc";
                mysql.query(query, function(err, rows, fields){
                        res.render('home.ejs', {userName : req.session.user.userName, posts : rows});
                });
        }

});

module.exports = router;