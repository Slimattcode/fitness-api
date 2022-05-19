"use strict";

const mongoose = require("mongoose");

// record schema
const recordSchema = new mongoose.Schema({
  workoutId: {
    type: String,
    required: true,
  },
  record: {
    type: String,
    required: true,
  },
  date: String,
  updatedAt: String,
  memberId: {
    type: String,
    required: true,
  },
  member: String,
});

module.exports = mongoose.model("Record", recordSchema);
