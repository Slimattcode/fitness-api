"use strict";
// requests and responses for the endpoint, all stuff related to HTTP;

const recordService = require("../services/recordService");
const { StatusCodes } = require("http-status-codes");

const getAllRecords = async (req, res) => {
  const allRecords = await recordService.getAllRecords();
  res.status(StatusCodes.OK).json({ data: allRecords });
};

const getRecordForWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const record = await recordService.getRecordForWorkout(workoutId);
  res.status(StatusCodes.OK).json({ data: record });
};

const getRecordMember = async (req, res) => {
  const {
    params: { memberId },
  } = req;
  const member = await recordService.getRecordMember(memberId);
  res.status(StatusCodes.OK).json({ data: member });
};

const createNewRecord = async (req, res) => {
  const createdRecord = await recordService.createNewRecord(req.body);
  // 201 request has succeeded and has led to the creation of a resource.
  res.status(StatusCodes.OK).json({ data: createdRecord });
};

const updateOneRecord = async (req, res) => {
  const {
    body,
    params: { recordId },
  } = req;
  const updatedRecord = await recordService.updateOneRecord(recordId, body);
  res.status(StatusCodes.OK).json({ data: updatedRecord });
};

const deleteOneRecord = async (req, res) => {
  const {
    params: { recordId },
  } = req;
  const deletedRecord = await recordService.deleteOneRecord(recordId);
  res.status(StatusCodes.OK).json({ data: deletedRecord });
};

module.exports = {
  getAllRecords,
  getRecordForWorkout,
  getRecordMember,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
