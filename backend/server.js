const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");
require("dotenv")

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Dharanish:kikiakka123@cluster0.np7jc.mongodb.net/?retryWrites=true&w=majority&appName=Clustere", {
});

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
