const { Router } = require('express');
const {getUsers, getUsersId, createUser, deletedUser,updateUsers}= require('../Controllers/user.js')
const router = Router();
const cors = require("cors");

//traer todos los usuarios
router.get('/users',async (req, res) => {
    try{
        const users= await getUsers();
        return res.send(users);
    }catch (error) {
        res.status(404).json(error.message);
    };
});

//buscar usuario por id
router.get('/users/:id',async (req, res) => {
    const {id}=req.params;
    try{
        const userId= await getUsersId(id);
        return res.send(userId);
    }catch (error) {
        res.status(404).json(error.message);
    };
});

// Post crear nuevo usuario
router.post('/user', cors(), async (req, res) => {
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
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await deletedUser(id);
        res.status(200).json("Borrado logico: USUARIO INACTIVO");
    } catch (err) {
        res.status(404).json(err.message);
    }
})

//modificar usuario
router.put("/users/:id", async (req, res) => {
    const {id}= req.params;
    const update=req.body;
    try{
        const updateUser=await updateUsers(id,update);
        res.status(200).json(updateUser);
    } catch (err) {
        res.status(404).json(err.message);
    }
})

module.exports = router;