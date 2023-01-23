const {model, Schema, models} = require('mongoose');

const User = require("./user.js");

const questionSchema = new Schema( 
  {
      user:{
          type: Schema.Types.ObjectId,
          ref: "User"
      },
      description: {
          type: String
      },
      answer: {
          type:String
      }
      
  }, {timestamps: true});

  module.exports = models["Question"] || model("Question", questionSchema);