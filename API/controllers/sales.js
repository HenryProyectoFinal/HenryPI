const { Types } = require("mongoose");
require("../connection.js");
const Sale = require("../Models/sales.js");

const getAllSales = async ()=>{

    const salesDB = await Sale.find();
    const sales = salesDB.map(saleDB => {
        return {
            status: saleDB.status,
            claim: saleDB.claim.toString(),
            products: saleDB.products.toString(),
            user: saleDB.user.toString(),
            location: saleDB.location.toString(),
            paymentMethod: saleDB.paymentMethod,
            trackingCode: saleDB.trackingCode,
            subtotal: saleDB.subtotal,
            shippingCost: saleDB.shippingCost,
            taxes: saleDB.taxes,
            total: saleDB.total,
            active: saleDB.active,
            createdAt: saleDB.createdAt,
            updatedAt: saleDB.updatedAt
        };
    });

    return sales;

};

const createSale = async (status, claim, products, user, location, paymentMethod, trackingCode, subtotal, shippingCost, taxes, total) => {
    const newSale = new Sale({
        status,
        claim,
        products,
        user,
        location,
        paymentMethod,
        trackingCode,
        subtotal,
        shippingCost,
        taxes,
        total
    });
    const savedSale = await newSale.save();
    return savedSale;
  };

const getSaleById = async id => {
    const saleDB = await Sale.findById(id);
    if(saleDB === null) throw new Error("The sale with the provided id could not be found.");
    const sale = {
        status: saleDB.status,
        claim: saleDB.claim.toString(),
        products: saleDB.products.toString(),
        user: saleDB.user.toString(),
        location: saleDB.location.toString(),
        paymentMethod: saleDB.paymentMethod,
        trackingCode: saleDB.trackingCode,
        subtotal: saleDB.subtotal,
        shippingCost: saleDB.shippingCost,
        taxes: saleDB.taxes,
        total: saleDB.total,
        active: saleDB.active,
        createdAt: saleDB.createdAt,
        updatedAt: saleDB.updatedAt
    };
    return sale;
};

const updateSale = async (id, update) => {
    await Sale.findByIdAndUpdate(id, { //Devuelve la venta sin actualizar...
        status: update.status,
        claim: Types.ObjectId(update.claim),
        products: Types.ObjectId(update.products),
        user: Types.ObjectId(update.user),
        location: Types.ObjectId(update.location),
        paymentMethod: update.paymentMethod,
        trackingCode: update.trackingCode,
        subtotal: update.subtotal,
        shippingCost: update.shippingCost,
        taxes: update.taxes,
        total: update.total

    });
    const saleDB = await Sale.findById(id); //Devuelve el saleo actualizado...
    if(saleDB === null) throw new Error("The sale with the provided id could not be found.");
    const updatedSale = {
        status: saleDB.status,
        claim: saleDB.claim.toString(),
        products: saleDB.products.toString(),
        user: saleDB.user.toString(),
        location: saleDB.location.toString(),
        paymentMethod: saleDB.paymentMethod,
        trackingCode: saleDB.trackingCode,
        subtotal: saleDB.subtotal,
        shippingCost: saleDB.shippingCost,
        taxes: saleDB.taxes,
        total: saleDB.total,
        active: saleDB.active,
        createdAt: saleDB.createdAt,
        updatedAt: saleDB.updatedAt
    };
    return updatedSale;
};

const deleteSale = async id => {
    const saleDB = await Sale.findByIdAndUpdate(id, { $set: {'active': false} }, { new: true             });
    if(saleDB === null) throw new Error("The sale with the provided id could not be found.");
};

module.exports = { getAllSales, createSale, getSaleById, updateSale, deleteSale     }