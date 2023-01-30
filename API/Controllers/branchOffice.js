const { Types } = require("mongoose");
const BranchOffice = require("../models/branchOffice.js");

const getAllBranchOffices = async () => {
  const branchOffice = await BranchOffice.find({});

  return branchOffice;
};

const createBranchOffice = async (req, res, next) => {
  const newBranchOffice = new BranchOffice(req);
  newBranchOffice.save()

  return newBranchOffice;
};

const getBranchOffice = async id => {
  const branchOffice = await BranchOffice.findById(id);
  if(branchOffice === null) throw new Error("The branch office with the provided id could not be found.");
  
  return branchOffice;
};

const updateBranchOffice = async (id, update) => {
  const branchOffice = BranchOffice.findByIdAndUpdate(id, { $set: update }, { new: true })

  return branchOffice;
};

const deleteBranchOffice = async id => {
  const branchOffice = BranchOffice.findByIdAndUpdate(id, { $set: {"active": false} }, { new: true })

  return branchOffice;
};

module.exports = {
  getAllBranchOffices,
  createBranchOffice,
  getBranchOffice,
  updateBranchOffice,
  deleteBranchOffice
};