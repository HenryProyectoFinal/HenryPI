const express = require("express");
const app = express();
const { expressjwt: jwt } = require('express-jwt');
const jwks = require('jwks-rsa');
const guard = require("express-jwt-permissions")();

const port = process.env.PORT || 3001;
const loginEndpoint = `http://localhost:8080/login`

const jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-6d0rlv0acg7xdkxt.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://www.alltech-login-api.com',
    issuer: 'https://dev-6d0rlv0acg7xdkxt.us.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/login', guard.check(["read:data"]), function (req, res) { //Ruta del backend para LogIn...
    res.json("Json with the user data that can be accessed");
});

app.listen(port);