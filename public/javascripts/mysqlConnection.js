const mysql = require("mysql");

const mysqlConfig = require("./configs/mysqlConfig");

const mysqlConnection = mysql.createConnection(mysqlConfig);

module.exports = mysqlConnection;
