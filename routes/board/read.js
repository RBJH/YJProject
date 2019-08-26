var express = require('express');
var router = express.Router();
var mysql = require('../../mysql');
var moment = require('moment');

router.get('/:postId', function(req, res){
    var postId = req.params.postId;
   
    mysql.beginTransaction(function(err){
        if(err){
            res.send(err);
        }
        mysql.query("select * from board where postId = ?", postId, function(err, rows, fields){
            if(err){
                res.send(err);
            }else if(rows[0] == undefined){
                res.send("존재하지 않는 글입니다.");
            }else{
                mysql.query("update board set views = views +1 where postId = ?", postId, function(err){
                    if(err){
                        console.log(err);
                        mysql.rollback(function(){
                            console.log("rollback error");
                        });
                    }
                    mysql.commit(function(err){
                        if(err){
                            console.log(err);
                            mysql.rollback(function(){
                                console.log("rollback error");
                            });
                        }
                        res.render('read.ejs', {post : rows[0], moment : moment});
                    });
                });//update query
            }
        });//select query
    });//transaction
    
    
});

router.get('/recommend/:postId', function(req, res){
    const userId = req.session.user.userId;
    const postId = req.params.postId;

    
    mysql.beginTransaction(function(err){
        if(err){
            console.log("transaction err");
        }else{
            mysql.query("insert into recommend values(?,?)", [postId, userId], function(err){
                
                if(err){
                    if(err.code = "ER_DUP_ENTRY"){
                        //이미 추천한 글
                        console.log("dup recommend");
                        
                        mysql.commit(function(err){
                            if(err){
                                console.log("commit err : " + err);
                                mysql.rollback();
                            }
                            res.redirect('/board/read/'+ postId);
                        });
                        
                    }
                }else{
                    mysql.query("update board set recommend = recommend+1 where postId = ?", postId, function(err){
                        if(err){
                            console.log("fail to recommend : " + err.code);
                            mysql.rollback();
                        }
                        mysql.commit(function(err){
                            if(err){
                                console.log("commit err : " + err);
                                mysql.rollback();
                            }
                            res.redirect('/board/read/'+ postId);
                        });
                    });
                }
                
            });
        }
    });
});

module.exports = router;