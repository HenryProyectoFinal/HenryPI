const { Router } = require("express");
const {
  checkRequiredPermissions,
  validateAccessToken} = require("../Auth0/auth0.middleware.js");
const {
  userPermissions,
  adminPermissions
} = require("../Auth0/auth0.permissions.js");
const { 
  getAllQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  switchQuestion} = require("../Controllers/questions.js");
const {
  updateQuestionsProduct,
} = require("../Controllers/products.js");
const { getUserEmail }= require('../Controllers/users.js');

questionsRouter = Router();

questionsRouter.get(
  "/questions",
  async (req, res) => {
  try {
    const allQuestions = await getAllQuestions();
    res.json(allQuestions);
  } catch (error) {
    console.log(error);
  };
});

questionsRouter.post(
  "/questions",
  // validateAccessToken,
  // checkRequiredPermissions([userPermissions.question]),
  async (req, res) => {
  try {
    const { userMail, product, newQuestion } = req.body; //"user" es el id del usuario
    const user = await getUserEmail(userMail);
    if(user) {
      const question = await createQuestion(user._id, newQuestion);
      const updatedProduct = await updateQuestionsProduct(product, question._id);
      res.status(201).json({question, updatedProduct});
    } else {
        res.status(400).json("Correo no encontrado");
    };
  } catch (error) {
    console.log(error);
  };
});

questionsRouter.get(
  "/question/:id",
  // validateAccessToken,
  // checkRequiredPermissions([userPermissions.question]),
  async (req, res) => {
  try {
    const { id } = req.params;
    const question = await getQuestion(id);
    res.json(question);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

questionsRouter.put(
  "/question/:id",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.question]),
  async(req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedQuestion = await updateQuestion(id, update);
    res.json(updatedQuestion);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

questionsRouter.patch(
  "/question/:id",
  // validateAccessToken,
  // checkRequiredPermissions([adminPermissions.question]),
  async(req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    await switchQuestion(id, active);
    return res.status(204).send("Done");
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

const router = Router();
router.use("/", questionsRouter);

module.exports = router;