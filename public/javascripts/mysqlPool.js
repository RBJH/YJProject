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

const mysqlPool = mysql.createPool(mysqlConfig);

module.exports = mysqlPool;
