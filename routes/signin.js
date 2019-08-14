const express = require("express");
const path = require("path");

const signIn = require(path.join(__dirname, "../public/javascripts/signIn"));

const router = express.Router();

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "../views/signin"));
});

router.post("/", (req, res) => {
  const userId = req.body.signInId;
  const userPassword = req.body.signInPassword;

  signIn(req, res, userId, userPassword);
});

module.exports = router;
