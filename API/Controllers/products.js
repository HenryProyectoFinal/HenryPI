const { Types } = require("mongoose");
require("../connection.js");
const Product = require("../models/product.js");

const getAllProducts = async () => {
  const products = await Product.find({})
  .populate('category', {
    name: 1,
    _id: 0,
    _id: 0
  }).populate('brand', {
    name: 1,
    _id: 0,
    _id: 0
  });
  return products;
};

const createProduct = async (name, description, price, images, category, brand) => {
  const newProduct = new Product({
    name,
    description,
    price,
    images,
    category: Types.ObjectId(category), //Puede ser un arreglo de categorías...
    brand: Types.ObjectId(brand),
    //En el estado global se cargan al iniciar categorías y marcas(objetos), el Json que se recibe por body contiene los IDs...
  });
  const savedProduct = await newProduct.save();
  return savedProduct;
};

const getProduct = async id => {
  const product = await Product.findById(id)
  .populate("category")
  .populate("brand")
  .populate("reviews")
  .populate("questions");
  if(product === null) throw new Error("The product with the provided id could not be found.");
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
  });
  const product = await Product.findById(id) //Devuelve el producto actualizado...
  .populate("category")
  .populate("brand")
  .populate("reviews")
  .populate("questions");
  if(product === null) throw new Error("The product with the provided id could not be found.");
  return product;
};

// const deleteProduct = async id => { //Borrado lógico con petición delete
//   const productDB = await Product.findById(id);
//   if(productDB === null) throw new Error("The product with the provided id could not be found.");
//   await Product.findByIdAndUpdate(id, {active: false});
// };

// const recoverProduct = async id => { //Borrado lógico con petición patch (también lo revierte)
//   const product = await Product.findById(id);
//   if(product === null) throw new Error("The product with the provided id could not be found.");
//   await Product.findByIdAndUpdate(id, {active: true});
// };

const switchProduct = async (id, active) => { //Borrado lógico con petición patch (también lo revierte)
  const product = await Product.findById(id);
  if(product === null) throw new Error("The product with the provided id could not be found.");
  await Product.findByIdAndUpdate(id, {active: active});
};


// const deleteProduct = async id => { //Borrado físico
//   const productDB = await Product.findById(id);
//   if(productDB === null) throw new Error("The product with the provided id could not be found.");
//   await Product.findByIdAndDelete(id);
// };

//funcion en la busco producto por name
const getNameProduct = async (name) => {
  try {
    const productName = await Product.find({"name": {$regex: name}})
    .populate("category", {
      name: 1,
      _id: 0
    })
    .populate('brand', {
      name: 1,
      _id: 0
    })
    /* .populate('questions') */
    .populate('reviews')
    return productName
  } catch (error) {
      res.status(400).json(error.message)
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  // deleteProduct,
  // recoverProduct,
  switchProduct,
  // deleteProduct,
  getNameProduct,
  // deleteProduct,
  getNameProduct
};