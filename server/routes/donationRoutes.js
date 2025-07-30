const express = require("express");
const router = express.Router();
const Donation = require("../models/donation");

// יצירת תרומה חדשה
router.post("/donations", async (req, res) => {
  const { name, amount } = req.body;
  if (!name || !amount) {
    return res.status(400).json({ success: false, message: "Missing name or amount" });
  }
  try {
    const donation = new Donation({
      name,
      amount,
      date: new Date().toISOString()
    });
    await donation.save();
    res.status(201).json({ success: true, donation });
  } catch (err) {
    console.error("Error creating donation:", err);
    res.status(500).json({ success: false, message: "Failed to create donation" });
  }
});

module.exports = router;