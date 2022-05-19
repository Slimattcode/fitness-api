"use strict";

const express = require("express");
const apicache = require("apicache");
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/workouts:
 *  get:
 *      tags:
 *          - workouts
 *      parameters:
 *          - in: query
 *            name: mode
 *            schema:
 *                  type: string
 *            description: The mode of a workout
 *          - in: query
 *            name: length
 *            schema:
 *                  type: number
 *            description: number of workouts to return
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: OK
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/workout"
 *          5XX:
 *              description: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: FAILED
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      error:
 *                                          type: string
 *                                          example: "Some error message"
 */
router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

router.get("/:workoutId", workoutController.getOneWorkout);

router.post("/", workoutController.createNewWorkout);

router.patch("/:workoutId", workoutController.updateOneWorkout);

router.delete("/:workoutId", workoutController.deleteOneWorkout);

module.exports = router;
