"use strict"
// requests and responses for the endpoint, all stuff related to HTTP;


const workoutService = require("../services/workoutService");

const getAllWorkouts = async (req, res) => {
    const { mode, length } = req.query
    try {
                                                                // this is a key with value of what is in req.query.mode; 
        const allWorkouts = await workoutService.getAllWorkouts({ mode, length });
        res.send({status: "OK", data: allWorkouts});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const getOneWorkout = async (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: `Parameter ":workoutId" can not be empty` },
            });
    }
    try {
        const oneWorkout = await workoutService.getOneWorkout(workoutId);
        res.send({status: "OK", workout: oneWorkout});        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const createNewWorkout = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 
                    "One of the following keys is missing or is empty: `name`, `mode`, `equipment`, `exercises`, `trainerTips`"
                },
            });
    };
    const newWorkout = {
        name: body.name,
        mode: body.mode,
        equipment: body.equipment,
        exercises: body.exercises,
        trainerTips: body.trainerTips, 
    };
    try {
        const createdWorkout = await workoutService.createNewWorkout(newWorkout);
        // 201 request has succeeded and has led to the creation of a resource.
        res.status(201).send({ status: "OK", workout: createdWorkout });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const updateOneWorkout = async (req, res) => {
    const { 
        body,
        params: { workoutId } 
    } = req;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            });
    };
    try {
        const updatedWorkout = await workoutService.updateOneWorkout(workoutId, body);
        res.send({status: "OK", updated: updatedWorkout});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };    
};

const deleteOneWorkout = async (req, res) => {
    const {
        params: { workoutId },
    } = req;
    if (!workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' can not be empty" },
            });
    };
    try {
        const deletedWorkout = await workoutService.deleteOneWorkout(workoutId);
        res.send({status: "OK", deleted: deletedWorkout});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout
};