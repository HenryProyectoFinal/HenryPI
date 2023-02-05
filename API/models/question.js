const {model, Schema, models} = require('mongoose');

const User = require("./user.js");

const questionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  question: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 250
  },
  answer: {
    type: String,
    minLength: 5,
    maxLength: 50
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }  
}, {timestamps: true});

module.exports = models["Question"] || model("Question", questionSchema);