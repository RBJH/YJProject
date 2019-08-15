// 유효성 검사 실패 시 로직 처리 필요
// 메일 인증 검토
// 데이터베이스 설계 고려(가입일?, salt 테이블?...)
const validator = require("validator");
const crypto = require("crypto");

const mysqlPool = require("./mysqlPool");
// 유효성 검사
function isValidate(name, email, password, passwordConfirm) {
  let result = true;

  if (!validator.isAlphanumeric(name)) {
    throw Error("이름 형식이 올바르지 않습니다.");
    result = false;
  }
  if (!validator.isEmail(email)) {
    throw Error("이메일 형식이 올바르지 않습니다.");
    result = false;
  }
  if (password !== passwordConfirm) {
    throw Error("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    result = false;
  }
  if (!validator.isLength(password, { min: 8, max: 16 })) {
    throw Error("비밀번호는 8자 이상 16자 이하로 생성해야 합니다.");
    result = false;
  }

  return result;
}
// 비밀번호 암호화
function encryptPassword(password) {
  const result = [];
  // 랜덤 salt 생성
  let buf = crypto.randomBytes(64);

  const salt = buf.toString("hex");
  // 암호화 pbkdf2
  buf = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");

  const encrypted = buf.toString("base64");

  result.push(salt);
  result.push(encrypted);

  return result;
}
// 회원가입
function signUp(name, email, password, passwordConfirm) {
  // 유효성 검사
  if (!isValidate(name, email, password, passwordConfirm)) return false;
  // 비밀번호 암호화
  const [salt, encrypted] = encryptPassword(password);
  // 데이터베이스 DAO
  mysqlPool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO user VALUES ("${name}", "${email}", "${encrypted}", "${salt}")`,
      (err, results, fields) => {
        if (err) throw Error(err);
      }
    );

    connection.release();
  });

  return true;
}

module.exports = signUp;
