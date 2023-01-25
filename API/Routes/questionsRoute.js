const { Router } = require("express");
const cors = require("cors");
const { 
  getAllQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  switchQuestion} = require("../Controllers/questions.js");

questionsRouter = Router();

questionsRouter.get("/questions", cors(), async (req, res) => {
  try {
    const allQuestions = await getAllQuestions();
    res.json(allQuestions);
  } catch (error) {
    console.log(error);
  };
});

questionsRouter.post("/questions", cors(), async (req, res) => {
  try {
    const { user, question } = req.body; //"user" es el id del usuario
    const newQuestion = await createQuestion(user, question);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.log(error);
  };
});

questionsRouter.get("/question/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const question = await getQuestion(id);
    res.json(question);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

questionsRouter.put("/question/:id", cors(), async(req, res) => {
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

questionsRouter.patch("/question/:id", cors(), async(req, res) => {
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