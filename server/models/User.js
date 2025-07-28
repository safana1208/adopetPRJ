const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  password: String
});

module.exports = mongoose.model("User", userSchema);
