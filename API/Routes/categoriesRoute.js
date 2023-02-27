const { Router } = require("express");
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/categories.js')
// const {
//     checkRequiredPermissions,
//     validateAccessToken} = require("../Auth0/auth0.middleware.js");
// const {
//     userPermissions,
//     adminPermissions
//   } = require("../Auth0/auth0.permissions.js");
categoryRouter = Router();

categoryRouter.get(
    "/category",
    async (req, res) => {
    //Si no hay productos en la BD, devuelve un arreglo vacío. NO es un error...
    try {
      const allCategories = await getAllCategories();
      res.json(allCategories);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    };
  });
  
categoryRouter.post(
    "/category",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.category]),
    async (req, res) => {
  //Si algún dato no es válido o falta, se lanzan los errores correspondientes. Faltan las funciones validadoras.
    try {
        const { name, description, father } = req.body;
        const newCategory = await createCategory(
        name, description, father
        );
        res.status(201).json(newCategory);
    } catch (error) {
        console.log(error);
    };
});

categoryRouter.get(
    "/category/:id",
    async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        return res.status(200).json(category);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

categoryRouter.put(
    "/category/:id",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.category]),
    async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body; //Hay que preguntar a los del frontend si están usando Axios o similares...
        //Recibe active por body, en caso de que el admin quiera hacer un borrado lógico...
        const updatedCategory = await updateCategory(id, update);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

categoryRouter.delete(
    "/category/:id",
    // validateAccessToken,
    // checkRequiredPermissions([adminPermissions.category]),
    async (req, res) => {
    try {
        const { id } = req.params;
        const category = await deleteCategory(id);
        res.status(204).send(category);
    } catch (error) {
        res.status(404).json(error.message);
    };
});

const router = Router();
router.use("/", categoryRouter);

module.exports = router;