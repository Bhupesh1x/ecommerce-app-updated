const express = require("express");
const Shop = require("../model/shopModel");
const Product = require("../model/productModel");

const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const routes = express.Router();

routes.post("/create-product", isSellerAuthenticated, async (req, res) => {
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

routes.get(
  "/get-products-by-shop-id/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const products = await Product.find({ shopId: req.params.id });
      res.status(200).json(products);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

routes.delete(
  "/delete-shop-product/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const product = await Product.findOneAndDelete({
        _id: req.params.id,
        shopId: req.seller._id,
      });
      if (!product) {
        res
          .status(404)
          .send(
            "Product not found with the specific id Or you don't have permission to delete this product!"
          );
      }
      res.status(200).send("Product deleted sucessfully!");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

module.exports = routes;
