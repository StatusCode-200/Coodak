"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role:{ type: String, required: true , default : "user",  enum: ['admin', 'user'] },
});

module.exports = mongoose.model("users", userSchema);
