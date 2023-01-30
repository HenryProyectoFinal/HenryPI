const { Types } = require("mongoose");
require("../connection.js");
const Sale = require("../Models/sale.js");

const getAllSales = async ()=>{
    try {
        const sales = await Sale.find()
            return sales
    } catch (error) {
        res.status(400).json(error.message)
    }
};

const createSale = async (req, res) => {
    try {

        const { products, user, location, paymentMethod, trackingCode, subtotal, shippingCost, taxes, total } = req.body;
        const sale = new Sale({
            products,
            user,
            location,
            paymentMethod,
            trackingCode,
            subtotal,
            shippingCost,
            taxes,
            total,
        });

        const newSale = await sale.save()
        res.status(201).json({ msg: "Sale saved", newSale });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const getSaleById = async (id) => {
    try {
        const saleId = await Sale.findOne({_id: id}).exec()
            return saleId;
    } catch (error) {
        res.status(400).json(error.message)
    }

};

const updateSale = async (id, update) => {
    try {
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
    }
};

const deleteSale = async (id) => {
    const sale = await Sale.findByIdAndUpdate(id, { $set: {'active': false} }, { new: true             });
    if(sale === null) throw new Error("The sale with the provided id could not be found.");
};

module.exports = { getAllSales, createSale, getSaleById, updateSale, deleteSale }