"use strict";

const Record = require("../models/record");
const Member = require("../models/member");
const Workout = require("../models/workout");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");
const workout = require("../models/workout");

const getAllRecords = async () => {
  const docs = await Record.find({});
  return docs;
};

const getRecordForWorkout = async (workoutId) => {
  const docs = await Record.find({ workout: workoutId });
  if (!docs) {
    throw new NotFoundError(`No record for workout with the id '${workoutId}`);
  }
  return docs;
};

const getRecordMember = async (memberId) => {
  const docs = await Member.findById(memberId);
  if (!docs) {
    throw new NotFoundError(`No record for member with the id '${memberId}`);
  }
  return docs;
};

const createNewRecord = async (insertRecord) => {
  const docs = await Workout.findById(insertRecord.workoutId);
  if (!docs) {
    throw new BadRequestError(`No workout with id '${insertRecord.workoutId}'`);
  }
  let record = new Record(insertRecord);
  await record.save();
  return record;
};

const updateOneRecord = async (recordId, changes) => {
  let workout;
  let member;
  const { workoutId, record, memberId } = changes;
  if (!workoutId && !record && !memberId) {
    throw new BadRequestError(
      "Specify at least one field: `workoutId`, `record`, `memberId`"
    );
  }
  if (workoutId) {
    workout = await Record.findById(workoutId);
    if (!workout) {
      throw new BadRequestError(`No workout with id ${workoutId}`);
    }
  }
  if (memberId) {
    member = await Record.findById(workoutId);
    if (!member) {
      throw new BadRequestError(`No member with id ${memberId}`);
    }
  }
  const docs = await Record.findByIdAndUpdate(recordId, changes, {
    useFindAndModify: false,
    returnDocument: "after",
  });
  if (!docs) {
    throw new NotFoundError(`No record with id ${workoutId}`);
  }
  return docs;
};

const deleteOneRecord = async (recordId) => {
  const doc = await Record.findById(recordId);
  if (!doc) {
    throw new NotFoundError(`No record with the id '${recordId}`);
  }
  let docs = await Record.findByIdAndDelete(recordId);
  return docs;
};

module.exports = {
  getAllRecords,
  getRecordForWorkout,
  getRecordMember,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
