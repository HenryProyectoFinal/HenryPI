const { Types } = require("mongoose");
const Product = require("../models/product.js");
require("../connection.js");
const Sale = require("../models/sale.js");
const User = require("../models/user.js");

// const lista=document.getElementById("lista");
// const elemetoHtml=document.createElement("li");
// elemetoHtml.textContent=createSale();
// lista.appendChild(elemetoHtml)

const getAllSales = async ()=>{
    const sales = await Sale.find({}).populate('products.product user').populate({
        path: "user",
        populate: {
          path: "location"
        }
      })
    return sales
};

const createSale = async (userEmail, products, totalCompra) => {
    try {
        const userByEmail = await User.findOne({"email": {$regex: userEmail}});
        const arrayProducts = [];
        const productsIds = await Product.find({"name": products.map((e)=>{
            return e.name;
        })}).populate("stock")
        for(let i=0; i<productsIds.length; i++){
            arrayProducts.push({
                product: productsIds[i],
                quantity: products[i].count
            });
            productsIds[i].stock = productsIds[i].stock - products[i].count;
            if(productsIds[i].stock < 0){
                throw new Error (`No se dispone de stock para el producto `+productsIds[i].name)
            }
            const stockManagement = await productsIds[i].save()
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
    } catch (error) {
        console.log(error);
    }
};

const getSaleByUser = async (id) => {
    try {
        const userById = await User.findOne({_id: id});
        const saleByUser = await Sale.find({user: userById})
            return saleByUser;
    } catch (error) {
        res.status(400).json(error.message)
    }
}


const getSaleById = async (id) => {
    const saleId = await Sale.findById(id).populate('products.product user')
    return saleId;
};

const updateSale = async (id, update) => {
    const sale = await Sale.findByIdAndUpdate(id, { $set: update }, { new: true })
    .populate('products.product user');

    return sale
    /* try {
        await Sale.findByIdAndUpdate({_id: id},
            {
                status: update.status,
                products: update.products,
                user: Types.ObjectId(update.user),
                location: Types.ObjectId(update.location),
                paymentMethod: update.paymentMethod,
                trackingCode: update.trackingCode,
                subtotal: update.subtotal,
                shippingCost: update.shippingCost,
                taxes: update.taxes,
                total: update.total,
            })
            const newSale = await Sale.findById({_id: id}); //Devuelve el categoryo actualizado...
            if(newSale === null) throw new Error("The category with the provided id could not be found.");
            const updatedSale = {
                status: newSale.status,
                products: newSale.products.toString(),
                user: newSale.father.toString(),
                location: newSale.location.toString(),
                paymentMethod: newSale.paymentMethod,
                trackingCode: newSale.trackingCode,
                subtotal: newSale.subtotal,
                shippingCost: newSale.shippingCost,
                taxes: newSale.taxes,
                total: newSale.total
            };
        return updatedSale;     
    } catch (error) {
        res.status(400).json(error.message)
    } */
};

const deleteSale = async (id) => {
    const sale = await Sale.findByIdAndUpdate(id, { $set: {'active': false} }, { new: true });
    if(sale === null) throw new Error("The sale with the provided id could not be found.");
};

module.exports = { getAllSales, createSale, getSaleByUser, getSaleById, updateSale, deleteSale }
