'use strict';
const mongoose = require('mongoose');

const invetationSchema = mongoose.Schema({
  project_id : mongoose.Schema.Types.ObjectId,//room id
  owner_id : mongoose.Schema.Types.ObjectId,
  collaborator_id : mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model('invetationSchema', invetationSchema);