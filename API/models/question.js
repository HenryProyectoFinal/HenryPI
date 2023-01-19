const {model, Schema} = require('mongoose');

const questionSchema = new Schema( 
  {
      user:{
          type: Schema.ObjectId,
          ref: "user"
      },
      description: {
          type: String
      },
      answer: {
          type:String
      }
      
  }, {timestamps: true});

module.exports = model("Question", questionSchema);