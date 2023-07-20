const express = require("express");
const Event = require("../model/eventModel");
const Shop = require("../model/shopModel");

const { isSellerAuthenticated } = require("../middleware/sellerAuth");

const router = express.Router();

router.post("/create-event", isSellerAuthenticated, async (req, res) => {
  try {
    const shop = await Shop.findById(req.body.shopId);
    if (!shop) {
      return res.status(400).send("Invalid shop id");
    }
    const eventData = {
      ...req.body,
      shop,
    };
    const event = await Event.create(eventData);
    res.status(201).json({ event });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
