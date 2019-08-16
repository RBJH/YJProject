const crypto = require("crypto");

class Encrypt {
  getSalt() {
    const buf = crypto.randomBytes(64);

    const salt = buf.toString("hex");

    return salt;
  }
  getEncrypted(password, salt) {
    const buf = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512");

    const encrypted = buf.toString("base64");

    return encrypted;
  }
}

const encrypt = new Encrypt();

module.exports = encrypt;
