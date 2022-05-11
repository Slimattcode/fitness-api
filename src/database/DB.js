"use strict";

const mongoose = require("mongoose");

// connect to server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// default connection
const db = mongoose.connection;

// notification of connection error
db.on("error", console.error.bind(console, "mongoDB connection error"));

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
    mode: String,
    equipment: [String],
    exercises: {
        type: [String],
        required: true,
    },
    createdAt: String,
    updatedAt: String,
    trainerTips: [String],
});

// record schema
const recordSchema = new mongoose.Schema({
    workout: {
        type: String,
        required: true,
    },
    record: {
        type: String,
        required: true,
    },
    date: String,
    memberId: {
        type: String,
        required: true,
    },
    member: String,
});

// member schema
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

const Workout = mongoose.model("Workout", workoutSchema);
const Record = mongoose.model("Record", recordSchema);
const Member = mongoose.model("Member", memberSchema); 

module.exports = {
    Workout,
    Record,
    Member,
};