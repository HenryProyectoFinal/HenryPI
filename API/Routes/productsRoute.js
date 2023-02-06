const { Router } = require("express");
const cors = require("cors");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../Auth0/auth0.middleware.js");
const {
  userPermissions,
  adminPermissions,
} = require("../Auth0/auth0.permissions.js");
const {
  getAllProducts,
  createProduct,

  updateProduct,
  // deleteProduct,
  // recoverProduct,
  switchProduct,
  getNameProduct,
} = require("../Controllers/products.js");
const { validateNewProduct } = require("../Validators/product.js");
const { validate } = require("../Helpers/validateHelper.js");

productsRouter = Router();

productsRouter.get("/products", async (req, res) => {
  //Si no hay productos en la BD, devuelve un arreglo vacío. NO es un error...
  try {
    const allProducts = await getAllProducts();
    res.json(allProducts);
  } catch (error) {
    console.log(error);
  }
});

productsRouter.post("/products",
  cors(),
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.product]),
  validate(validateNewProduct),
  createProduct)
  //Si algún dato no es válido o falta, se lanzan los errores correspondientes. Faltan las funciones validadoras.

productsRouter.get("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  }
});

productsRouter.put(
  "/product/:id",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.product]),
  async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body; //Hay que preguntar a los del frontend si están usando Axios o similares...
      //Recibe active por body, en caso de que el admin quiera hacer un borrado lógico...
      const updatedProduct = await updateProduct(id, update);
      res.json(updatedProduct);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  }
);

// productsRouter.delete("/product/:id", cors(), async (req, res) => { //Ruta para borrado lógico
//   try {
//     const { id } = req.params;
//     await deleteProduct(id);
//     return res.status(204).send("Done");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   };
// });

// productsRouter.patch("/product/:id", cors(), async (req, res) => { //Ruta para revertir borrado lógico
//   try {
//     const { id } = req.params;
//     await recoverProduct(id);
//     return res.status(204).send("Done");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   };
// });

productsRouter.patch(
  "/product/:id",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.product]),
  async (req, res) => { //Ruta para cambiar "active" a true o false
  try {
    const { id } = req.params;
    const { active } = req.body;
    await switchProduct(id, active);
    return res.status(204).send("Done"); //Sin el .send, se queda cargando y la respuesta nunca llega...
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});


// productsRouter.delete("/product/:id", cors(), async (req, res) => { //Ruta para borrado físico
//   try {
//     const { id } = req.params;
//     await deleteProduct(id);
//     return res.status(204).send("Done");
//   } catch (error) {
//     console.log(error);
//     res.status(404).send(error.message);
//   };
// });

//buscar producto por name
productsRouter.get("/products/search", async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const product = await getNameProduct(name);
      return res.json(product);
    } else {
      next();
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
});

const router = Router();
router.use("/", productsRouter);

module.exports = router;
