const Shop = require("../model/shopModel");
const jwt = require("jsonwebtoken");

module.exports.isSellerAuthenticated = async (req, res, next) => {
  const { ecommerceToken } = req.cookies;

  if (!ecommerceToken) return res.status(401).send("Please login to continue");

  try {
    const verifyUser = await jwt.verify(
      ecommerceToken,
      process.env.JWT_SECRET_KEY
    );

    if (!verifyUser) return res.status(401).send("Please login to continue");

    req.seller = await Shop.findById(verifyUser.id);

    next();
  } catch (error) {
    res.status(401).send("Please login to continue");
  }
};
