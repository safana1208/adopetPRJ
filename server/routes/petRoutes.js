const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const multer = require("multer");

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

const petsFilePath = path.join(__dirname, "../data/pets.json");

// שליפת כל החיות
router.get("/pets", (req, res) => {
  try {
    const pets = JSON.parse(fs.readFileSync(petsFilePath));
    res.json(pets);
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to read pets data." });
  }
});

// מחיקת חיה לפי ID
router.delete("/pets/:id", (req, res) => {
  const petId = req.params.id;

  try {
    const pets = JSON.parse(fs.readFileSync(petsFilePath));
    const index = pets.findIndex(p => p.id === petId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    pets.splice(index, 1);
    fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2));
    res.json({ success: true, message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// עדכון חיה לפי ID
router.put("/pets/:id", (req, res) => {
  const petId = req.params.id;
  const updatedData = req.body;

  try {
    const pets = JSON.parse(fs.readFileSync(petsFilePath));
    const index = pets.findIndex(p => p.id === petId);

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    // עדכון הנתונים
    pets[index] = { ...pets[index], ...updatedData };
    fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2));

    res.json({ success: true, message: "Pet updated successfully", pet: pets[index] });
  } catch (err) {
    console.error("Error updating pet:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
  });

  // הוספת חיה חדשה
 router.post("/pets", upload.single("image"), (req, res) => {
  const newPet = JSON.parse(req.body.data);
  if (!newPet.id || !newPet.name) {
    return res.status(400).json({ success: false, message: "Missing pet ID or name" });
  }

  try {
    const pets = JSON.parse(fs.readFileSync(petsFilePath));
    if (pets.find(p => p.id === newPet.id)) {
      return res.status(409).json({ success: false, message: "Pet ID already exists" });
    }

    if (req.file) {
      newPet.image = `/uploads/${req.file.filename}`;
    }

    pets.push(newPet);
    fs.writeFileSync(petsFilePath, JSON.stringify(pets, null, 2));
    res.status(201).json({ success: true, message: "Pet added successfully", pet: newPet });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;