"use strict";

const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: String,
  dateOfBirth: {
    type: Date,
    required: true,
  },
  email: String,
  password: String,
  signedDate: Date,
});

module.exports = mongoose.model("Member", memberSchema);
