"use strict";
// requests and responses for the endpoint, all stuff related to HTTP;

const memberService = require("../services/memberService");
const { StatusCodes } = require("http-status-codes");

const getAllMembers = async (req, res) => {
  const allMembers = await memberService.getAllMembers();
  res.status(StatusCodes.OK).json({ data: allMembers });
};

const getOneMember = async (req, res) => {
  const {
    params: { memberId },
  } = req;
  const oneMember = await memberService.getOneMember(memberId);
  res.status(StatusCodes.OK).json({ data: oneMember });
};

const createNewMember = async (req, res) => {
  const createdMember = await memberService.createNewMember(req.body);
  // 201 request has succeeded and has led to the creation of a resource.
  res.status(StatusCodes.OK).json({ data: createdMember });
};

const updateOneMember = async (req, res) => {
  const {
    body,
    params: { memberId },
  } = req;
  const updatedMember = await memberService.updateOneMember(memberId, body);
  res.status(StatusCodes.OK).json({ data: updatedMember });
};

const deleteOneMember = async (req, res) => {
  const {
    params: { memberId },
  } = req;
  const deletedMember = await memberService.deleteOneMember(memberId);
  res.status(StatusCodes.OK).json({ data: deletedMember });
};

module.exports = {
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember,
};
