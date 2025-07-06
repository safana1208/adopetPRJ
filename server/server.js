const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", petRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
