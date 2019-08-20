var express = require('express');
const path = require('path');
const router = express.Router();

const signup = require('./signup');
const signin = require('./signin');
const identity = require('./identity');

router.use('/signup', signup);
router.use('/signin', signin);
router.use('/identity', identity);

router.use(express.static(path.join(__dirname, '../../public')));

router.get('/', function(req, res){
    res.redirect('/auth/signin');
});

router.post('/signout', function(req, res, next){
    req.session.destroy();
    res.redirect('/auth/signin');
});


module.exports = router