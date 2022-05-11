"use strict"

const express = require("express");
const apicache = require("apicache");
const memberController = require("../../controllers/memberController");

const router = express.Router();

const cache = apicache.middleware;

router.get("/", cache("2 minutes"), memberController.getAllMembers);

router.get("/:memberId", memberController.getOneMember);

router.post("/", memberController.createNewMember);

router.patch("/:memberId", memberController.updateOneMember);

router.delete("/:memberId", memberController.deleteOneMember);

module.exports = router;