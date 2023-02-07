const Question = require("../models/question.js");

const getAllQuestions = async () => {
  const questions = await Question.find()
  .populate("user");
  return questions;
};

const createQuestion = async (user, question) => {
  const newQuestion = new Question({
    user, //id del usuario
    question,
  });
  newQuestion.save();
  return newQuestion;
};

const getQuestion = async id => {
  const questionDB = Question.findById(id)
  .populate("user");
  if(questionDB === null) throw new Error("The question with the provided id could not be found.");
  return questionDB;
};

const updateQuestion = async (id, update) => {
  const question = await Question.findByIdAndUpdate(id, { $set: update }, { new: true })
  .populate("user");
  if(question === null) throw new Error("The question with the provided id could not be found.");
  return question;
};

const switchQuestion = async (id, active) => {
  const question = await Question.findById(id);
  if(question === null) throw new Error("The question with the provided id could not be found.");
  await Question.findByIdAndUpdate(id, {active: active});
};

module.exports = {
  getAllQuestions,
  createQuestion,
  getQuestion,
  updateQuestion,
  switchQuestion
};