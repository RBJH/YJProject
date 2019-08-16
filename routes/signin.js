const express = require("express");
const path = require("path");

const signIn = require(path.join(
  __dirname,
  "..",
  "public",
  "javascripts",
  "signIn"
));

const router = express.Router();

router.get("/", (req, res) => {
  res.render(path.join(__dirname, "..", "views", "signin"));
});

router.post("/", (req, res) => {
  const signInId = req.body.signInId;
  const signInPassword = req.body.signInPassword;

  const result = signIn(signInId, signInPassword);

  if (result) {
    req.session.signInId = signInId;

    res.redirect("/");
  }
});

module.exports = router;
