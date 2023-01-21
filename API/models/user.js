const { Schema, model }= require('mongoose');

// const location = require("./location.js");
// const product = require("./product.js");
// const cartProduct = require("./cartProduct.js");

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        minlength: 2
    },
    lastName: {
        type: String,
        required: true,
        minlength: 5
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        default: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        default: true,
        minlength: 8
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        default: true,
        minlength: 8
    },
    location:{
        type: Schema.ObjectId,
        ref: "location",
        required: true
        },
    shoppingCart: {
        type: [ //Al ser un arreglo, [] es el valor por defecto, por eso no es necesario poner "default"
            {
                _id: false, //Evita que se cree un id innecesario para cada objeto (ya se tiene el id del producto)...
                // unique: true, //No está soportado para arreglos, rompe si se deja...
                product: {
                    type: Schema.ObjectId,
                    ref: "product",
                    required: true,
                    // unique: true //No aplica a objetos. Hay que validar que no se repita...
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            },
        ]
    },
    favorites: {
        type: [
            {
                _id: false,
                // unique: true,
                product: {
                    type: Schema.ObjectId,
                    ref: "product",
                    required: true,
                    // unique: true
                }
        }
    ]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
}, {
  timestamps: true
})


module.exports = model('User', userSchema);