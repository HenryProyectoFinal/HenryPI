const Location = require("../models/location")

//funcion en la que me traigo todas las locations
const getLocations= async () => {
    try {
        const locations = await Location.find()
            return locations
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//funcion en la que busco location por id
const getLocationsId= async (id) => {
    try {
        const locationId = await Location.findOne({_id: id}).exec()
            return locationId
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//funcion para crear locations
const createLocation= async (address, province, city, zip) => {
    try {
            const createdLocation = new Location({
                address,
                province,
                city,
                zip,
            })
            const newLocation= await createdLocation.save()
            return newLocation
        
    } catch (error) {
        console.log(error);
    }
}

//funcion para cambiar dato
const updateLocations= async (id, update) => {
    try {
            await Location.findByIdAndUpdate(
                {_id: id},
                {
                    address: update.address,
                    province: update.province,
                    city:update.city,
                    zip: update.zip,
                }
            )
            const newLocation = await Location.findById({_id: id}); 
            if(newLocation === null) {
                const updatLocation= {
                    address: newLocation.address,
                    province: newLocation.province,
                    city: newLocation.city,
                    zip: newLocation.zip,
                }
                return updatLocation
            } 
    } catch (error) {
    res.status(400).json(error.message)
}
}


//funcion para eliminar location por id
async function deletedLocation(id) {
    try {
        const deleteLocation = await Location.deleteMany({_id: id})
        return deleteLocation
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//Función para encontrar location por cualquiera de los datos menos el id...
const findLocation = async (address, province, city, zip) => {
    const location = await Location.findOne({
        address: address, province: province, city: city, zip: zip
    });
    return location;
};

module.exports = {
    getLocations,
    getLocationsId,
    updateLocations,
    createLocation,
    deletedLocation,
    findLocation};