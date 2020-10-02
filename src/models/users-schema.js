
'use strict';
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  challenges:[{type: mongoose.Schema.Types.ObjectId, ref:'userChallengeSchema'}],
  projects:[{type: mongoose.Schema.Types.ObjectId, ref:'projectSchema'}],
  invitation:[{type: mongoose.Schema.Types.ObjectId, ref:'invetationSchema'}],


});

module.exports = mongoose.model('userSchema', userSchema);