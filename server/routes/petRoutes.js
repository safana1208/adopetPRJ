const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const Pet = require("../models/pet"); // טעינת המודל של החיה

// הגדרות Multer לשמירת תמונות
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, uniqueSuffix + extension);
  }
});
const upload = multer({ storage: storage });

// שליפת כל החיות
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch pets from DB." });
  }
});

// מחיקת חיה לפי ID
router.delete("/pets/:id", async (req, res) => {
  const petId = req.params.id;
  try {
    const result = await Pet.deleteOne({ id: petId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    res.json({ success: true, message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// עדכון חיה לפי ID
router.put("/pets/:id", async (req, res) => {
  const petId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedPet = await Pet.findOneAndUpdate({ id: petId }, updatedData, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    res.json({ success: true, message: "Pet updated successfully", pet: updatedPet });
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// הוספת חיה חדשה
router.post("/pets", upload.single("image"), async (req, res) => {
  const newPet = JSON.parse(req.body.data);
  if (!newPet.id || !newPet.name) {
    return res.status(400).json({ success: false, message: "Missing pet ID or name" });
  }

  try {
    const existing = await Pet.findOne({ id: newPet.id });
    if (existing) {
      return res.status(409).json({ success: false, message: "Pet ID already exists" });
    }

    if (req.file) {
      newPet.image = `/uploads/${req.file.filename}`;
    }

    const pet = new Pet(newPet);
    await pet.save();

    res.status(201).json({ success: true, message: "Pet added successfully", pet });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
