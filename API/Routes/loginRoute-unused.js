// const express = require("express");
const { Router } = require("express");
const cors = require("cors");
const axios = require("axios");
// const port = process.env.PORT || 3001;
const oAuth = require("../oAuth.js");

loginRouter = Router();

const loginAPIEndpoint = "http://localhost:8080/login"; //URL de la API

loginRouter.use(oAuth);

loginRouter.get("/login", cors(), async (req, res) => {
  try {
    const { access_token } = req.oauth;
    const response = await axios({
      method: "get",
      url: loginAPIEndpoint,
      headers: {"Authorization": `Bearer ${access_token}`}
    });
    res.json(response.data);
  } catch (error) {
    console.log(error);
    if(error.response.status === 401) res.status(401).send("Unauthorized to user data.");
    else if(error.response.status === 403) res.status(403).send("Permission denied.");
    else res.status(500).send("Something went wrong.");
  };
});

const router = Router();
router.use("/", loginRouter);

module.exports = router;