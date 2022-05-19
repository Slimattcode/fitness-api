"use strict";
// business logic: transforming data structures and communicating with database layer;

const member = require("../data/member");

const getAllMembers = async () => {
  const allMembers = await member.getAllMembers();
  return allMembers;
};

const getOneMember = async (memberId) => {
  try {
    const oneMember = await member.getOneMember(memberId);
    return oneMember;
  } catch (error) {
    throw error;
  }
};

const createNewMember = async (newMember) => {
  let date = new Date();
  newMember.dateOfBirth = new Intl.DateTimeFormat("nl-NL").format(
    new Date(newMember.dateOfBirth)
  );
  const insertMember = {
    ...newMember,
    signedDate: new Intl.DateTimeFormat("nl-NL", {
      dateStyle: "full",
      timeStyle: "long",
    }).format(date),
  };
  const createdMember = await member.createNewMember(insertMember);
  return createdMember;
};

const updateOneMember = async (memberId, body) => {
  if (body.dateOfBirth) {
    body.dateOfBirth = new Intl.DateTimeFormat("nl-NL").format(
      new Date(body.dateOfBirth)
    );
  }
  const updatedMember = await member.updateOneMember(memberId, body);
  return updatedMember;
};

const deleteOneMember = async (memberId) => {
  const deletedMember = await member.deleteOneMember(memberId);
  return deletedMember;
};

module.exports = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};
