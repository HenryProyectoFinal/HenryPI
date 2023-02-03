const nodemailer= require('nodemailer')
const { Types } = require("mongoose");
const User = require("../models/user.js");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    //secure: true, // true for 465, false for other ports
    auth: {
      user: 'lourdesrosaa1@gmail.com', // generated ethereal user
      pass: 'kccbpblgcwqfqapz', // generated ethereal password
    },
  });

  transporter.verify().then(() => {
    console.log('ready for send emails');
  })



const mandarEmail= async (u) => {
    
        let mensaje = {
            from: 'lourdesrosaa1@gmail.com', // sender address
            to: "lourdesrosaa1@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            //html: "<b>Hello world?</b>", // html body
          };

        const info= await transporter.sendMail(mensaje)

        console.log(info);

}

mandarEmail()
//   module.exports = {transporter}