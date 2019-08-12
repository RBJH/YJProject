const express = require("express");
const path = require("path");

const signUp = require(path.join(__dirname, "../public/javascripts/signUp"));

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/signup.html"));
});

router.post("/", (req, res) => {
  const userId = req.body.signUpId;
  const userPassword = req.body.signUpPassword;

  const flag = signUp(res, userId, userPassword);

  if (flag) console.log("회원가입 실패");
  else console.log("회원가입 성공");
});

module.exports = router;
