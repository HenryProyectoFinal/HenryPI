const axios = require("axios");

const tokenEndpoint = "/oauth/token";

const oAuth = async (req, res, next) => {
  try {
    const code = req.query.code;

    if(!code) {
    res.status(401).send("Missing authorization code.");
    };

    const params = new URLSearchParams();
    params.append("grand_type", "authorization_code");
    params.append("client_id", ""); //Ir a settings en la aplicación del dashboard de Auth0
    params.append("client_secret", ""); //Ir a settings en la aplicación del dashboard de Auth0
    params.append("code", code); //Ir a settings en la aplicación del dashboard de Auth0
    params.append("redirect_uri", ""); //Reemplazar por la ruta del login del frontend (aplication en Auth0)
    const response = await axios.post(tokenEndpoint, params);
    req.oauth = response.data;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json(`Reason: ${error.message}`); //Pueden haber otros errores...
  };
};

module.exports = oAuth;