"use strict";
// business logic: transforming data structures and communicating with database layer;

const record = require("../data/record");

const getRecordForWorkout = async (workoutId) => {
  try {
    const records = await record.getRecordForWorkout(workoutId);
    return records;
  } catch (error) {
    throw error;
  }
};

const getRecordMember = async (memberId) => {
  try {
    const member = await record.getRecordMember(memberId);
    return member;
  } catch (error) {
    throw error;
  }
};

const createNewRecord = async (newRecord) => {
  let date = new Date();
  const insertRecord = {
    ...newRecord,
    member: "/:memberId",
    date: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
  try {
    const createdRecord = await record.createNewRecord(insertRecord);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

const updateOneRecord = async (recordId, body) => {
  const changes = {
    ...body,
  };
  try {
    const updatedRecord = await record.updateOneRecord(recordId, changes);
    return updatedRecord;
  } catch (error) {
    throw error;
  }
};

const deleteOneRecord = async (recordId) => {
  try {
    const deletedRecord = await record.deleteOneRecord(recordId);
    return deletedRecord;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRecordForWorkout,
  getRecordMember,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord,
};
