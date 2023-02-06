const express = require('express');
const bodyParser = require('body-parser');
const { Router } = require("express");
// const {
//     checkRequiredPermissions,
//     validateAccessToken} = require("../Auth0/auth0.middleware.js");
// const {
//     userPermissions,
//     adminPermissions
//   } = require("../Auth0/auth0.permissions.js");
const { 
  getAllBranchOffices,
  createBranchOffice,
  getBranchOffice,
  updateBranchOffice,
  deleteBranchOffice } = require("../Controllers/branchOffice.js");

const branchOfficeRouter = express.Router();

branchOfficeRouter.use(bodyParser.json());

branchOfficeRouter.get(
  "/branchs",
  async (req, res, next) => {
    try {
        const allbranchOffices = await getAllBranchOffices();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(allbranchOffices);
    } catch (error) {
        next(error)
    };
});

branchOfficeRouter.post(
  "/branchs",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.branchOffice]),
  async (req, res, next) => {
    try {
        const newBranchOffice = await createBranchOffice(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newBranchOffice);
    } catch (error) {
        next(error)
    };
  });

  branchOfficeRouter.put(
    "/branchs",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.branchOffice]),
    async (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /branchs');
});

branchOfficeRouter.delete(
  "/branchs",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.branchOffice]),
  async (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /branchs');
});

branchOfficeRouter.get(
  "/branchs/:branchId",
  async (req, res, next) => {
    try {
        const branchOffice = await getBranchOffice(req.params.branchId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(branchOffice);
    } catch (error) {
        next(error)
    };
});

branchOfficeRouter.post(
  "/branchs/:brandId",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.branchOffice]),
  async (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /branchs/' + req.params.brandId);
});

branchOfficeRouter.put(
  "/branchs/:branchId",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.branchOffice]),
  async (req, res, next) => {
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

branchOfficeRouter.delete(
  "/branchs/:branchId",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.branchOffice]),
  async (req, res, next) => {
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