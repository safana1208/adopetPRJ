const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  id: String,
  applicantName: String,
  petId: String,
  date: String,
  status: String
});

module.exports = mongoose.model("AdoptionRequest", adoptionRequestSchema);
