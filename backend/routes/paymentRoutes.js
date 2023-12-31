const express = require("express");

const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/process", async (req, res) => {
  try {
    const myPayment = await stripe.paymentIntents.create(
      {
        amount: 2000,
        currency: "inr",
        automatic_payment_methods: { enabled: true },
      },
      { apiKey: process.env.STRIPE_SECRET_KEY }
    );
    res.status(200).json({ client_secret: myPayment.client_secret });
  } catch (error) {
    return res.status(500).send(`Error : ${error}`);
  }
});

router.get("/stripe-api-key", isAuthenticated, (req, res) => {
  try {
    res.status(200).json({ striptApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    return res.status(500).send(`Error : ${error}`);
  }
});

module.exports = router;
