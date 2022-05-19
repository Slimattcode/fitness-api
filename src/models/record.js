"use strict";

const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *   record:
 *    type: object
 *    properties:
 *     id:
 *       type: string
 *       example: 6275134b0425e46ca04ea790
 *     workoutId:
 *       type: string
 *       example: 6275134b0425e46ca04ea790
 *     record:
 *       type: string
 *       example: 160 reps
 *     memberId:
 *       type: string
 *       example: 6275134b0425e46ca04ea790
 *     member:
 *       type: string
 *       example: /:workoutId/:memberId
 */

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
