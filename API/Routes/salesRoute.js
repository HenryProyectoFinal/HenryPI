const { Router } = require("express");
const cors = require("cors");
const {
    checkRequiredPermissions,
    validateAccessToken} = require("../Auth0/auth0.middleware.js");
  const {
  
  } = require("../Auth0/auth0.permissions.js");
const { getAllSales, createSale, getSaleById, updateSale, deleteSale } = require('../Controllers/sales.js')
const { validateNewSale } = require("../Validators/sale.js");
const {validate} = require("../Helpers/validateHelper.js")

saleRouter = Router();

saleRouter.get(
    "/sale",
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    //Si no hay productos en la BD, devuelve un arreglo vacío. NO es un error...
    try {
      const allSales = await getAllSales();
      res.json(allSales);
    } catch (error) {
        return res.status(400).json({ message: error.message })
    };
  });

saleRouter.post("/sale", cors(), validateAccessToken, checkRequiredPermissions([]), validate(validateNewSale), createSale);
  //Si algún dato no es válido o falta, se lanzan los errores correspondientes. Faltan las funciones validadoras.

saleRouter.get(
    "/sale/:id",
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { id } = req.params;
        const sale = await getSaleById(id);
        return res.status(200).json(sale);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

saleRouter.put(
    "/sale/:id",
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body; //Hay que preguntar a los del frontend si están usando Axios o similares...
        //Recibe active por body, en caso de que el admin quiera hacer un borrado lógico...
        const updatedSale = await updateSale(id, update);
        res.status(200).json(updatedSale);
    } catch (error) {
        res.status(404).send(error.message);
    };
});

saleRouter.delete(
    "/sale/:id",
    validateAccessToken,
    checkRequiredPermissions([]),
    async (req, res) => {
    try {
        const { id } = req.params;
        await deleteSale(id);
        res.status(204).send('Sale deleted succesfully');
    } catch (error) {
        res.status(404).send(error.message);
    };
});

const router = Router();
router.use("/", saleRouter);

module.exports = router;