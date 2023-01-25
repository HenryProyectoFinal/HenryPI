const { Router } = require("express");
const cors = require("cors");
const { getUserData } = require("../Controllers/login.js");

loginRouter = Router();

loginRouter.get("/login", cors(), async (req, res) => {
  try {
    const { email, email_verified, family_name, given_name, nickname, picture } = req.body;
    const userData = await getUserData(email, email_verified, family_name, given_name, nickname, picture);
    res.json(userData);
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  };
});

const router = Router();
router.use("/", loginRouter);

module.exports = router;