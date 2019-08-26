var express = require('express');
const router = express.Router();

const home = require('./home');
const authRouter = require('./auth');
const boardRouter = require('./board');
const chatRouter = require('./chat');

router.use('/home', home);
router.use('/auth', authRouter);
router.use('/board', boardRouter);
router.use('/chat', chatRouter);

router.get('/', function(req, res){
    if(req.session.user == undefined){
        res.redirect("/auth");
    }else{
        res.redirect("/home");
    }
});

module.exports = router
