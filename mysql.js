var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : "2795123e",
    database : 'yjproject'
});

module.exports = connection;
    