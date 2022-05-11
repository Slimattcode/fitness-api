"use strict"
// business logic: transforming data structures and communicating with database layer;

const member = require("../database/member");

const getAllMembers = async () => {
    try {
        const allMembers = await member.getAllMembers();
        return allMembers;
    } catch (error) {
        throw error;
    };
};

const getOneMember = async (memberId) => {
    try {
        const oneMember = await member.getOneMember(memberId);
        return oneMember;
    } catch (error) {
        throw error;
    };
};

const createNewMember = async (newMember) => {
    let date = new Date();
    const insertMember = {
        ...newMember,
        signedDate: date
    };
    try {
        const createdMember = await member.createNewMember(insertMember);
        return createdMember;
    } catch (error) {
        throw error;
    };
};

const updateOneMember = async (memberId, body) => {
    const changes = {
        ...body, 
    };
    try {
        const updatedMember = await member.updateOneMember(memberId, changes);
        return updatedMember;
    } catch (error) {
        throw error;
    };
};

const deleteOneMember = async (memberId) => {
    try {
        const deletedMember = await member.deleteOneMember(memberId);
        return deletedMember;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getAllMembers,
    getOneMember,
    createNewMember,
    updateOneMember,
    deleteOneMember,
};