const express = require("express");
const Order = require("../model/orderModel");
const Product = require("../model/productModel");

const { isAuthenticated } = require("../middleware/auth");
const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const router = express.Router();

router.post("/create-order", async (req, res) => {
  try {
    const { cart, shippingAddress, user, totalPrice, paymentInfo } = req.body;

    //   group cart items by shopId
    const shopItemsMap = new Map();

    for (const item of cart) {
      const shopId = item.shopId;
      if (!shopItemsMap.has(shopId)) {
        shopItemsMap.set(shopId, []);
      }
      shopItemsMap.get(shopId).push(item);
    }

    // create an order for each shop
    const orders = [];

    for (const [shopId, items] of shopItemsMap) {
      const order = await Order.create({
        cart: items,
        shippingAddress,
        user,
        totalPrice,
        paymentInfo,
      });
      orders.push(order);
    }

    res.status(201).json(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/get-all-orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ "user._id": req.params.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get(
  "/get-all-seller-orders/:shopId",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const orders = await Order.find({
        "cart.shopId": req.params.shopId,
      }).sort({
        createdAt: -1,
      });
      res.status(200).json(orders);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.get(
  "/get-order-details/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.put(
  "/update-order-status/:id",
  isSellerAuthenticated,
  async (req, res) => {
    const { status } = req.body;

    try {
      const order = await Order.findById(req.params.id);

      if (!order) return res.status(400).send("Order id is not valid!");

      if (status === "Transferred to delivery partner") {
        order?.cart?.forEach(async (element) => {
          await updateProduct(element._id, element.qty);
        });
      }

      order.status = status;

      if (status === "Delivered") {
        order.deliveredAt = Date.now();
        order.paymentInfo.status = "succeeded";
      }

      await order.save({ validateBeforeSave: false });
      res.status(200).json(order);

      async function updateProduct(id, qty) {
        const product = await Product.findById(id);

        product.stock -= qty;
        product.sold_out += qty;

        await product.save({ validateBeforeSave: false });
      }
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.put("/return-order/:id", async (req, res) => {
  const { status } = req.body;

  try {
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(400).send("Order id is not valid!");

    order.status = status;

    await order.save({ validateBeforeSave: false });
    res.status(200).json("Updated order return request successfully");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
