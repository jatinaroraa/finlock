const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  mobileNumber: { type: Number },
  password: { type: String },
  cPassword: { type: String },
});
module.exports = mongoose.model("user", userSchema);
