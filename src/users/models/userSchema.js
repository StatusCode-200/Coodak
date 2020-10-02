"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  challenges:[{type: mongoose.Schema.Types.ObjectId, ref:"userChallenges"}],
  projects:[{type: mongoose.Schema.Types.ObjectId, ref:"projects"}],
  invitations:[{type: mongoose.Schema.Types.ObjectId, ref:"invetations"}],
});

module.exports = mongoose.model("users", userSchema);
