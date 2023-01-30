const { Schema, model, models }= require('mongoose');

const Location = require("./location.js");
const Product = require("./product.js");

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
        //default: true
    },
    password: {
        type: String,
        minlength: 8,
        required: true,
    },
    phoneNumber: {
        type: String,
        // required: true,
        unique: true,
        minlength: 8
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: "Location",
        // required: true
        },
    shoppingCart: {
        type: [ //Al ser un arreglo, [] es el valor por defecto, por eso no es necesario poner "default"
            {
                _id: false, //Evita que se cree un id innecesario para cada objeto (ya se tiene el id del producto)...
                // unique: true, //No está soportado para arreglos, rompe si se deja...
                product: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
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
        type: [Schema.Types.ObjectId],
        ref: "Product"
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    active: {
      type: Boolean,
      //required: true,
      default: true
    },
}, {
  timestamps: true
})


module.exports = models["User"] || model("User", userSchema);