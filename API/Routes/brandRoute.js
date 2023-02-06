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
    getAllBrands,
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand } = require("../Controllers/brands.js");

const brandRouter = express.Router();

brandRouter.use(bodyParser.json());

brandRouter.get(
    "/brands",
    async (req, res, next) => {
    try {
        const allBrands = await getAllBrands();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(allBrands);
    } catch (error) {
        next(error)
    };
});

brandRouter.post(
    "/brands",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    try {
        const newBrand = await createBrand(req.body);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(newBrand);
    } catch (error) {
        next(error)
    };
  });

brandRouter.put(
    "/brands",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /brands');
});

brandRouter.delete(
    "/brands",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /brands');
});

brandRouter.get(
    "/brands/:brandId",
    async (req, res, next) => {
    try {
        const brand = await getBrand(req.params.brandId);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(brand);
    } catch (error) {
        next(error)
    };
});

brandRouter.post(
    "/brands/:brandId",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /brands/' + req.params.brandId);
});

brandRouter.put(
    "/brands/:brandId",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    try {
        const { brandId } = req.params;
        const update = req.body;

        const updatedBrand = await updateBrand(brandId, update);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(updatedBrand);
    } catch (error) {
        next(error);
    };
});

brandRouter.delete(
    "/brands/:brandId",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.brand]),
    async (req, res, next) => {
    try {
        const { brandId } = req.params;

        const brand = await deleteBrand(brandId);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(brand);
    } catch (error) {
        next(error);
    };
});

const router = Router();
router.use("/", brandRouter);

module.exports = router;