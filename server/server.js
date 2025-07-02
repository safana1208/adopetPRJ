const express = require("express");
const app = express();
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const petRoutes = require("./routes/petRoutes");

app.use(express.json());
app.use(express.static(path.join(__dirname, "../client")));

app.use("/api", authRoutes);
app.use("/api", petRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log("Server is running on port", PORT));
