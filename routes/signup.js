const express = require("express");
const path = require("path");

const signUp = require(path.join(__dirname, "../public/javascripts/signUp"));

const router = express.Router();

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../views/signup"));
});

router.post("/", (req, res) => {
  const userId = req.body.signUpId;
  const userPassword = req.body.signUpPassword;

  signUp(res, userId, userPassword);
});

module.exports = router;
