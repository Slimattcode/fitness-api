"use strict";

const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: String,
  dateOfBirth: {
    type: String,
    required: true,
    match: /\d{1,2}-\d{1,2}-\d{4}/,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    max: 50,
  },
  signedDate: String,
});

module.exports = mongoose.model("Member", memberSchema);
