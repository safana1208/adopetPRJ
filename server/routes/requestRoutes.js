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

// בקשת אימוץ לפי ID (לשאלון של המנהל)
router.get("/requests/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findOne({ id });
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }
    res.json(request);
  } catch (err) {
    console.error("Error fetching request by ID:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

//  עדכון סטטוס (Approve/Decline) כולל הסרה של חיה מהמערכת אם אושר
router.post("/requests/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findOne({ id });

    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    request.status = status;
    await request.save(); // שומר את השינוי בסטטוס

    if (status === "approved") {
      await Pet.deleteOne({ id: request.petId }); // מוחק את החיה אם אושר
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
    breed,
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
      breed,
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
