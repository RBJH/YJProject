// 데이터베이스 사용법 고려(풀?, 트랜젝션?, 폴더 위치?...)
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;

const sessConfig = require(path.join(
  __dirname,
  "private",
  "configs",
  "sessConfig"
));

const app = express();

app.listen(3000);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.use(session(sessConfig));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

const index = require("./routes/index");

app.use(index);
