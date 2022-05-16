"use strict";
// requests and responses for the endpoint, all stuff related to HTTP;

const workoutService = require("../services/workoutService");
const { StatusCodes } = require("http-status-codes");

const getAllWorkouts = async (req, res) => {
  const { mode, length } = req.query;
  // this is a key with value of what is in req.query.mode;
  const allWorkouts = await workoutService.getAllWorkouts({ mode, length });
  res.status(StatusCodes.OK).json({ data: allWorkouts });
};

const getOneWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const oneWorkout = await workoutService.getOneWorkout(workoutId);
  res.status(StatusCodes.OK).json({ status: "OK", workout: oneWorkout });
};

const createNewWorkout = async (req, res) => {
  const createdWorkout = await workoutService.createNewWorkout(req.body);
  // 201 request has succeeded and has led to the creation of a resource.
  res.status(StatusCodes.CREATED).json({ data: createdWorkout });
};

const updateOneWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const updatedWorkout = await workoutService.updateOneWorkout(
    workoutId,
    req.body
  );
  res.status(StatusCodes.OK).json({ data: updatedWorkout });
};

const deleteOneWorkout = async (req, res) => {
  const {
    params: { workoutId },
  } = req;
  const deletedWorkout = await workoutService.deleteOneWorkout(workoutId);
  res.status(StatusCodes.OK).json({ data: deletedWorkout });
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
