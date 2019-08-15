var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();


var mysql = require('./mysql');
mysql.connect();

var signupRouter = require('./router/signup');
var signinRouter = require('./router/signin');
var homeRouter = require('./router/home');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(session({
    secret : '@#$ABCDEF@#@#$',
    resave : false,
    saveUninitialized : true,
}));

app.use(express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/signup', signupRouter);
app.use('/signin', signinRouter);
app.use('/', homeRouter);



var server = app.listen(3000, function(){
    console.log('Run');
})




