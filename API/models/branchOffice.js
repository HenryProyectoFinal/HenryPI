const { model, Schema } = require("mongoose");
// import uniqueValidator from 'mongoose-unique-validator';
//import producto schema

const branchOfficeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  stock: [
    {//Se necesita el id del subdocumento para acceder al inventario disponible de cada producto...
      product: {
        type: Schema.ObjectId,
        ref: "product",
        required: true
      }, 
      stock: {
        type: Number,
        min: 0,
        default: 0
      }
    }
  ],
  active: {
    type: Boolean,
    required: true,
    default: true
  },
}, {
  timestamps: true
})

// schema.plugin(uniqueValidator)

module.exports = model('BranchOffice', branchOfficeSchema)