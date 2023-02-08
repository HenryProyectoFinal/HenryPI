const Claim = require("../models/claim.js");


const getAllClaims = async () => {
  const claims = await Claim.find()
  .populate("user"); //No se referencia la venta, para evitar bucle infinito de referencias...
  return claims;
};

const createClaim = async (sale,email, issue, description, user, status, solution) => {
  const newClaim = new Claim({
    sale,
    email,
    issue,
    description,
    user,
    status,
    solution
  });
  newClaim.save();
  return newClaim;
};

const getClaim = async id => {
  const claimDB = Claim.findById(id)
  .populate("user");
  if(claimDB === null) throw new Error("The claim with the provided id could not be found.");
  return claimDB;
};

const updateClaim = async (id, update) => {
  await Claim.findByIdAndUpdate(id, {
    issue: update.issue,
    description: update.description,
    status: update.status,
    solution: update.solution
  });
  const claim = await Claim.findById(id)
  .populate("user");
  if(claim === null) throw new Error("The claim with the provided id could not be found.");
  return claim;
};

const switchClaim = async (id, active) => {
  const claim = await Claim.findById(id);
  if(claim === null) throw new Error("The claim with the provided id could not be found.");
  await Claim.findByIdAndUpdate(id, {active: active});
};

module.exports = {
  getAllClaims,
  createClaim,
  getClaim,
  updateClaim,
  switchClaim
};