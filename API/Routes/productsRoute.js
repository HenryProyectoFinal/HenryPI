const { Router } = require("express");
const cors = require("cors");
const { 
  getAllProducts, 
  createProduct, 
  getProduct, 
  updateProduct, 
  deleteProduct,
  getNameProduct } = require("../Controllers/products.js");

productsRouter = Router();

productsRouter.get("/products", cors(), async (req, res) => {
  //Si no hay productos en la BD, devuelve un arreglo vacío. NO es un error...
  try {
    const allProducts = await getAllProducts();
    res.json(allProducts);
  } catch (error) {
    console.log(error);
  };
});

productsRouter.post("/products", cors(), async (req, res) => {
  //Si algún dato no es válido o falta, se lanzan los errores correspondientes. Faltan las funciones validadoras.
  try {
    const { name, description, price, images, category, brand, reviews, questions } = req.body;
    const newProduct = await createProduct(
      name, description, price, images, category, brand, reviews, questions
    );
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
  };
});

productsRouter.get("/product/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

productsRouter.put("/product/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body; //Hay que preguntar a los del frontend si están usando Axios o similares...
    //Recibe active por body, en caso de que el admin quiera hacer un borrado lógico...
    const updatedProduct = await updateProduct(id, update);
    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

productsRouter.delete("/product/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProduct(id);
    res.status(204);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

//buscar producto por name
productsRouter.get('/products/search', cors(), async (req, res, next) => {
  try{
      const { name } = req.query;
      if (name) {
          const product = await getNameProduct(name)
          return res.json(product)
      } else {
          next()
      }
  }catch (error) {
    res.status(404).json(error.message);
  };
});

const router = Router();
router.use("/", productsRouter);

module.exports = router;