// const dotenv = require("dotenv");
// dotenv.config();
// const { AUTH0_DOMAIN, AUTH0_AUDIENCE } = process.env;
// const {
//   auth,
//   claimCheck,
//   InsufficientScopeError} = require("express-oauth2-jwt-bearer");

// const validateAccessToken = auth({
//   issuerBaseURL: `https://${AUTH0_DOMAIN}`,
//   audience: AUTH0_AUDIENCE
// });

// const checkRequiredPermissions = (requiredPermissions) => {
//   return (req, res, next) => {
//     const permissionCheck = claimCheck(payload => {
//       const permissions = payload.permissions || [];
//       const hasPermissions = requiredPermissions.every(requiredPermission =>
//         permissions.includes(requiredPermission)
//       );
//       if (!hasPermissions) {
//         throw new InsufficientScopeError();
//       }
//       return hasPermissions;
//     });
//     permissionCheck(req, res, next);
//   };
// };

// module.exports = {
//   validateAccessToken,
//   checkRequiredPermissions,
// };