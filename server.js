var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var http = require('http').createServer(app);
var socketAll = require('socket.io')(http);

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

var server = http.listen(3000, function(){
    console.log('Run');
});

var fullChatRoom = socketAll.of('/fullChat');

fullChatRoom.on('connection', function(socket){
   
    console.log("user is connected");

    socket.on('join', function(data){
        const userName = socket.userName = data.userName;
        const room = socket.room = data.room;

        socket.join(room);
        console.log(userName + " is join");
        
        fullChatRoom.to(room).emit('msgToClient', userName + " is join in room");
        
    });

    socket.on('msgToServer', function(data){
        const userName = socket.userName;
        const msg = data;
        const room = socket.room;

        console.log(userName + " says " + msg);
        fullChatRoom.to(room).emit('msgToClient', userName + " : " + msg);
        /*
        mysql.query("insert into chatLog values(?, ?)", [userName, msg], function(err){
            if(err) console.log("insert error");
        });
        */

    });

    socket.on('disconnect', function(){
        const userName = socket.userName;
        const room = socket.room;

        socket.leave(room);
        fullChatRoom.to(room).emit('msgToClient', userName + " is left");
        console.log(userName + " is left");

        socket.disconnect();
    });


});
