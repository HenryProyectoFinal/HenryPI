const { Schema, model } = require("mongoose");
// import uniqueValidator from 'mongoose-unique-validator';

const schemaBrand = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

// schema.plugin(uniqueValidator)

module.exports = model('Brand', schemaBrand);