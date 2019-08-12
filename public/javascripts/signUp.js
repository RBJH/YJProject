const mysqlConnection = require("./mysqlConnection");

function signUp(res, userId, userPassword) {
  console.log(userId, userPassword, "!!!");
  mysqlConnection.connect();

  mysqlConnection.query(
    `INSERT INTO user VALUES ("${userId}", "${userPassword}")`,
    (err, rows, fields) => {
      if (!err) res.send("success");
      else res.send(err);
    }
  );

  mysqlConnection.query("SELECT * FROM user", (err, rows, fields) => {
    if (!err) console.log("The solution is: ", rows);
    else console.log("Error while performing Query.", err);
  });

  mysqlConnection.end();
}

module.exports = signUp;
