"use strict";

const express = require("express");
const apicache = require("apicache");
const recordController = require("../../controllers/recordController");

const router = express.Router();

const cache = apicache.middleware;

router.get("/", recordController.getAllRecords);

router.get("/:workoutId", recordController.getRecordForWorkout);

router.get("/:workoutId/:memberId", recordController.getRecordMember);

router.post("/", recordController.createNewRecord);

router.patch("/:recordId", recordController.updateOneRecord);

router.delete("/:recordId", recordController.deleteOneRecord);

module.exports = router;
