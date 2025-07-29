const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  id: String,
  applicantName: String,
  petId: String,
  breed: String,
  date: String,
  status: String,
  reason: String,
  travelPlan: String,
  experience: String,
  hasPets: String,
  otherPets: String,
  homeType: String,
  age: Number
});

module.exports = mongoose.model("Request", requestSchema);
