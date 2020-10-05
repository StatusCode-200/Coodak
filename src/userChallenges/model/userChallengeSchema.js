"use strict";
const mongoose = require("mongoose");

const userChallengeSchema = mongoose.Schema({
  user_id :{type : mongoose.Schema.Types.ObjectId, ref : "users" ,required: true},
  challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "challenges" ,required: true},
  solution : {type : String ,required: true},
  whiteboard_id : {type : mongoose.Schema.Types.ObjectId, ref : "challengeswhiteboard" ,required: true},
});

module.exports = mongoose.model("userChallenges", userChallengeSchema);
