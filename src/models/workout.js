"use strict";

const mongoose = require("mongoose");

// workout Schema
/**
 * @openapi
 * components:
 *  schemas:
 *   workout:
 *    type: object
 *    properties:
 *     id:
 *       type: string
 *       example: 6275134b0425e46ca04ea790
 *     name:
 *       type: string
 *       example: Tommy V
 *     mode:
 *       type: string
 *       example: For Time
 *     equipment:
 *       type: array
 *       items:
 *        type: string
 *       example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *     createdAt:
 *       type: string
 *       example: 4/20/2022, 2:21:56 PM
 *     updatedAt:
 *       type: string
 *       example: 4/20/2022, 2:21:56 PM
 *     trainerTips:
 *       type: array
 *       items:
 *        type: string
 *        example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  equipment: {
    type: [String],
    required: true,
    default: undefined,
  },
  exercises: {
    type: [String],
    required: true,
    default: undefined,
  },
  createdAt: String,
  updatedAt: String,
  trainerTips: {
    type: [String],
    required: true,
    default: undefined,
  },
});

module.exports = mongoose.model("Workout", workoutSchema);
