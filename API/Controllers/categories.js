const { Types } = require("mongoose");
const Category = require("../models/category.js");

const getAllCategories = async ()=>{
    const categoriesDB = await Category.find({})
    .populate("father", {
    name: 1,
    _id: 0
    });

    return categoriesDB;
};

const createCategory = async (name, description, father) => {
    const newCategory = new Category({
        name,
        description,
        father: father || null
    });
    const savedCategory = await newCategory.save();
    return savedCategory;
  };

const getCategoryById = async id => {
    const categoryDB = await Category.findById(id);
    if(categoryDB === null) throw new Error("The category with the provided id could not be found.");
    const category = {
        name: categoryDB.name,
        description: categoryDB.description,
        father: categoryDB.category.toString(),
        active: categoryDB.active,
        createdAt: categoryDB.createdAt,
        updatedAt: categoryDB.updatedAt
    };
    return category;
};

const updateCategory = async (id, update) => {
    await Category.findByIdAndUpdate(id, { //Devuelve el categoryo sin actualizar...
      name: update.name,
      description: update.description,
      father: Types.ObjectId(update.father)
    });
    const categoryDB = await Category.findById(id); //Devuelve el categoryo actualizado...
    if(categoryDB === null) throw new Error("The category with the provided id could not be found.");
    const updatedCategory = {
      name: categoryDB.name,
      description: categoryDB.description,
      father: categoryDB.father.toString(),
      active: categoryDB.active,
      createdAt: categoryDB.createdAt,
      updatedAt: categoryDB.updatedAt
    };
    return updatedCategory;
};

const deleteCategory = async id => {
    const categoryDB = await Category.findByIdAndUpdate(id, { $set: {'active': false} }, { new: true });
    if(categoryDB === null) throw new Error("The category with the provided id could not be found.");

    return categoryDB;
};

module.exports = { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory }