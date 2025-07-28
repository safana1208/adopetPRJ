const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: String,
  breed: String,
  type: String,
  size: String,
  shedding: String,
  image: String,
  description: String,
  infoLink: String
});

module.exports = mongoose.model("Pet", petSchema);
