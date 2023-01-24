const express = require("express");
const productsRoute = require("./Routes/productsRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const branchOfficeRoute = require("./Routes/branchOfficeRoute.js");
const categoryRoute = require("./Routes/categoriesRoute.js");
const saleRoute = require("./Routes/salesRoute");
const usersRoute = require("./Routes/userRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const reviewsRoute = require("./Routes/reviewsRoute.js");
const locationRoute = require("./Routes/locationRoute.js");
const questionsRoute = require("./Routes/questionsRoute.js");


const app = express();
const port = 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", productsRoute);
app.use("/", brandRoute);
app.use("/", branchOfficeRoute);
app.use("/", categoryRoute);
app.use("/", saleRoute);
app.use("/", usersRoute);
app.use("/", loginRoute);
app.use("/", locationRoute);
app.use("/", reviewsRoute);
app.use("/", questionsRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;