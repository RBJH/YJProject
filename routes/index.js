const express = require("express");
const path = require("path");

const signup = require("./signup");
const signin = require("./signin");
const signout = require("./signout");

const router = express.Router();

router.get("/", function(req, res) {
  const session = req.session;

  res.render(path.join(__dirname, "../views/index.ejs"), { session: session });
});

router.use("/signup", signup);
router.use("/signin", signin);
router.use("/signout", signout);

module.exports = router;
