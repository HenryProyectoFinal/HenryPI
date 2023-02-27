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
        body('email')
            .isEmail()
            .normalizeEmail({gmail_remove_dots: false })
            .withMessage('add a valid email')
            .custom(async value => {
                return await user.find({
                    email: value
                }).then( user => {
                    if( user.length > 0 ){
                       throw ('email already in use') 
                    }
                })
            }),
            body('phoneNumber')
            .isMobilePhone()
            .withMessage('add a valid mobile phonenumber')
            .custom(async value => {
                return await user.find({
                    phoneNumber: value
                }).then( user => {
                    if( user.length > 0 ){
                       throw ('phonenumber already in use') 
                    }
                })
            })
            .isLength({min: 8})
            .withMessage('must be at least 8 chars long')
    ];



module.exports = { validateNewUser };
