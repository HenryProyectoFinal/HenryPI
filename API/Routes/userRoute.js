const { Router } = require('express');
const {
    checkRequiredPermissions,
    validateAccessToken} = require("../Auth0/auth0.middleware.js");
  const {
    userPermissions,
    adminPermissions
  } = require("../Auth0/auth0.permissions.js");
const {getUsers, getUsersId, createUser, deletedUser, updateUsers, getUserEmail}= require('../Controllers/users.js');
const {getSaleByUser} = require('../Controllers/sales.js')
const usersRouter = Router();
const cors = require("cors");     //Prueba para validators
const {validateNewUser} = require('../Validators/user.js')
const {validate} = require("../Helpers/validateHelper.js")

//traer todos los usuarios
usersRouter.get(
    '/users',
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    try{
        const users= await getUsers();
        return res.send(users);
    }catch (error) {
        res.status(404).json(error.message);
    };
});

//buscar usuario por id
usersRouter.get(
    '/users/:id',
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    const {id}=req.params;
    try{
        const userId= await getUsersId(id);
        return res.send(userId);
    }catch (error) {
        res.status(404).json(error.message);
    };
});


//Comprobar si existe un usuario con un email dado
usersRouter.get(
    '/user/:email',
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { email } = req.params;
        const userExists = await getUserEmail(email);
        if(userExists) {
            res.status(200).json(true);
        } else {
            res.status(200).json(false);
        };
    } catch (error) {
        res.status(404).json(error.message);
    };
    });

usersRouter.get(
    '/users/:name',
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    const {userName}=req.params;
    try{
        const userNameS= await getUsersName(userName);
        return res.send(userNameS);
    }catch (error) {
        res.status(404).json(error.message);
    };
});

//Traer todos los datos del usuario con el email
usersRouter.get(
    '/useremail/:email',
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { email } = req.params;
        const user = await getUserEmail(email);
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(200).json("No existe un usuario con el correo electrónico proporcionado.");
        };
    } catch (error) {
        res.status(404).json(error.message);
    };
    });

// Post crear nuevo usuario
usersRouter.post(
    '/user',
    // validateAccessToken,
    validate(validateNewUser),
    createUser)

usersRouter.get(
    '/user/:id/sales',
    async (req, res) => {
        try {
            const { id } = req.params;
            const userSales = await getSaleByUser(id);
            res.status(200).json(userSales);
        } catch (error) {
            res.status(404).json(error.message);
        }
    }
);

// Delete usuario (borrado lógico de usuario)
usersRouter.delete(
    "/users/:id",
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    const { id } = req.params;
    try {
        await deletedUser(id);
        res.status(200).json("Borrado logico: USUARIO INACTIVO");
    } catch (err) {
        res.status(404).json(err.message);
    }
})

//modificar usuario
usersRouter.put(
    "/users/:id",
    // validateAccessToken,
    // checkRequiredPermissions([]),
    async (req, res) => {
    const {id}= req.params;
    const update=req.body;
    try{
        const updateUser=await updateUsers(id,update);
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(404).json(err.message);
    }
})

const router = Router();
router.use("/", usersRouter);

module.exports = router;