const { Router } = require("express");
// const {
//   checkRequiredPermissions,
//   validateAccessToken} = require("../Auth0/auth0.middleware.js");
// const {
//   userPermissions,
//   adminPermissions
// } = require("../Auth0/auth0.permissions.js");
const {
  getAllClaims,
  createClaim,
  getClaim,
  updateClaim,
  switchClaim} = require("../Controllers/claims.js");
  
  const {mandarEmail} =require('../mailer/nodemailerSale.js')

claimsRouter = Router();

claimsRouter.get(
  "/claims",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.claim]),
  async (req, res) => {
  try {
    const allClaims = await getAllClaims();
    res.json(allClaims);
  } catch (error) {
    console.log(error);
  };
});

claimsRouter.post(
  "/claims",
  // validateAccessToken,
  // checkRequiredPermissions([userPermissions.claim]),
  async (req, res) => {
  try {
    const { sale, email,issue, description, user, status, solution } = req.body;
    const newClaim = await createClaim(sale,email, issue, description, user, status, solution);
    mandarEmail(email)
    res.status(201).json(newClaim);
  } catch (error) {
    console.log(error);
  };
});

claimsRouter.get(
  "/claim/:id",
  // validateAccessToken,
  // checkRequiredPermissions([userPermissions.claim]),
  async (req, res) => {
  try {
    const { id } = req.params;
    const claim = await getClaim(id);
    res.json(claim);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

claimsRouter.put(
  "/claim/:id",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.claim]),
  async(req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedClaim = await updateClaim(id, update);
    res.json(updatedClaim);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

claimsRouter.patch(
  "/claim/:id",
  // validateAccessToken,
  // checkRequiredPermissions([userPermissions.claim]),
  async(req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    await switchClaim(id, active);
    return res.status(204).send("Done");
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

const router = Router();
router.use("/", claimsRouter);

module.exports = router;