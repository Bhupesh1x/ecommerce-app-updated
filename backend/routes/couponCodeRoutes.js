const express = require("express");
const CouponCode = require("../model/couponCodeModel");

const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const router = express.Router();

router.post("/create-coupon-code", isSellerAuthenticated, async (req, res) => {
  try {
    const isCouponCodeExists = await CouponCode.findOne({
      name: req.body.name,
    });

    if (isCouponCodeExists)
      return res.status(400).send("Coupon code already exists!");

    const couponCode = await CouponCode.create({
      ...req.body,
      shopId: req.seller._id,
    });

    res.status(201).json(couponCode);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/get-coupon-code/:id", isSellerAuthenticated, async (req, res) => {
  try {
    const couponsCode = await CouponCode.find({ shopId: req.params.id });

    res.status(200).json(couponsCode);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete(
  "/delete-shop-coupon-code/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const product = await CouponCode.findOneAndDelete({
        _id: req.params.id,
        shopId: req.seller._id,
      });
      if (!product) {
        res
          .status(404)
          .send(
            "Coupon Code not found with the specific id Or you don't have permission to delete this Coupon Code!"
          );
      }
      res.status(200).send("Coupon Code deleted successfully!");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.get("/get-coupon-value/:name", async (req, res) => {
  try {
    const couponsCode = await CouponCode.findOne({ name: req.params.name });

    res.status(200).json(couponsCode);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
