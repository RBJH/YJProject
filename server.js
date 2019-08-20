var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();


var mysql = require('./mysql');
mysql.connect();

const router = require('./routes/index');

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

app.use(router);


var server = app.listen(3000, function(){
    console.log('Run');
})




