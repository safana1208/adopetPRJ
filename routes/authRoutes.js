const express = require("express");
const router = express.Router();

// רשימת מנהלים: טלפון + סיסמה
const ADMINS = [
  { phone: "0558826003", password: "admin1" },
  { phone: "0546702833", password: "admin2" }
];

router.post("/login", (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // בדיקת מנהל לפי טלפון וסיסמה
  const isAdmin = ADMINS.find(
    admin => admin.phone === phone && admin.password === password
  );

  if (isAdmin) {
    return res.json({ success: true, role: "admin" });
  } else {
    return res.json({ success: true, role: "user" });
  }
});

module.exports = router;