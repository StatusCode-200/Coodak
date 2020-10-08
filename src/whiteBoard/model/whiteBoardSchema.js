"use strict";
const mongoose = require("mongoose");

const whiteboardSchema = mongoose.Schema({
  user_challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "userChallenges" ,required: true},
  problem_domain : {type : String ,required: true},
  algorithm  : {type : String ,required: true},
  bigo : {type : String ,required: true},
  edge_cases : {type : String },
  pseudo_code : {type : String },
  input : {type : String },
  output : {type : String },
});

module.exports = mongoose.model("challengeswhiteboard", whiteboardSchema);
