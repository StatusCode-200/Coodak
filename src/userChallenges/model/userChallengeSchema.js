"use strict";
const mongoose = require("mongoose");

const userChallengeSchema = mongoose.Schema({
  user_id :{type : mongoose.Schema.Types.ObjectId, ref : "users"},
  challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "challenges"},
  solution : {type : String},
});

module.exports = mongoose.model("userChallenges", userChallengeSchema);
