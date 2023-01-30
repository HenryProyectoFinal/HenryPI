const { Router } = require("express");
const cors = require("cors");
const { 
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  switchReview} = require("../Controllers/reviews.js");

reviewsRouter = Router();

reviewsRouter.get("/reviews", cors(), async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    res.json(allReviews);
  } catch (error) {
    console.log(error);
  };
});

reviewsRouter.post("/reviews", cors(), async (req, res) => {
  try {
    const { description, review } = req.body;
    const newReview = await createReview(description, review);
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
  };
});

reviewsRouter.get("/review/:id", cors(), async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReview(id);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

reviewsRouter.put("/review/:id", cors(), async(req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updatedReview = await updateReview(id, update);
    res.json(updatedReview);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

reviewsRouter.patch("/review/:id", cors(), async(req, res) => {
  try {
    const { id } = req.params;
    const { active } = req.body;
    await switchReview(id, active);
    return res.status(204).send("Done");
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

const router = Router();
router.use("/", reviewsRouter);

module.exports = router;