const mysqlPool = require("./mysqlConnection");

function signUp(res, userId, userPassword) {
  mysqlPool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO user VALUES ("${userId}", "${userPassword}")`,
      (err, results, fields) => {
        if (err) res.send(`failure :${err}`);
        else res.redirect("/");
      }
    );

    connection.release();
  });
}

module.exports = signUp;
