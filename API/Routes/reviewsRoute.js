const { Router } = require("express");
const {
  checkRequiredPermissions,
  validateAccessToken} = require("../Auth0/auth0.middleware.js");
const {

} = require("../Auth0/auth0.permissions.js");
const { 
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  switchReview
} = require("../Controllers/reviews.js");
const {
  updateReviewProduct,
} = require("../Controllers/products.js");

reviewsRouter = Router();

reviewsRouter.get(
  "/reviews",
  // validateAccessToken,
  // checkRequiredPermissions([]),
  async (req, res) => {
  try {
    const allReviews = await getAllReviews();
    res.json(allReviews);
  } catch (error) {
    console.log(error);
  };
});

reviewsRouter.post(
  "/reviews",
  // validateAccessToken,
  // checkRequiredPermissions([]),
  async (req, res) => {
  try {
    const { description, productoID, rating, } = req.body;
    const newReview = await createReview(description, rating);
    const updatedProduct = await updateReviewProduct(productoID, newReview._id);
    res.status(201).json(updatedProduct);
  } catch (error) {
    console.log(error);
  };
});

reviewsRouter.get(
  "/review/:id",
  // validateAccessToken,
  // checkRequiredPermissions([]),
  async (req, res) => {
  try {
    const { id } = req.params;
    const review = await getReview(id);
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(404).send(error.message);
  };
});

reviewsRouter.put(
  "/review/:id",
  // validateAccessToken,
  // checkRequiredPermissions([]),
  async(req, res) => {
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

reviewsRouter.patch(
  "/review/:id",
  // validateAccessToken,
  // checkRequiredPermissions([]),
  async(req, res) => {
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