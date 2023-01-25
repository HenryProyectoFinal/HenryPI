const User = require("../models/user.js");

const getUserData = async (email, email_verified, family_name, given_name, nickname, picture) => {
  if(!email_verified) throw new Error("The provided email is not verified");
  const userExists = await User.findOne({userName: nickname})
  .populate("location")
  .populate("shoppingCart")
  .populate("favorites");
  const userData = userExists !== null ? userExists : await new User({
    firstName: given_name,
    lastName: family_name,
    userName: nickname,
    email: email
  }).save()
  return userData;
};

module.exports = {
  getUserData
};