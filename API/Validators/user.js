const { body } = require('express-validator');
const user = require("../models/user.js");



const validateNewUser = 
    [
        body('userName')
            .custom(async value => {
                return await user.find({
                    userName: value
                }).then( user => {
                    if( user.length > 0 ){
                       throw ('username already in use') 
                    }
                })
            })
            .isLength({min: 5})
            .withMessage('must be at least 5 chars long'),

        body('password')
            .isLength({min: 8})
            .withMessage('must be at least 8 chars long'),        
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('add a valid email')
            .custom(async value => {
                return await user.find({
                    userName: value
                }).then( user => {
                    if( user.length > 0 ){
                       throw ('email already in use') 
                    }
                })
            })
    ];



module.exports = { validateNewUser };
