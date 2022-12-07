const mongoose = require("mongoose");

const User = mongoose.model(
  "User_test",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String
  })
);

module.exports = User;
