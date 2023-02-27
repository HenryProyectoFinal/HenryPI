const { Types } = require("mongoose");
const User = require("../models/user.js");
const nodemailer= require('nodemailer')

require("dotenv").config()
const {
    USER, PASS
  } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    //secure: true, // true for 465, false for other ports
    auth: {
      user: `${USER}`, // generated ethereal user
      pass: `${PASS}`, // generated ethereal password
    },
  });

  transporter.verify().then(() => {
    console.log('ready for send emails');
  })



const mandarEmail= async (email) => {
    
    let mensaHTM= `
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    p, a, h1, h2, h3, h4, h5 {font-family: 'Roboto', sans-serif !important;}
    h1{font-size: 60px !important;}
    h2{font-size: 45px !important;}
    h3{font-size: 35px !important;}
    h4{font-size: 25px !important;}
    h5{font-size: 15px !important;}
    p, a{font-size: 15px !important;}
  </style>
</head>
<div style="width: 100%; background-color: #e3e3e3;">
  <div style="padding: 20px 10px 20px 10px;">
    <div style="background-color: rgb(153, 152, 152); padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
    <img src="cid:logo2" alt="" style="width: 300px; height: 70px;">
    </div>
  </div>
  <div style="background-color: #e3e3e3; margin-top: 0px; padding: 20px 0px 5px 0px; text-align: center;">
    <h2>Bienvenido a AllTech</h2>
    <p>Somos un ecommerce dedicado a la tecnogia. En donde te brindamos una gran variedad de productos.</p>
    <p>GRACIAS POR SER PARTE DE NUESTRA COMUNIDAD</p>
    <div style="display: flex; padding: 20px 10px 20px 10px; ">
      <div style=" padding: 10px 0px 10px 0px; width: 100%; text-align: center;">
        <img src="https://res.cloudinary.com/dy5msftwe/image/upload/v1675628467/Products/AllTech_ft12pq.png" alt="" style="width: 300px;" />
        <p > Cualquie consulta <br>comunicate con nosotros <br>desde nuestra pagina <br> o por whatsapp. <br> TE ESPERAMOS </p>
      </div>
    </div>
    <P style="margin-bottom: 10px;"><i>Atentamente:</i><br> Equipo AllTech</P>
    <a style="background-color: gray; border: 2px solid gray; color: black; padding: 16px 32px; text-align: center; text-decoration: none; font-weight: bold; display: inline-block; font-size: 16px; margin: 4px 2px;
    transition-duration: 0.4s; cursor: pointer;" href="https://client-ochre-five.vercel.app">AllTech</a>
    <div style="background-color: rgb(36, 36, 36); color: #e3e3e3; padding: 5px 0px 0px 0px; width: 100%; text-align: center;">
      <a href="" ><img src="cid:whatsapp" style="width: 30px; height: 30px;"/></a>
      <p style="font-size: 20px; padding: 0px 20px 0px 20px;">Soporte</p>
      <p>Comunicate con nosotros por los siguientes medios:<br>  
      Correo: <a style="color: #e3e3e3;">AllTech@info.com</a><br>
      WhatsApp: <a style="color: #e3e3e3;">1111 525 465 552</a>
      </p>
      <p style="background-color: black; padding: 10px 0px 10px 0px ; font-size: 12 !important;">
      @ 2023 AllTech, todos los derechos reservados.</p>
    </div>
  </div>
<div></div>
</div>
<body>
  
</body>
</html>
    `;
        let mensaje = {
            from: '"AllTech" <lourdesrosaa1@gmail.com>', // sender address
            to: email, // list of receivers
            subject: " Notificación", // Subject line
            text: "USUARIO CREADO CORRECTAMENTE ", // plain text body
            html: mensaHTM,
            attachments: [
                {
                    filename:'logo2.jpeg',
                    path:'https://res.cloudinary.com/dy5msftwe/image/upload/v1675608232/Products/Logo1_spld6d.png',
                    cid:'logo2'
                },
                {
                    filename:'whatsapp.jpg',
                    path:'https://i.pinimg.com/originals/6f/49/a3/6f49a3e22941e9ce362b22be78d96b95.jpg',
                    cid:'whatsapp'
                }
            ]
        };

        const info= await transporter.sendMail(mensaje)

        console.log(info);

}
  module.exports = {mandarEmail}