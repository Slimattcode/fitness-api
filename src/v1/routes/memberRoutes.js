"use strict";

const express = require("express");
const apicache = require("apicache");
const memberController = require("../../controllers/memberController");

const router = express.Router();

const cache = apicache.middleware;

/**
 * @openapi
 * /api/v1/members:
 *  get:
 *      tags:
 *          - members
 *      summary: Get all members
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
 *                                      $ref: "#/components/schemas/member"
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

router.get("/", cache("2 minutes"), memberController.getAllMembers);

router.get("/:memberId", memberController.getOneMember);

router.post("/", memberController.createNewMember);

router.patch("/:memberId", memberController.updateOneMember);

router.delete("/:memberId", memberController.deleteOneMember);

module.exports = router;
