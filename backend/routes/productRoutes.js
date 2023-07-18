const express = require("express");
const Shop = require("../model/shopModel");
const Product = require("../model/productModel");

const { isAuthenticated } = require("../middleware/auth");

const routes = express.Router();

routes.post("/create-product", isAuthenticated, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body.shopId);
    if (!shop) {
      return res.status(400).send("Invalid shop id");
    }
    const productData = {
      ...req.body,
      shop,
    };
    const product = await Product.create(productData);
    res.status(201).json({ product });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = routes;
