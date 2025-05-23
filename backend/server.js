const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
require("dotenv").config()

const app = express();
const PORT = 5000;
const mongo_url = process.env.MONGODB_URI

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(mongo_url, {});

// Signup route
app.post("/api/signup", async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user with hashed password
    const newUser = new User({ ...rest, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error while creating user" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
