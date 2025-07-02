const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

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

module.exports = router;