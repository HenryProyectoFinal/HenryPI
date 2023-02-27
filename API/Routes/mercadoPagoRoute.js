const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Router, request } = require("express");
const mercadopago = require("mercadopago");

mercadopago.configure({
  sandbox: true,
  access_token:
    "TEST-4568191331731835-012500-0e00faf39ed94415d18c606bc4bf9f57-1294898135",
});

const mercadoPagoRouter = express.Router();

mercadoPagoRouter.use(bodyParser.json());

mercadoPagoRouter.post("/api/pay", async (req, res, next) => {
  const productos = req.body;
  //const productsCopy = await

  let error = false;
  let preference = {
    items: [],
    back_urls: {
      success: "https://client-ochre-five.vercel.app/cart",
      failure: "https://client-ochre-five.vercel.app/cart",
      pending: "https://client-ochre-five.vercel.app/cart",
    },
    auto_return: "approved",
  };

  productos.map((producto) => {
    //Buscamos el producto y chequeamos el stock con un if

    preference.items.push({
      title: producto.name,
      unit_price: producto.price,
      quantity: producto.count,
    });
  });

  if (error) res.send("Sin stock").status(400);

  const response = await mercadopago.preferences.create(preference);
  const preferenceId = response.body.id;

  res.setHeader(
    "Content-Security-Policy",
    "frame-src 'self' https://www.mercadopago.com.uy/ https://www.mercadopago.com.ar/; frame-ancestors 'self' *.mercadolibre.com"
  );
  res.send(response);
});

mercadoPagoRouter.get("/cart", function (req, res) {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
});

const router = Router();
router.use("/", mercadoPagoRouter);

module.exports = router;
