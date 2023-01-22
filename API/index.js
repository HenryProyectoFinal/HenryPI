const express = require("express");
const productsRoute = require("./Routes/productsRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const branchOfficeRoute = require("./Routes/branchOfficeRoute.js");
const categoryRoute = require("./Routes/categoriesRoute.js");
const saleRoute = require("./Routes/salesRoute");
const userRoute = require("./Routes/userRoute");
const locationRoute = require("./Routes/locationRoute");

const app = express();
const port = 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", productsRoute);
app.use("/", brandRoute);
app.use("/", branchOfficeRoute);
app.use("/", categoryRoute);
app.use("/", saleRoute);
app.use("/", userRoute);
app.use("/", locationRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;