const { Types } = require("mongoose");
const Brand = require("../models/brand.js");

const getAllBrands = async () => {
  const brands = await Brand.find({});

  return brands;
};

const createBrand = async (req, res, next) => {
  const newBrand = new Brand(req);
  newBrand.save()

  return newBrand;
};

const getBrand = async id => {
  const brand = await Brand.findById(id);
  if(brand === null) throw new Error("The brand with the provided id could not be found.");
  
  return brand;
};

const updateBrand = async (id, update) => {
  const brand = Brand.findByIdAndUpdate(id, { $set: update }, { new: true })

  return brand;
};

const deleteBrand = async id => {
  const brand = Brand.findByIdAndUpdate(id, { $set: {"active": false} }, { new: true })

  return brand;
};

module.exports = {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand
};