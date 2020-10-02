"use strict";
const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  name : {type : String},
  owner_id :{type : mongoose.Schema.Types.ObjectId, ref : "users"},
  collaborator_id : mongoose.Schema.Types.ObjectId,////
  code_html: {type: String},
  code_css: {type: String},
  code_js: {type: String},
});

module.exports = mongoose.model("projects", projectSchema);
