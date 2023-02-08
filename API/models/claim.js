const { Schema, model, models } = require('mongoose');


const claimSchema = new Schema({
  sale: {
    type: Schema.Types.ObjectId,
    ref: "Sale",
    required: true
  },
  issue: {
    type: String,
    enum: ["missing", "damaged", "wrong"],
    required: true
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 300
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  email:{
    type: String,
    required: true,
    minLength: 7,
  },
  status: {
    type: String,
    enum: ["pending", "solved"],
    default: "pending" 
  },
  solution: {
    type: String,
    enum: ["refund", "replaced", "forward"],
    required: function() { //NO funciona con arrow functions...
      return this.status === "solved";
    }
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
}, {timestamps: true});

module.exports = models["Claim"] || model("Claim", claimSchema);