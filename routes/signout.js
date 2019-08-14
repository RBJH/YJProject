const express = require("express");
const path = require("path");

//const signOut = require(path.join(__dirname, "../public/javascripts/signOut"));

const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy();
  res.clearCookie("test");
  res.redirect("/");
});

module.exports = router;
