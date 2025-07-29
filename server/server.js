require("dotenv").config(); // טוען את משתני הסביבה
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require("path");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ Error connecting to MongoDB:", err));

const app = express();

// שימוש ב־middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ייבוא ראוטים
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");
const requestRoutes = require("./routes/requestRoutes");
const statsRoutes = require("./routes/statsRoutes");

// שימוש בראוטים
app.use("/api", authRoutes);
app.use("/api", petRoutes);
app.use("/api", requestRoutes); // ✅ זו השורה שתוקנה
app.use("/api/stats", statsRoutes);

// הפעלת השרת
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
