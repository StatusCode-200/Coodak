"use strict";
const mongoose = require("mongoose");

const challengeCommentSchema = mongoose.Schema({
  user_id :{type : mongoose.Schema.Types.ObjectId, ref : "users" ,required: true},
  challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "challenges" ,required: true},
  comment : {type : String ,required: true},
});

module.exports = mongoose.model("challengeComment", challengeCommentSchema);
