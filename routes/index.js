const express = require("express");
const path = require("path");

const signup = require("./signup");

const router = express.Router();

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.use("/signup", signup);

module.exports = router;
