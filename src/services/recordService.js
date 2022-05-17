"use strict";
// business logic: transforming data structures and communicating with database layer;

const record = require("../data/record");

const getAllRecords = async () => {
  const allRecords = await record.getAllRecords();
  return allRecords;
};

const getRecordForWorkout = async (workoutId) => {
  try {
    const records = await record.getRecordForWorkout(workoutId);
    return records;
  } catch (error) {
    throw error;
  }
};

const getRecordMember = async (memberId) => {
  const member = await record.getRecordMember(memberId);
  return member;
};

const createNewRecord = async (newRecord) => {
  let date = new Date();
  const insertRecord = {
    ...newRecord,
    member: ":workoutId/:memberId",
    date: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
  const createdRecord = await record.createNewRecord(insertRecord);
  return createdRecord;
};

const updateOneRecord = async (recordId, body) => {
  let date = new Date();
  body.updatedAt = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);
  const updatedRecord = await record.updateOneRecord(recordId, body);
  return updatedRecord;
};

const deleteOneRecord = async (recordId) => {
  const deletedRecord = await record.deleteOneRecord(recordId);
  return deletedRecord;
};

module.exports = {
  getAllRecords,
  getRecordForWorkout,
  getRecordMember,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
