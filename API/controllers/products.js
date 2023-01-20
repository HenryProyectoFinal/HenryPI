const { Types } = require("mongoose");
require("../connection.js");
const Product = require("../Models/product.js");

const getAllProducts = async () => {
  const productsDB = await Product.find();
  const products = productsDB.map(productDB => {
    return {
      name: productDB.name,
      description: productDB.description,
      price: productDB.price,
      images: productDB.images,
      category: productDB.category.toString(),
      brand: productDB.brand.toString(),
      reviews: productDB.reviews.map(review => {
        return review.toString();
      }),
      questions: productDB.questions.map(question => {
        return question.toString();
      }),
      active: productDB.active,
      createdAt: productDB.createdAt,
      updatedAt: productDB.updatedAt
    };
  });
  return products;
};

const createProduct = async (name, description, price, images, category, brand, reviews, questions) => {
  const newProduct = new Product({
    name,
    description,
    price,
    images,
    category: Types.ObjectId(category),
    brand: Types.ObjectId(brand),
    reviews: reviews.map(review => {
      return Types.ObjectId(review);
    }),
    questions: questions.map(question => {
      return Types.ObjectId(question);
    })
  });
  const savedProduct = await newProduct.save();
  return savedProduct;
};

const getProduct = async id => {
  const productDB = await Product.findById(id);
  if(productDB === null) throw new Error("The product with the provided id could not be found.");
  const product = {
    name: productDB.name,
    description: productDB.description,
    price: productDB.price,
    images: productDB.images,
    category: productDB.category.toString(),
    brand: productDB.brand.toString(),
    reviews: productDB.reviews.map(review => {
      return review.toString();
    }),
    questions: productDB.questions.map(question => {
      return question.toString();
    }),
    active: productDB.active,
    createdAt: productDB.createdAt,
    updatedAt: productDB.updatedAt
  };
  return product;
};

const updateProduct = async (id, update) => {
  await Product.findByIdAndUpdate(id, { //Devuelve el producto sin actualizar...
    name: update.name,
    description: update.description,
    price: update.price,
    images: update.images,
    category: Types.ObjectId(update.category),
    brand: Types.ObjectId(update.brand),
    reviews: update.reviews.map(review => {
      return Types.ObjectId(review);
    }),
    questions: update.questions.map(question => {
      return Types.ObjectId(question);
    }),
    active: update.active
  });
  const productDB = await Product.findById(id); //Devuelve el producto actualizado...
  if(productDB === null) throw new Error("The product with the provided id could not be found.");
  const updatedProduct = {
    name: productDB.name,
    description: productDB.description,
    price: productDB.price,
    images: productDB.images,
    category: productDB.category.toString(),
    brand: productDB.brand.toString(),
    reviews: productDB.reviews.map(review => {
      return review.toString();
    }),
    questions: productDB.questions.map(question => {
      return question.toString();
    }),
    active: productDB.active,
    createdAt: productDB.createdAt,
    updatedAt: productDB.updatedAt
  };
  return updatedProduct;
};

const deleteProduct = async id => {
  const productDB = await Product.findById(id);
  if(productDB === null) throw new Error("The product with the provided id could not be found.");
  await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
};