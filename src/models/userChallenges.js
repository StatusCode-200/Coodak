"use strict";
const mongoose = require("mongoose");

const userChallengeSchema = mongoose.Schema({
  user_id : mongoose.Schema.Types.ObjectId,
  challenge_id : mongoose.Schema.Types.ObjectId,
  solution : {type : String},
});

module.exports = mongoose.model("userChallenges", userChallengeSchema);
