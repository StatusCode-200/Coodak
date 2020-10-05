"use strict";
const mongoose = require("mongoose");

const whiteboardSchema = mongoose.Schema({
    user_challenge_id :{type : mongoose.Schema.Types.ObjectId, ref : "userChallenges" ,required: true},
    problemDomain : {type : String ,required: true},
    algorithem  : {type : String ,required: true},
    bigO : {type : String ,required: true},
    edgeCases : {type : String },
    pseudoCode : {type : String },
    input : {type : String },
    output : {type : String },

});

module.exports = mongoose.model("challengeswhiteboard", whiteboardSchema);
