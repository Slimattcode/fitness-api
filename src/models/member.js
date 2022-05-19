"use strict";

const mongoose = require("mongoose");

/**
 * @openapi
 * components:
 *  schemas:
 *   member:
 *    type: object
 *    properties:
 *     id:
 *       type: string
 *       example: 6275134b0425e46ca04ea790
 *     name:
 *       type: string
 *       example: Tommy V
 *     gender:
 *       type: string
 *       example: male
 *     dateOfBirth:
 *       type: date
 *       example: 08-09-1984
 *     email:
 *       type: string
 *       example: "sliman@email.com"
 *     password:
 *       type: string
 *       example: hsyshjsy987^9767ukgs
 */

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
