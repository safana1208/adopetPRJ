const mongoose = require("mongoose");

const adoptionSchema = new mongoose.Schema({
  month: String,
  count: Number
});

module.exports = mongoose.model("Adoption", adoptionSchema);
