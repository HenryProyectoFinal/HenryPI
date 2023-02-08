const { Schema, model } = require("mongoose");

const saleSchema = new Schema({
  // date: { //¿Es necesario si usamos timeStamps? 
  //   type: Date,
  //   required: true
  // },
  status: {
    type: String,
    enum: ["ordered", "shipped", "claim", "closed"],
    //ordered: el usuario hizo el pedido...
    //paid: el usuario pagó la compra...
    //shipped: se envió el pedido al usuario...
    //delivered: el usuario recibió el pedido...
    //claim: el usuario abrió un reclamo y éste no se ha resuelto...
    //canceled: una vez resuelto el reclamo del usuario, la venta no se concretó...
    //closed: la venta se concretó, debido a que 1) no hubo reclamo antes del tiempo establecido, o 2) el reclamo se resolvió y el usuario se mostró conforme...
    default: "ordered"
  },
  claim: {
    type: Schema.ObjectId,
    ref: "claim",
    required: function() {
      return this.status === "claim";
    }
  },
  products: {
    type: [
      {
        _id: false,
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // location: {
  //   type: Schema.ObjectId,
  //   ref: "location",
  //   required: true
  // },
  // paymentMethod: { //Depende de los métodos que ofrezca MercadoPago...
  //   type: String,
  //   enum: ["debitCard", "creditCard", "cash", "balance"],
  //   //Quizás requiera detalles específicos según el método...
  //   //cash: en puntos de pago (ejemplo: rapiPago)...
  //   //balance: saldo disponible en la cuenta de MercadoPago...
  //   required: true
  // },
  subtotal: { //Suma de los precios de los productos...
    type: Number,
    required: true
  },
  shippingCost: { //tal vez debería ser un arreglo dependiendo del número de productos y su procedencia (sucursal), en tal caso se requeriría un modelo "shipment" para cada envío...
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {timestamps: true});

module.exports = model("Sale", saleSchema);