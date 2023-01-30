const { Router } = require("express");
const cors = require("cors");
const { 
  getAllClaims,
  createClaim,
  getClaim,
  updateClaim,
  switchClaim} = require("../Controllers/claims.js");

claimsRouter = Router();

claimsRouter.get("/claims", cors(), async (req, res) => {
  try {
    const allClaims = await getAllClaims();
    res.json(allClaims);
  } catch (error) {
    console.log(error);
  };
});

claimsRouter.post("/claims", cors(), async (req, res) => {
  try {
    const { sale, issue, description, user, status, solution } = req.body;
    const newClaim = await createClaim(sale, issue, description, user, status, solution);
    res.status(201).json(newClaim);
  } catch (error) {
    console.log(error);
  };
});

claimsRouter.get("/claim/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const claim = await getClaim(id);
    res.json(claim);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

claimsRouter.put("/claim/:id", cors(), async(req, res) => {
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

claimsRouter.patch("/claim/:id", cors(), async(req, res) => {
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