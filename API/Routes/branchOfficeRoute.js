const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const { Router } = require("express");

const { 
  getAllBranchOffices,
  createBranchOffice,
  getBranchOffice,
  updateBranchOffice,
  deleteBranchOffice } = require("../Controllers/branchOffice.js");

const branchOfficeRouter = express.Router();

branchOfficeRouter.use(bodyParser.json());

branchOfficeRouter.get("/branchs", cors(), async (req, res, next) => {
    try {
        const allbranchOffices = await getAllBranchOffices();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(allbranchOffices);
    } catch (error) {
        next(error)
    };
});

branchOfficeRouter.post("/branchs", cors(), async (req, res, next) => {
    try {
        const newBranchOffice = await createBranchOffice(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newBranchOffice);
    } catch (error) {
        next(error)
    };
  });

  branchOfficeRouter.put("/branchs", cors(), async (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /branchs');
});

branchOfficeRouter.delete("/branchs", cors(), async (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /branchs');
});

branchOfficeRouter.get("/branchs/:branchId", cors(), async (req, res, next) => {
    try {
        const branchOffice = await getBranchOffice(req.params.branchId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(branchOffice);
    } catch (error) {
        next(error)
    };
});

branchOfficeRouter.post("/branchs/:brandId", cors(), async (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /branchs/' + req.params.brandId);
});

branchOfficeRouter.put("/branchs/:branchId", cors(), async (req, res, next) => {
    try {
        const { branchId } = req.params;
        const update = req.body;

        const updatedBranchOffice = await updateBranchOffice(branchId, update);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updatedBranchOffice);
    } catch (error) {
        next(error);
    };
});

branchOfficeRouter.delete("/branchs/:branchId", cors(), async (req, res, next) => {
    try {
        const { branchId } = req.params;

        const branch = await deleteBranchOffice(branchId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(branch);
    } catch (error) {
        next(error);
    };
});

const router = Router();
router.use("/", branchOfficeRouter);

module.exports = router;