"use strict";
const mongoose = require("mongoose");

const challengeSchema = mongoose.Schema({
  name : {type : String},
  summary : {type : String},
  description : {type : String},
  category : {type : String},
  starter_code : {type : String},
  test : {type : String , required: true},
});

module.exports = mongoose.model("challenges", challengeSchema);
