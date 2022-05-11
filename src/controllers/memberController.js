"use strict"
// requests and responses for the endpoint, all stuff related to HTTP;

const memberService = require("../services/memberService");

const getAllMembers = async (req, res) => {
    try {
        const allMembers = await memberService.getAllMembers();
        res.send({status: "OK", data: allMembers});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const getOneMember = async (req, res) => {
    const {
        params: { memberId },
    } = req;
    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: `Parameter ":memberId" can not be empty` },
            });
    }
    try {
        const oneMember = await memberService.getOneMember(memberId);
        res.send({status: "OK", member: oneMember});        
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const createNewMember = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.gender ||
        !body.dateOfBirth ||
        !body.email ||
        !body.password
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: {
                    error: 
                    "One of the following keys is missing or is empty: `name`, `gender`, `dateOfBirth`, `email`, `password`"
                },
            });
    };
    const newMember = {
        name: body.name,
        gender: body.gender,
        dateOfBirth: new Date(body.dateOfBirth),
        email: body.email,
        password: body.password, 
    };
    try {
        const createdMember = await memberService.createNewMember(newMember);
        // 201 request has succeeded and has led to the creation of a resource.
        res.status(201).send({ status: "OK", member: createdMember });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

const updateOneMember = async (req, res) => {
    const { 
        body,
        params: { memberId } 
    } = req;
    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':memberId' can not be empty" },
            });
    };
    try {
        const updatedMember = await memberService.updateOneMember(memberId, body);
        res.send({status: "OK", updated: updatedMember});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };    
};

const deleteOneMember = async (req, res) => {
    const {
        params: { memberId },
    } = req;
    if (!memberId) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':memberId' can not be empty" },
            });
    };
    try {
        const deletedMember = await memberService.deleteOneMember(memberId);
        res.send({status: "OK", deleted: deletedMember});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error }});
    };
};

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
};