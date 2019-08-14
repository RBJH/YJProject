const mysql = require("mysql");

const mysqlConfig = require("./configs/mysqlConfig");

const mysqlPool = mysql.createPool(mysqlConfig);

module.exports = mysqlPool;
