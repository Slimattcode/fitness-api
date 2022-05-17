"use strict";

const express = require("express");
const apicache = require("apicache");
const recordController = require("../../controllers/recordController");

const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/records:
 *  get:
 *      tags:
 *          - records
 *      summary: Get all records
 *      parameters:
 *          - in: query
 *            name: from
 *            schema:
 *                  type: string
 *            description: members signed up since date
 *          - in: query
 *            name: to
 *            schema:
 *                  type: string
 *            description: members signed up to date
 *          - in: query
 *            name: length
 *            schema:
 *                  type: number
 *            description: number of members to return
 *      responses:
 *          200:
 *              description: OK
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      $ref: "#/components/schemas/record"
 *          4/5XX:
 *              description: FAILED
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                                      error:
 *                                          type: string
 *                                          example: "Some error message"
 */

router.get("/", recordController.getAllRecords);

router.get("/:workoutId", recordController.getRecordForWorkout);

router.get("/:workoutId/:memberId", recordController.getRecordMember);

router.post("/", recordController.createNewRecord);

router.patch("/:recordId", recordController.updateOneRecord);

router.delete("/:recordId", recordController.deleteOneRecord);

module.exports = router;
