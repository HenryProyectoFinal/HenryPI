const Review = require("../models/review.js");

const getAllReviews = async () => {
  const reviews = await Review.find();
  return reviews;
};

const createReview = async (description, review) => {
  const newReview = new Review({
    description,
    review
  });
  newReview.save();
  return newReview;
};

const getReview = async id => {
  const reviewDB = Review.findById(id);
  if(reviewDB === null) throw new Error("The review with the provided id could not be found.");
  return reviewDB;
};

const updateReview = async (id, update) => {
  await Review.findByIdAndUpdate(id, {
    description: update.description,
    review: update.review
  });
  const review = await Review.findById(id);
  if(review === null) throw new Error("The review with the provided id could not be found.");
  return review;
};

const switchReview = async (id, active) => {
  const review = await Review.findById(id);
  if(review === null) throw new Error("The review with the provided id could not be found.");
  await Review.findByIdAndUpdate(id, {active: active});
};

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  switchReview
};