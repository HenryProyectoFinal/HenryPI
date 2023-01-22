const { Types } = require("mongoose");
const User = require("../models/user.js");

//funcion en la que me traigo todos los usurios
const getUsers= async () => {
    try {
        const users = await User.find()
            return users
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//funcion en la que busco usuario por id
const getUsersId= async (id) => {
    try {
        const usersId = await User.findOne({_id: id}).exec()
            return usersId
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//funcion para eliminar usuario por id
const deletedUser= async (id) => {
    try {
        const deleteUsers = await User.deleteMany({_id: id})
        return deleteUsers
    } catch (error) {
        res.status(400).json(error.message)
    }
}


//funcion para crear usuario
const createUser = async (firstName, lastName, userName, phoneNumber, email, password, location) => {
    try {
        const createUser = new User({
            firstName,
            lastName,
            userName,
            phoneNumber,
            email,
            password,
            location: Types.ObjectId(location),
            }
        )
        const newUser= await createUser.save()
        return newUser
        } catch (error) {
        res.status(400).json(error.message)
    }
}


//funcion para cambiar dato
const updateUsers= async (id, update) => {
    try {
        await User.findByIdAndUpdate(
            {_id: id},
            {
                    firstName: update.firstName,
                    lastName: update.lastName,
                    userName:update.userName,
                    phoneNumber: update.phoneNumber,
                    email: update.email,
                    password:update.password,
                    location: Types.ObjectId(update.location),
            }
            )
            const newUser = await User.findById({_id: id}); 
            if(newUser === null) {
                const updatUser= {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    userName:newUser.userName,
                    phoneNumber: newUser.phoneNumber,
                    email: newUser.email,
                    password:newUser.password,
                    location: Types.ObjectId(newUser.location),
                }
                return updatUser
            }
    } catch (error) {
    res.status(400).json(error.message)
}
}

module.exports = {getUsers,getUsersId, createUser, deletedUser, updateUsers}