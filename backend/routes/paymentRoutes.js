const express = require("express");

const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/payment/process", async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        compant: "EShop",
      },
    });
    res.status(200).json({ client_secret: myPayment.client_secret });
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.get("/stript-api-key", (req, res) => {
  try {
    res.status(200).json({ striptApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {}
});

module.exports = router;
