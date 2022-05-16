"use strict";
// business logic: transforming data structures and communicating with database layer;

const workout = require("../data/workout");

const getAllWorkouts = async (filterParams) => {
  const allWorkouts = await workout.getAllWorkouts(filterParams);
  return allWorkouts;
};

const getOneWorkout = async (workoutId) => {
  try {
    const oneWorkout = await workout.getOneWorkout(workoutId);
    return oneWorkout;
  } catch (error) {
    throw error;
  }
};

const createNewWorkout = async (newWorkout) => {
  let date = new Date();
  const insertWorkout = {
    ...newWorkout,
    createdAt: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
    updatedAt: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
  const createdWorkout = await workout.createNewWorkout(insertWorkout);
  return createdWorkout;
};

const updateOneWorkout = async (workoutId, body) => {
  let date = new Date();
  const changes = {
    ...body,
    updatedAt: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
  const updatedWorkout = await workout.updateOneWorkout(workoutId, changes);
  if (!updatedWorkout) {
  }
  return updatedWorkout;
};

const deleteOneWorkout = async (workoutId) => {
  try {
    const deletedWorkout = await workout.deleteOneWorkout(workoutId);
    return deletedWorkout;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
