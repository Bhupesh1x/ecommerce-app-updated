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

router.get(
  "/get-events-by-shop-id/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const events = await Event.find({ shopId: req.params.id });
      res.status(200).json(events);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

router.delete(
  "/delete-shop-event/:id",
  isSellerAuthenticated,
  async (req, res) => {
    try {
      const event = await Event.findOneAndDelete({
        _id: req.params.id,
        shopId: req.seller._id,
      });
      if (!event) {
        res
          .status(404)
          .send(
            "Event not found with the specific id Or you don't have permission to delete this event!"
          );
      }
      res.status(200).send("Event deleted sucessfully!");
    } catch (error) {
      return res.status(400).send(error);
    }
  }
);

module.exports = router;
