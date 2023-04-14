const express = require("express");
const app = express();
const router = express.Router();
const morgan = require("morgan");
const cors = require("cors");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/development");
// app.use(express.static("build"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
const connection = mongoose
  .connect(config.mongo.url)
  .then(() => {
    console.log("connection sucess");
  })
  .catch((err) => {
    console.log(err, "db error");
  });
app.use(cors());
require("./routes")(app);
router.get("/", (req, res) => {
  console.log("hit home");
  return res.send("hit home");
});
app.listen(5000, () => {
  console.log("listening");
});
