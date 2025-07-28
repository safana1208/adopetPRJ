const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: String
});

module.exports = mongoose.model("Donation", donationSchema);
