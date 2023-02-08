const { Types } = require("mongoose");
const Product = require("../models/product.js");
require("../connection.js");
const Sale = require("../models/sale.js");
const User = require("../models/user.js");
const {mandarEmail} =require('../mailer/nodemailerSale')


const createSale = async (user, products, totalCompra) => {
    try {
        console.log('hola', user);
        // mandarEmail(user)
        const userByEmail = await User.findOne({"email": {$regex: user}});
        const arrayProducts = [];
        const productsIds = await Product.find({"name": products.map((e)=>{
            return e.name;
        })})
        for(let i=0; i<productsIds.length; i++){
            arrayProducts.push({
                product: productsIds[i],
                quantity: products[i].count
            });
        };
        let shippingCost = 70;
        const taxes = Math.round(totalCompra*0.21);
        if(taxes+totalCompra>= 1000){
            shippingCost=0;
        };
        const total = totalCompra+taxes+shippingCost;
        const sale = new Sale({
            user: userByEmail,
            products: arrayProducts,
            subtotal: totalCompra,
            taxes: taxes,
            shippingCost: shippingCost,
            total
        });
        const newSale = await sale.save()
        res.status(201).json({ newSale });
        return newSale
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createSale}