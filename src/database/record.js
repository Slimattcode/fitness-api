"use strict"

const DB = require("./DB");

const getRecordForWorkout = async (workoutId) => {
    try {
        const record = await DB.Record.find({ workout: workoutId});
        if (!record) {
            throw {
                status: 400,
                message: `Can't find workout with the id '${workoutId}'`, 
            };
        };
        return record;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };
};

const getRecordMember = async (memberId) => {
    try {
        const member = await DB.Member.findById(memberId);
        if (!member) {
            throw {
                status: 400,
                message: `Can't find member with the id '${memberId}'`, 
            };
        };
        return member;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };
};
const createNewRecord = async (insertRecord) => {
    try {
        let record = new DB.Record(insertRecord);
        await record.save();
        return record;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };    
};

const updateOneRecord = async (recordId, changes) => {
    try {
        const doc = await DB.Record.findById(recordId);
        if (!doc) {
            throw {
                status: 400,
                message: `Can't find record with the id '${recordId}'`,
            };
        };  
        const docs = await DB.Record.findByIdAndUpdate(recordId, changes, {useFindAndModify: false, returnDocument: "after" });
        return docs;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    };   
};

const deleteOneRecord = async (recordId) => {
    try {
        const doc = await DB.Record.findById(recordId);
        if (!doc) {
            throw {
                status: 400,
                message: `Can't find record with the id '${recordId}`,
            };
        };
        let docs = await DB.Record.findByIdAndDelete(recordId);
        return docs;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
}

module.exports = {
    getRecordForWorkout,
    getRecordMember,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord,
};
