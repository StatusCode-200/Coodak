"use strict";
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  challenges:[{type: mongoose.Schema.Types.ObjectId, ref:"userChallengeSchema"}],
  projects:[{type: mongoose.Schema.Types.ObjectId, ref:"projects"}],
  invitation:[{type: mongoose.Schema.Types.ObjectId, ref:"invetationSchema"}],


});

module.exports = mongoose.model("users", userSchema);
