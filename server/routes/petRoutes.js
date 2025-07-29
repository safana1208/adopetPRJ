const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Pet = require("../models/pet");

// הגדרות Cloudinary מתוך משתני סביבה
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// אחסון ענן דרך multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "adopet_pets",
    allowed_formats: ["jpg", "png", "jpeg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
  }
});
const upload = multer({ storage });

// שליפת כל החיות
router.get("/pets", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ success: false });
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

// הוספת חיה חדשה עם תמונה ל־Cloudinary
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

    if (req.file && req.file.path) {
      newPet.image = req.file.path; // קישור מלא מה־Cloudinary
    }

    const pet = new Pet(newPet);
    await pet.save();

    res.status(201).json({ success: true, message: "Pet added successfully", pet });
  } catch (err) {
    console.error("Error adding pet:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
