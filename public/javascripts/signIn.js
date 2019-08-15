const mysqlPool = require("./mysqlPool");

function signIn(req, res, username, password) {
  mysqlPool.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM user WHERE email = "${username}"`,
      (err, results, fields) => {
        if (err) res.send(`failure : ${err}`);
        if (results.length) {
          if (password == results[0].password) {
            req.session.email = username;

            res.redirect("/");
          } else res.send("Retry : PW x");
        } else res.send("Retry : ID x");
      }
    );

    connection.release();
  });
}

module.exports = signIn;
