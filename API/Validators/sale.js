const { body } = require('express-validator');
const User = require("../models/user.js");

const validateNewSale = 
    [
        body("status")
            .isIn([undefined, "paid", "ordered"])
            .withMessage("Invalid status"),
        body('products')
            .exists()
            .withMessage("Shopping cart is missing"),
        body('products.*.product')
            .exists()
            .withMessage("You have no products selected"),
        body('products.*.quantity')
            .isInt({min:1})
            .withMessage("Quantity has to be a integer bigger than 0"), 
        body('user')
            .custom( value => {
                User.findOne({id: value}).then( user => {
                    if( !user ){
                        throw ('user not logged in') 
                    }
                })
            }),
        body('location')
            .notEmpty()
            .withMessage('We need a address to send the products'),
        body('paymentMethod')
            .isIn(["debitCard","creditCard","cash","balance"])
            .withMessage('Invalid payment method')
        ,
        body('subtotal')
            .isFloat({min:0})
            .withMessage('Subtotal not calculated'),
        body('shippingCost')
            .isFloat({min:0})
            .withMessage('Cost of shipping not calculated'),
        body('taxes')
            .isFloat({min:0})
            .withMessage('Taxes not calculated'),
        body('total')
            .isFloat({min:0})
            .withMessage('Total not calculated'),

    ];



module.exports = { validateNewSale };
