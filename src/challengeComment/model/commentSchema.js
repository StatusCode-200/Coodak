"use strict";
const mongoose = require("mongoose");

const challengeCommentSchema = mongoose.Schema({
  user_id :{type : mongoose.Schema.Types.ObjectId, ref : "users" ,required: true},
  challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "challenges" ,required: true},
  comment : {type : String ,required: true},
  created_at: { type: Date },
});

challengeCommentSchema.pre("save", function(next) {
  this.created_at = Date.now();
  next();
});

module.exports = mongoose.model("challengeComment", challengeCommentSchema);
