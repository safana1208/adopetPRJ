require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// התחברות ל־MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ייבוא המודלים
const Pet = require("./models/pet");
const User = require("./models/user");
const Request = require("./models/request");
const Donation = require("./models/donation");
const Adoption = require("./models/adoption");
const AdoptionRequest = require("./models/adoptionRequest");

// קריאת קבצי JSON מתיקיית data
const pets = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "pets.json")));
const users = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "users.json")));
const requests = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "requests.json")));
const donations = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "donations.json")));
const adoptions = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "adoptions.json")));
const adoptionRequests = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "adoptionRequests.json")));

// טעינת הנתונים לדאטאבייס
async function importAll() {
  try {
    await Pet.insertMany(pets);
    await User.insertMany(users);
    await Request.insertMany(requests);
    await Donation.insertMany(donations);
    await Adoption.insertMany(adoptions);
    await AdoptionRequest.insertMany(adoptionRequests);

    console.log("✅ All data imported successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error while importing:", err);
    process.exit(1);
  }
}

importAll();
