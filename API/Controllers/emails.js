const { Types } = require("mongoose");
const Email = require("../models/email.js");
const nodemailer= require('nodemailer')
const {mandarEmail} =require('../mailer/nodemailerFooter.js')


//funcion para crear usuario
const footerEmail = async (email) => {
        const newEmail = new Email({
            email
            })
            let cupon=Math.random()
            console.log(cupon);
        mandarEmail(email)
        const newEmails= await newEmail.save()
        return newEmails
}


module.exports = {footerEmail}