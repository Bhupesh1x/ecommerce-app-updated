const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  const { ecommerceToken } = req.cookies;

  if (!ecommerceToken) return res.status(401).send("Please login to continue");

  const verifyUser = await jwt.verify(
    ecommerceToken,
    process.env.JWT_SECRET_KEY
  );

  //if (!verifyUser) return res.status(401).send("Please login to continue");

  req.user = await User.findById(verifyUser.id);

  next();
};
