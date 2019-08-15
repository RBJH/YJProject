// 파일 위치 고려(public?, private?, config?)
const express = require("express");
const path = require("path");

const signUp = require(path.join(
  __dirname,
  "..",
  "public",
  "javascripts",
  "signUp"
));

const router = express.Router();

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "signup"));
});

router.post("/", (req, res) => {
  const signUpName = req.body.signUpName;
  const signUpEmail = req.body.signUpEmail;
  const signUpPassword = req.body.signUpPassword;
  const signUpPasswordConfirm = req.body.signUpPasswordConfirm;

  const result = signUp(
    signUpName,
    signUpEmail,
    signUpPassword,
    signUpPasswordConfirm
  );

  if (result) res.redirect("/");
});

module.exports = router;
