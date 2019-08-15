const mysql = require("mysql");
const path = require("path");

const mysqlConfig = require(path.join(
  __dirname,
  "..",
  "..",
  "private",
  "configs",
  "mysqlConfig"
));

const mysqlConnection = mysql.createConnection(mysqlConfig);

module.exports = mysqlConnection;
