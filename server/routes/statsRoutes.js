const express = require("express");
const router = express.Router();
const Pet = require("../models/pet");
const Request = require("../models/request");
const User = require("../models/user");
const Donation = require("../models/donation");

router.get("/", async (req, res) => {
  try {
    const [pets, requests, users, donations] = await Promise.all([
      Pet.find(),
      Request.find(),
      User.find(),
      Donation.find()
    ]);

    const totalPets = pets.length;
    const totalUsers = users.length;
    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

    const successfulAdoptions = requests.filter(r => r.status === "approved").length;
    const pendingRequests = requests.filter(r => r.status === "pending").length;

    // אימוצים לפי חודש
    const adoptionsPerMonth = {};
    requests.forEach(r => {
      if (r.status === "approved") {
        const month = new Date(r.date).toLocaleString("default", { month: "short" });
        adoptionsPerMonth[month] = (adoptionsPerMonth[month] || 0) + 1;
      }
    });

    // גזע נפוץ לפי petId — רק אם החיה עדיין קיימת במסד הנתונים
    const breedCount = {};
    for (const r of requests) {
    if (r.status === "approved" && r.breed) {
    breedCount[r.breed] = (breedCount[r.breed] || 0) + 1;
    }
    }


    const mostAdoptedBreed = Object.entries(breedCount).reduce(
      (a, b) => (a[1] > b[1] ? a : b),
      ["-", 0]
    )[0];

    res.json({
      totalPets,
      totalUsers,
      successfulAdoptions,
      pendingRequests,
      totalDonations,
      adoptionsPerMonth,
      mostAdoptedBreed
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ success: false, message: "Server error while loading stats" });
  }
});

module.exports = router;
