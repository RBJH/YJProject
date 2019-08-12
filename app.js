const express = require("express");
const bodyParser = require("body-parser");

const index = require("./routes/index");

const app = express();

app.listen(3000, _ => {
  console.log("Example app listening on port 3000!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(index);
