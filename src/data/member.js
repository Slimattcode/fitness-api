"use strict";

const Member = require("../models/member");
const NotFoundError = require("../errors/not-found");
const BadRequestError = require("../errors/bad-request");

const getAllMembers = async () => {
  const docs = await Member.find({});
  return docs;
};

const getOneMember = async (memberId) => {
  const docs = await Member.findById(memberId);
  if (!docs) {
    throw new NotFoundError(`No member with the id '${memberId}'`);
  }
  return docs;
};

const createNewMember = async (insertMember) => {
  const docs = await Member.findOne({ name: insertMember.name });
  if (docs) {
    throw new BadRequestError(
      `Member with the name '${docs.name}' already exists`
    );
  }
  let member = new Member(insertMember);
  await member.save();
  return member;
};

const updateOneMember = async (memberId, body) => {
  const { name, gender, dateOfBirth, email, password } = body;
  if (!name && !gender && !dateOfBirth && !email && !password) {
    throw new BadRequestError(
      "Specify at least one field: `name`, `gender`, `dateOfBirth`, `email`, `password`"
    );
  }
  const docs = await Member.findByIdAndUpdate(memberId, body, {
    useFindAndModify: false,
    returnDocument: "after",
  });
  if (!docs) {
    throw new NotFoundError(`No member with id ${memberId}`);
  }
  return docs;
};

const deleteOneMember = async (memberId) => {
  const doc = await Member.findById(memberId);
  if (!doc) {
    throw new NotFoundError(`No member with the id '${memberId}`);
  }
  let docs = await Member.findByIdAndDelete(memberId);
  return docs;
};

module.exports = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};
