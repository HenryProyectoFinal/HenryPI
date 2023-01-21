const { Schema, model } = require("mongoose");
// import uniqueValidator from 'mongoose-unique-validator';

const reviewSchema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 4
  },
  review: {
    type: Number,
    min: 1,
    max: 5,
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
}, {
  timestamps: true
})

// schema.plugin(uniqueValidator)

module.exports = model('Review', reviewSchema);