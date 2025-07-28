const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  id: String,
  applicantName: String,
  petId: String,
  date: String,
  status: String
});

module.exports = mongoose.model("Request", requestSchema);
