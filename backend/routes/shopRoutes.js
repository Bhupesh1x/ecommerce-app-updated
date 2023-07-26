const express = require("express");
const Shop = require("../model/shopModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/sendToken");
const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const router = express.Router();

router.post("/create-shop", async (req, res) => {
  try {
    const isShopExist = await Shop.findOne({ email: req.body.email });

    if (isShopExist) {
      return res.status(400).send("Shop already exists");
    }

    const password = req.body.password.toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const shop = new Shop({
      ...req.body,
      password: hashedPassword,
    });

    const shopInfo = await shop.save();

    sendToken(shopInfo, 201, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login-shop", async (req, res) => {
  const { email, password } = req.body;
  const passwordInfo = password.toString();
  try {
    const isShopExist = await Shop.findOne({ email }).select("+password");
    if (!isShopExist) {
      return res.status(401).send("Wrong email or password!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      passwordInfo,
      isShopExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send("Wrong email or password!");
    }

    sendToken(isShopExist, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/logout", isSellerAuthenticated, async (req, res) => {
  try {
    res.cookie("ecommerceToken", null, {
      httpOnly: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get("/get-shop-info/:id", async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    res.status(200).json(shop);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
