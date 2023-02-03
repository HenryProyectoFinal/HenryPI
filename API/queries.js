const { Schema, Types } = require("mongoose");
require("./connection.js");

// const branchOffice = require("./models/branchOffice.js");
// const location = require("./models/location.js");
// const user = require("./models/user.js");
// const cartProduct = require("./models/cartProduct.js");
 const category = require("./models/category.js");
 const brand = require("./models/brand.js");
// const product = require("./models/product.js");
// const claim = require("./models/claim.js");
// const question = require("./models/question.js");
// const review = require("./models/review.js");
const sale = require("./models/sale.js");

// const createBranchOffice = async () => {
//   const newBranchOffice = new branchOffice({
//     name: "Montevideo",
//     stock: [
//       {
//         product: Types.ObjectId("63c8d1d243ee0cde6dc55206"),
//         stock: 17
//       }
//     ]
//   });
//   const savedBranchOffice = await newBranchOffice.save();
//   console.log(savedBranchOffice);
// };

// const createLocation = async () => {
//   const newLocation = new location({
//     address: "XXXX",
//     province: "XXXXX XXXXXX",
//     city: "XXXXXXX XXXXXX",
//     zip: 1234
//   });
//   const savedLocation = await newLocation.save();
//   console.log(savedLocation);
// };

// const createUser = async () => {
//   const newUser = new user({
//     firstName: "Juan",
//     lastName: "Leiton",
//     userName: "juan-leiton",
//     email: "jgleitonl@gmail.com",
//     password: "anypassword",
//     phoneNumber: "3114976851",
//     location: Types.ObjectId("63c8573bdeb8b4f0f4e9bbd3"),
//     shoppingCart: [
//       {
//         product: Types.ObjectId("63c8714dcb5606ae4f626904"),
//         quantity: 2
//       }
//     ],
//     favorites: [
//       {
//         product: Types.ObjectId("63c8714dcb5606ae4f626904")
//       },
//       {
//         product: Types.ObjectId("63c8714dcb5606ae4f626904")
//       }
//     ]
//   });
//   const savedUser = await newUser.save();
//   console.log(savedUser);
// };

const createCategory = async () => {
  const newCategory = new category({
    name: "Motherboards",
    description: "The motherboard, also known as a motherboard, motherboard, or main board, is a printed circuit card to which the components that make up the computer are connected. It is a fundamental part to mount any desktop or laptop personal computer or some device.",
  });
  const savedCategory = await newCategory.save();
  console.log(savedCategory);
};

const createBrand = async () => {
  const newBrand = new brand({
    name: "DeepCool"
  });
  const savedBrand = await newBrand.save();
  console.log(savedBrand);
};

// const createProduct = async () => {
//   const newProduct = new product({
//     name: "XXXXXXXXXXXXXXXXXXXX",
//     description: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//     price: 5000,
//     images: ["AAAAAA", "BBBBBB", "CCCCCC"],
//     category: Types.ObjectId("63c868a2693c70a8ccf6a6bb"),
//     brand: Types.ObjectId("63c86ea3e6fbd678399e56cc"),
//     questions: [Types.ObjectId("63c8d069edab5cb1f3d813b2")]
//   });
//   const savedProduct = await newProduct.save();
//   console.log(savedProduct);
// };

// const createClaim = async () => {
//   const newClaim = new claim({
//     title: "missing",
//     description: "XXXXXXXX XXXXXXX XXXXXXXXX XXXXXXX",
//     user: Types.ObjectId("63c8c3f1b0eece1227e0044f"),
//     status: "pending"
//   });
//   const savedClaim = await newClaim.save();
//   console.log(savedClaim);
// };

// const createQuestion = async () => {
//   const newQuestion = new question({
//     user: Types.ObjectId("63c8c3f1b0eece1227e0044f"),
//     description: "XXXXX XXXXXX XXXXX XXXXX",
//     answer: "XXXXXX XXXXXX XXXXXX"
//   });
//   const savedQuestion = await newQuestion.save();
//   console.log(savedQuestion);
// };

// const createReview = async () => {
//   const newReview = new review({
//     description: "XXXXXXXX XXXXXXXX XXXXXX",
//     review: 3.5
//   });
//   const savedReview = await newReview.save();
//   console.log(savedReview);
// };

const createSale = async () => {
  const newSale = new sale({
    date: new Date("August 19, 1975 23:15:30"),
    status: "ordered",
    claim: Types.ObjectId("63c8cbe75c514ce2e51d0530"),
    products: [
      {
        product: Types.ObjectId("63c8d1d243ee0cde6dc55206"),
        quantity: 17
      }
    ],
    user: Types.ObjectId("63c8c3f1b0eece1227e0044f"),
    location: Types.ObjectId("63c8573bdeb8b4f0f4e9bbd3"),
    paymentMethod: "balance",
    trackingCode: "sfasdf938433faeafesfa",
    subtotal: 499.90,
    shippingCost: 53.75,
    taxes: 11.50,
    total: 565.15
  });
  const savedSale = await newSale.save();
  console.log(savedSale);
};

createCategory();