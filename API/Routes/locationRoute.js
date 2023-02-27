const { Router } = require('express');
const {
    checkRequiredPermissions,
    validateAccessToken} = require("../Auth0/auth0.middleware.js");
  const {
    userPermissions,
    adminPermissions
  } = require("../Auth0/auth0.permissions.js");
const {
    getLocations,
    createLocation,
    getLocationsId,
    updateLocations,
    deletedLocation,
    findLocation }= require('../Controllers/location.js');

const router = Router();

//traer todos los location
router.get(
    '/location',
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.location]),
    async (req, res) => {
    try{
        const allLocation= await getLocations()
        return res.send(allLocation);
    }catch (error) {
        res.status(404).json(error.message)
    };
});

//buscar location por id
router.get(
    '/location/:id',
    // validateAccessToken,
    // checkRequiredPermissions([userPermissions.location]),
    async (req, res) => {
    const {id}=req.params
    try{
        const locationId= await getLocationsId(id)
        return res.send(locationId);
    }catch (error) {
        res.status(404).json(error.message)
    };
});


// Delete location
router.delete(
    "/location/:id",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.location]),
    async (req, res) => {
    const { id } = req.params
    try {
        await deletedLocation(id)
        res.status(200).json("Location borrada")
    } catch (err) {
        res.status(404).json(err.message)
    }
})

// Post crear nueva Location
router.post(
    '/location',
    // validateAccessToken,
    // checkRequiredPermissions([userPermissions.location]),
    async (req, res) => {
    try {
        const {address, province, city, zip} = req.body;
        const locationExists = await findLocation(
            address, province, city, zip
        );
        if(locationExists) return res.status(200).json(locationExists);
        const newLocation = await createLocation(
            address, province, city, zip
        );
        res.status(201).json(newLocation)
    } catch (err) {
        console.log(err);
        // res.status(404).send(err.message)
        //Confunde que siempre mande un 404, el error puede ser de otra naturaleza.
    }
})

//modificar usuario
router.put(
    "/location/:id",
    // validateAccessToken,
    // checkRequiredPermissions([userPermissions.location]),
    async (req, res) => {
    const { id }= req.params;
    const update= req.body;
    try{
        const updateLocation= await updateLocations(id,update);
        res.status(200).json(updateLocation);
    } catch (err) {
        res.status(404).json(err.message);
    }
})

module.exports = router;