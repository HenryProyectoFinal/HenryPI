const { Router } = require("express");
const cors = require("cors");
const { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory } = require('../Controllers/categories.js')

categoryRouter = Router();

categoryRouter.get("/category", cors(), async (req, res) => {
    //Si no hay productos en la BD, devuelve un arreglo vacío. NO es un error...
    try {
      const allCategories = await getAllCategories();
      res.json(allCategories);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    };
  });
  
categoryRouter.post("/category", cors(), async (req, res) => {
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

categoryRouter.get("/category/:id", cors(), async (req, res) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        return res.status(200).json(category);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

categoryRouter.put("/category/:id", cors(), async (req, res) => {
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

categoryRouter.delete("/category/:id", cors(), async (req, res) => {
    try {
      const { id } = req.params;
      await deleteCategory(id);
        res.status(204).send('Category deleted succesfully');
    } catch (error) {
          res.status(404).send(error.message);
    };
});

const router = Router();
router.use("/", categoryRouter);

module.exports = router;