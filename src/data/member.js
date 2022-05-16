"use strict";

const Member = require("../models/member");

const getAllMembers = async () => {
  try {
    const docs = await Member.find({});
    return docs;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMember = async (memberId) => {
  try {
    const docs = await Member.findById(memberId);
    if (!docs) {
      throw {
        status: 400,
        message: `Can't find member with the id '${memberId}'`,
      };
    }
    return docs;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMember = async (insertMember) => {
  try {
    const docs = await Member.findOne({ name: insertMember.name });
    if (docs) {
      throw {
        status: 400,
        message: `Member with the name '${docs.name}' already exists`,
      };
    }
    let member = new Member(insertMember);
    await member.save();
    return member;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneMember = async (memberId, changes) => {
  try {
    const docs = await Member.findByIdAndUpdate(memberId, changes, {
      useFindAndModify: false,
      returnDocument: "after",
    });
    return docs;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const deleteOneMember = async (memberId) => {
  try {
    const doc = await Member.findById(memberId);
    if (!doc) {
      throw {
        status: 400,
        message: `Cant find member with the id '${memberId}`,
      };
    }
    let docs = await Member.findByIdAndDelete(memberId);
    return docs;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

module.exports = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};
