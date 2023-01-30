const { Router } = require('express');
const {
    checkRequiredPermissions,
    validateAccessToken} = require("../Auth0/auth0.middleware.js");
  const {
    userPermissions,
    adminPermissions
  } = require("../Auth0/auth0.permissions.js");
const {getUsers, getUsersId, createUser, deletedUser, updateUsers}= require('../Controllers/users.js');
const usersRouter = Router();

//traer todos los usuarios
usersRouter.get(
    '/users',
    validateAccessToken,
    checkRequiredPermissions([]),
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
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    const {id}=req.params;
    try{
        const userId= await getUsersId(id);
        return res.send(userId);
    }catch (error) {
        res.status(404).json(error.message);
    };
});


// Post crear nuevo usuario
usersRouter.post(
    '/user',
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { firstName, lastName, userName, phoneNumber, email, password, location } = req.body;
        const newUser = await createUser(
            firstName, lastName, userName, phoneNumber, email, password, location
        )
        res.status(201).json(newUser);
    } catch (err) {
        res.status(404).send(err.message)
    }
})

// Delete usuario (borrado lógico de usuario)
usersRouter.delete(
    "/users/:id",
    validateAccessToken,
    checkRequiredPermissions([]),
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
    validateAccessToken,
    checkRequiredPermissions([]),
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