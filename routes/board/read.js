var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');

router.get('/:postId', function(req, res){
    var postId = req.params.postId;
   
    res.send(postId);
});

router.post('/', function(req, res, next){
   
});

module.exports = router;