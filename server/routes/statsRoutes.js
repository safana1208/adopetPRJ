const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const petsFilePath = path.join(__dirname, "../data/pets.json");
const adoptionsFilePath = path.join(__dirname, "../data/adoptions.json");

router.get("/", (req, res) => {
  try {
    const pets = JSON.parse(fs.readFileSync(petsFilePath));
    const adoptions = JSON.parse(fs.readFileSync(adoptionsFilePath));
    
    const totalPets = pets.length;
    const successfulAdoptions = adoptions.reduce((sum, m) => sum + m.count, 0);
    const pendingRequests = 3; // דוגמה זמנית
    const totalUsers = 12;     // דוגמה זמנית
    const totalDonations = 420; // דוגמה זמנית

    // ספירת הגזעים לפי שכיחות
    const breedCount = {};
    adoptions.forEach(record => {
      if (record.breed) {
        breedCount[record.breed] = (breedCount[record.breed] || 0) + 1;
      }
    });

    const mostAdoptedBreed = Object.entries(breedCount).reduce((a, b) => a[1] > b[1] ? a : b, ["-", 0])[0];

    res.json({
      totalPets,
      successfulAdoptions,
      pendingRequests,
      totalUsers,
      totalDonations,
      mostAdoptedBreed,
      monthlyAdoptions: adoptions
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false, message: "Server error while loading stats" });
  }
});

module.exports = router;
