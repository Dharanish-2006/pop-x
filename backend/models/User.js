const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  password: String, 
  company: String,
  agency: String,
});

module.exports = mongoose.model("User", userSchema);
