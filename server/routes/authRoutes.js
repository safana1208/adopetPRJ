const express = require("express");
const router = express.Router();
const User = require("../models/user");

// רשימת מנהלים: טלפון + סיסמה
const ADMINS = [
  { phone: "0558826003", password: "admin1" },
  { phone: "0546702833", password: "admin2" }
];

// רישום משתמש חדש
router.post("/register", async (req, res) => {
  const { firstName, phone, password } = req.body;

  if (!firstName || !phone || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const newUser = new User({ firstName, phone, password });
    await newUser.save();

    res.json({ success: true });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// התחברות
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // בדיקת מנהל
  const isAdmin = ADMINS.find(
    admin => admin.phone === phone && admin.password === password
  );

  if (isAdmin) {
    return res.json({ success: true, role: "admin" });
  }

  try {
    const user = await User.findOne({ phone, password });

    if (user) {
      return res.json({
        success: true,
        role: "user",
        firstName: user.firstName
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

