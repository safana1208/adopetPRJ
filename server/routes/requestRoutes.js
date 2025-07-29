const express = require("express");
const router = express.Router();
const Request = require("../models/request");
const Pet = require("../models/pet");

// קבלת כל הבקשות
router.get("/requests", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    console.error("Error reading requests:", err);
    res.status(500).json({ success: false, message: "Failed to load requests" });
  }
});

// ✅ עדכון סטטוס (Approve/Decline) כולל הסרה של חיה מהמערכת אם אושר
router.post("/requests/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findOne({ id });

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    request.status = status;
    await request.save();

    if (status === "approved") {
      await Pet.deleteOne({ id: request.petId });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Error updating request status:", err);
    res.status(500).json({ success: false, message: "Failed to update request" });
  }
});

// ✅ יצירת בקשת אימוץ חדשה
router.post("/requests", async (req, res) => {
  const {
    applicantName,
    petId,
    date,
    reason,
    travelPlan,
    experience,
    hasPets,
    otherPets,
    homeType,
    age
  } = req.body;

  try {
    const newRequest = new Request({
      id: `REQ${Date.now()}`,
      applicantName,
      petId,
      date,
      status: "pending",
      reason,
      travelPlan,
      experience,
      hasPets,
      otherPets,
      homeType,
      age
    });

    await newRequest.save();
    res.status(201).json({ success: true, message: "Request submitted", request: newRequest });
  } catch (err) {
    console.error("Error creating request:", err);
    res.status(500).json({ success: false, message: "Failed to create request" });
  }
});

module.exports = router;
