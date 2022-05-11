"use strict"

const DB = require("./DB");


const getAllWorkouts = async (filterParams) => {
    let mode = new RegExp(`\\.*${filterParams.mode}\\.*`, "i");
    let length = filterParams.length
    try {
        if (filterParams.mode) {
            const docs = await DB.Workout.find({ mode: mode }).limit(length);
            return docs;
        }
        const docs = await DB.Workout.find({}).limit(length);
        return docs;
    } catch (error) {
        throw { status: 500, message: error };
    };
};

const getOneWorkout = async (workoutId) => {
    try {
        const docs = await DB.Workout.findById(workoutId);
        if (!docs) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`, 
            };
        };
        return docs
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    };
};

const createNewWorkout = async (insertWorkout) => {
    try {
        const docs = await DB.Workout.findOne({name: insertWorkout.name});    
    if (docs) {
        throw {
                status: 400,
                message: `Workout with the name '${docs.name}' already exists`,
            };    
        };
            let workout = new DB.Workout(insertWorkout);
            await workout.save();
            return workout;
        } catch (error) {
                                        // optional chaining: if variable doesnt exist no error is trown;
        throw { status: 500, message: error?.message || error }
    };    
};

const updateOneWorkout = async (workoutId, changes) => {
    try {
        const doc = await DB.Workout.findOne({name: changes.name});
        if (doc) {
            throw {
                status: 400,
                message: `Workout with the name '${doc.name}' already exists`,
            };
        };  
        const docs = await DB.Workout.findByIdAndUpdate(workoutId, changes, {useFindAndModify: false, returnDocument: "after" });
        return docs;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };   
};

const deleteOneWorkout = async (workoutId) => {
    try {
        const doc = await DB.Workout.findById(workoutId);
        if (!doc) {
            throw {
                status: 400,
                message: `Cant find workout with the id '${workoutId}`,
            };
        };
        let docs = await DB.Workout.findByIdAndDelete(workoutId);
        return docs;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };
};


module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateOneWorkout,
    deleteOneWorkout,
};


