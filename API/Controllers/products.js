const { Types } = require("mongoose");
require("../connection.js");
const Product = require("../models/product.js");

const getAllProducts = async () => {
  const products = await Product.find({})
  .populate('category', {
    name: 1,
    _id: 1,
  }).populate('brand', {
    name: 1,
    _id: 1,
  }).populate('reviews', {
    review: 1,
    _id: 1
  }).populate('questions', {
    question: 1,
    answer:1,
    _id: 1
  });
  return products;
};

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.save()
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getProduct = async id => {
  const product = await Product.findById(id)
  .populate("category")
  .populate("brand")
  .populate("reviews")
  .populate("questions",{
    question: 1,
    answer: 1,
    _id: 0
  });
  if(product === null) throw new Error("The product with the provided id could not be found.");
  return product;
};

const updateProduct = async (id, update) => {
  const product = await Product.findByIdAndUpdate(id, { $set: update }, { new: true }).populate("category")
  .populate("brand")
  .populate("reviews")
  .populate("questions");;
  /* await Product.findByIdAndUpdate(id, { //Devuelve el producto sin actualizar...
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
  .populate("questions"); */

  if(product === null) throw new Error("The product with the provided id could not be found.");
  return product;
};

const deleteProduct = async id => { //Borrado lógico con petición delete
  const productDB = await Product.findById(id);
  if(productDB === null) throw new Error("The product with the provided id could not be found.");
  await Product.findByIdAndUpdate(id, {active: false});
};

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
    .populate("questions",{
      question: 1,
      answer: 1,
      _id: 0
    })
    .populate('reviews')
    return productName
  } catch (error) {
      res.status(400).json(error.message)
  }
}

module.exports = {
  getAllProducts,
  // allProducts,
  createProduct,
  getProduct,
  updateProduct,
  // deleteProduct,
  // recoverProduct,
  switchProduct,
  //deleteProduct,
  getNameProduct
};
