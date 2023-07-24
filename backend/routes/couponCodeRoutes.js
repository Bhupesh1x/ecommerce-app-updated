const express = require("express");
const CouponCode = require("../model/couponCodeModel");
const Shop = require("../model/shopModel");

const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const router = express.Router();

router.post("/create-coupon-code", isSellerAuthenticated, async (req, res) => {
  try {
    const isCouponCodeExists = await CouponCode.find({ name: req.body.name });

    if (isCouponCodeExists)
      return res.status(400).send("Coupon code already exists!");

    const couponCode = await CouponCode.create(req.body);

    res.status(201).json(couponCode);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
