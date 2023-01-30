const { Router } = require('express');
const {getUsers, getUsersId, createUser, deletedUser,updateUsers}= require('../Controllers/users.js')
const usersRouter = Router();
const cors = require("cors");     //Prueba para validators
const {validateNewUser} = require('../Validators/user.js')
const {validate} = require("../Helpers/validateHelper.js")




//traer todos los usuarios
usersRouter.get('/users',async (req, res) => {
    try{
        const users= await getUsers();
        return res.send(users);
    }catch (error) {
        res.status(404).json(error.message);
    };
});

//buscar usuario por id
usersRouter.get('/users/:id',async (req, res) => {
    const {id}=req.params;
    try{
        const userId= await getUsersId(id);
        return res.send(userId);
    }catch (error) {
        res.status(404).json(error.message);
    };
});


// Post crear nuevo usuario
usersRouter.post('/user', cors(), validate(validateNewUser), createUser)

// Delete usuario (borrado lógico de usuario)
usersRouter.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await deletedUser(id);
        res.status(200).json("Borrado logico: USUARIO INACTIVO");
    } catch (err) {
        res.status(404).json(err.message);
    }
})

//modificar usuario
usersRouter.put("/users/:id", async (req, res) => {
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