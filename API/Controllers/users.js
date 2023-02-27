const { Types } = require("mongoose");
const User = require("../models/user.js");
const nodemailer= require('nodemailer')
const {mandarEmail} =require('../mailer/nodemailer.js')


//funcion en la que me traigo todos los usurios
const getUsers= async () => {
    try {
        const users = await User.find({}).populate("location favorites shoppingCart")
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
//funcion en la que busco usuario por id
const getUsersName= async (userName) => {
    try {
        const usersId = await User.findOne({userName}).exec()
            return usersId
    } catch (error) {
        res.status(400).json(error.message)
    }
}

//Función para buscar usuario por email
const getUserEmail = async email => {
    try {
        const user = await User.findOne({email: email});
        return user;
    } catch (error) {
        res.status(400).json(error.message);
    };
};

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
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, userName, phoneNumber, email, location } = req.body;
        const createUser = new User({
            firstName,
            lastName,
            userName,
            phoneNumber,
            email,
            location: Types.ObjectId(location),
            }
        )
        mandarEmail(email)
        const newUser= await createUser.save()
        res.status(201).json(newUser) 
    } catch (error) {
        res.status(400).json(error.message)
    }
}


//funcion para cambiar dato
const updateUsers= async (id, update) => {
    const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true }).populate("location")
    return user;
}

module.exports = {getUsers,getUsersId, createUser, deletedUser, updateUsers, getUserEmail}
