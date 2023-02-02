const { body } = require('express-validator');
const user = require("../models/user.js");


const validateNewProduct = 
    [
        body('name')
            .isLength({min: 5})
            .withMessage("Cannot be less than 5 characters"),
        body('description')
            .isLength({min: 5})
            .withMessage('Cannot be less than 5 characters'),
        body('price')
            .notEmpty().withMessage("Must enter a price value" )
            .isNumeric().withMessage("Has to be a number"),
        body('images')
            .notEmpty().withMessage("Cannot be empty"),
        body('category'),
        body('brand'),
    ];



module.exports = { validateNewProduct };
