const express = require("express");
const productsRoute = require("./Routes/productsRoute.js");
const brandRoute = require("./Routes/brandRoute.js");
const branchOfficeRoute = require("./Routes/branchOfficeRoute.js");

const app = express();
const port = 3001;
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", productsRoute);
app.use("/", brandRoute);
app.use("/", branchOfficeRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = app;