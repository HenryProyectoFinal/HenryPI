const {Schema, model, models}= require('mongoose')

const locationSchema = new Schema({
    address: {
      type: String,
      required: true,
      minLength: 5
    },
    province: {
        type: String, //Puede estar o no limitado (enum)...
        required: true
    },
    city: {
        type: String,
        required: true,
        minLength: 3
    },
    zip: {
        type: String,
        required: true,
        minLength: 4
    },
    active: {
        type: Boolean,
        default: true
      }
})

module.exports = models["Location"] || model("Location", locationSchema);