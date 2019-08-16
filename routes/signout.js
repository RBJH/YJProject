// session 관리법 지우기??
const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  req.session.destroy();

  res.clearCookie("test");

  res.redirect("/");
});

module.exports = router;
