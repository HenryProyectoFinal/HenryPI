const { Schema, model, models } = require("mongoose");

const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 25,
    maxlength: 500
  },
  review: {
    type: Number,
    min: 1,
    max: 5
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
}, {
  timestamps: true
});

module.exports = models["Review"] || model("Review", reviewSchema);