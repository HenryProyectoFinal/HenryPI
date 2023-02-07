const dotenv = require("dotenv");
dotenv.config();
const { PORT, CLIENT_ORIGIN_URL } = process.env;
const express = require("express");
const cors = require("cors");
const productsRoute = require("./Routes/productsRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const branchOfficeRoute = require("./Routes/branchOfficeRoute.js");
const categoryRoute = require("./Routes/categoriesRoute.js");
const saleRoute = require("./Routes/salesRoute");
const usersRoute = require("./Routes/userRoute.js");
const locationRoute = require("./Routes/locationRoute");
const reviewsRoute = require("./Routes/reviewsRoute.js");
const questionsRoute = require("./Routes/questionsRoute.js");
const claimsRoute = require("./Routes/claimsRoute.js");
const mercadoPagoRouter = require("./Routes/mercadoPagoRoute");
const emailRouter= require("./Routes/emailRouter.js")

const app = express();
app.use(express.urlencoded({extended: true}));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400, //Tal vez convenga reducirlo...
  })
);

app.use("/", productsRoute);
app.use("/", brandRoute);
app.use("/", branchOfficeRoute);
app.use("/", categoryRoute);
app.use("/", saleRoute);
app.use("/", usersRoute);
app.use("/", locationRoute);
app.use("/", mercadoPagoRouter);
app.use("/", reviewsRoute);
app.use("/", questionsRoute);
app.use("/", claimsRoute);
app.use("/", emailRouter);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});

module.exports = app;