const express = require("express");
const productsRoute = require("./Routes/productsRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const branchOfficeRoute = require("./Routes/branchOfficeRoute.js");
const categoryRoute = require("./Routes/categoriesRoute.js");
const saleRoute = require("./Routes/salesRoute");
const usersRoute = require("./Routes/userRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const locationRoute = require("./Routes/locationRoute");
const reviewsRoute = require("./Routes/reviewsRoute.js");
const questionsRoute = require("./Routes/questionsRoute.js");
const claimsRoute = require("./Routes/claimsRoute.js");
const mercadoPagoRouter = require("./Routes/mercadoPagoRoute");


const app = express();
const port = 3001;
app.use(express.urlencoded({extended: true}));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
var cors = require('cors');
app.use(cors());

app.use("/", productsRoute);
app.use("/", brandRoute);
app.use("/", branchOfficeRoute);
app.use("/", categoryRoute);
app.use("/", saleRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", locationRoute);
app.use("/", mercadoPagoRouter);
app.use("/", reviewsRoute);
app.use("/", questionsRoute);
app.use("/", claimsRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;