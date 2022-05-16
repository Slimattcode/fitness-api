"use strict";

const Workout = require("../models/workout");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");

const getAllWorkouts = async (filterParams) => {
  let mode = new RegExp(`\\.*${filterParams.mode}\\.*`, "i");
  let length = filterParams.length;
  if (filterParams.mode) {
    const docs = await Workout.find({ mode: mode }).limit(length);
    return docs;
  }
  const docs = await Workout.find({}).limit(length);
  return docs;
};

const getOneWorkout = async (workoutId) => {
  const docs = await Workout.findById(workoutId);
  if (!docs) {
    throw new NotFoundError(`No workout with the id '${workoutId}'`);
  }
  return docs;
};

const createNewWorkout = async (insertWorkout) => {
  const docs = await Workout.findOne({ name: insertWorkout.name });
  if (docs) {
    throw new BadRequestError(
      `Workout with the name '${docs.name}' already exists`
    );
  }
  let workout = new Workout(insertWorkout);
  await workout.save();
  return workout;
};

const updateOneWorkout = async (workoutId, changes) => {
  const { name, mode, equipment, exercises, trainerTips } = changes;
  if (!name && !mode && !equipment && !exercises && !trainerTips) {
    throw new BadRequestError(
      "Specify at least one field: `name`, `mode`, `equipment`, `exercises`, `trainerTips`"
    );
  }
  const doc = await Workout.findOne({ name: name });
  const docs = await Workout.findByIdAndUpdate(workoutId, changes, {
    useFindAndModify: false,
    returnDocument: "after",
  });
  if (!docs) {
    throw new NotFoundError(`No workout with id ${workoutId}`);
  }
  if (doc) {
    throw new BadRequestError(`Workout with this name ${name} already exists`);
  }
  return docs;
};

const deleteOneWorkout = async (workoutId) => {
  const doc = await Workout.findById(workoutId);
  if (!doc) {
    throw new NotFoundError(`No workout with the id '${workoutId}`);
  }
  let docs = await Workout.findByIdAndDelete(workoutId);
  return docs;
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
