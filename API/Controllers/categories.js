const Category = require("../models/category.js");

const getAllCategories = async ()=>{
    const categoriesDB = await Category.find({})
    .populate("father", {
    name: 1,
    _id: 1
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
        father: categoryDB.category?.toString(),
        active: categoryDB.active,
        createdAt: categoryDB.createdAt,
        updatedAt: categoryDB.updatedAt
    };
    return category;
};

const updateCategory = async (id, update) => {
    const category = await Category.findByIdAndUpdate(id, { $set: update }, { new: true })
    if(category === null) throw new Error("The category with the provided id could not be found.");
    
    return category;
};

const deleteCategory = async id => {
    const categoryDB = await Category.findByIdAndUpdate(id, { $set: {'active': false} }, { new: true });
    if(categoryDB === null) throw new Error("The category with the provided id could not be found.");

    return categoryDB;
};

module.exports = { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory }