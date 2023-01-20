import * as dotenv from 'dotenv'
import jwt from "jsonwebtoken" 
import jwksClient from 'jwks-rsa'

dotenv.config()
const { AUTH0_DOMAIN, AUDIENCE } = process.env;

export const verifyToken = async (bearerToken) => {
  const client = jwksClient({
    jwksUri: `https://${AUTH0_DOMAIN}/.well-known/jwks.json`
  });

  function getJwksClientKey(header, callback) {
    client.getSigningKey(header.kid, function(error, key) {
      const signingKey = key.publicKey || key.rsaPublicKey
      callback(null, signingKey)
    })
  }

  return new Promise((resolve, reject) => {
    jwt.verify(
      bearerToken,
      getJwksClientKey,
      {
        audience: `${AUDIENCE}`,
        issuer: `https://${AUTH0_DOMAIN}/`,
        algorithms: ["RS256"],
      },
      function (err, decoded) {
        if (err) reject(err)
        resolve(decoded)
      }
    )
  })
}