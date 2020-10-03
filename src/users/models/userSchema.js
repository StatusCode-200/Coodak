"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role:{ type: String, required: true , default : "user" },
  challenges:[{type: mongoose.Schema.Types.ObjectId, ref:"userChallenges"}],
  projects:[{type: mongoose.Schema.Types.ObjectId, ref:"projects"}],
});

module.exports = mongoose.model("users", userSchema);
