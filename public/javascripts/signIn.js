// 로그인 실패 시 로직 처리 필요
const validator = require("validator");

const encrypt = require("./encrypt");
const mysqlPool = require("./mysqlPool");
// 로그인
function signIn(id, password) {
  let attribute = "name";
  // 이메일 입력
  if (validator.isEmail(id)) attribute = "email";
  // 데이터베이스 DAO
  mysqlPool.getConnection((err, connection) => {
    connection.query(
      `SELECT * FROM user WHERE ${attribute} = "${id}"`,
      (err, results, fields) => {
        if (err) throw Error(err);

        if (!results.length) throw Error(`Invalide ${attribute}.`);

        const encrypted = encrypt.getEncrypted(password, results[0].salt);

        if (encrypted !== results[0].password)
          throw Error("비밀번호가 올바르지 않습니다.");
      }
    );

    connection.release();
  });

  return true;
}

module.exports = signIn;
