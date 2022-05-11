"use strict"
// requests and responses for the endpoint, all stuff related to HTTP;


const recordService = require("../services/recordService");

const getRecordForWorkout = async (req, res) => {
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
        const record = await recordService.getRecordForWorkout(workoutId);
        res.send({status: "OK", record: record });        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const getRecordMember = async (req, res) => {
    const {
        params: { workoutId, memberId },
    } = req;
    if (!workoutId || !memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: `Parameters ":workoutId" and ":memberId" can not be empty` },
            });
    }
    try {
        const member = await recordService.getRecordMember(memberId);
        res.send({status: "OK", member: member });        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const createNewRecord = async (req, res) => {
    const { 
        body,
        params: { workoutId },    
    } = req;
    if (
        !body.record ||
        !body.memberId ||
        !workoutId
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 
                    'Parameter ":workoutId" is empty, or key `record` is missing or empty'
                },
            });
    };
    const newRecord = {
        workout: workoutId,
        record: body.record,
        memberId: body.memberId, 
    };
    try {
        const createdRecord = await recordService.createNewRecord(newRecord);
        // 201 request has succeeded and has led to the creation of a resource.
        res.status(201).send({ status: "OK", record: createdRecord });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    }
};

const updateOneRecord = async (req, res) => {
    const { 
        body,
        params: { workoutId, recordId } 
    } = req;
    if (!recordId || !workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameters ':workoutId' and ':recordId' can not be empty" },
            });
    };
    try {
        const updatedRecord = await recordService.updateOneRecord(recordId, body);
        res.send({status: "OK", updated: updatedRecord});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };    
};

const deleteOneRecord = async (req, res) => {
    const {
        params: { workoutId, recordId },
    } = req;
    if (!workoutId || !workoutId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':workoutId' and ':recordId' can not be empty" },
            });
    };
    try {
        const deletedRecord = await recordService.deleteOneRecord(recordId);
        res.send({status: "OK", deleted: deletedRecord});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

module.exports = {
    getRecordForWorkout,
    getRecordMember,
    createNewRecord,
    updateOneRecord,
    deleteOneRecord,
};