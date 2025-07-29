const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  password: String,
  role: { type: String, default: "user" }
});

module.exports = mongoose.model("User", userSchema);
