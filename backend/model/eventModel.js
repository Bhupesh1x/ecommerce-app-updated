const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please enter event product category!"],
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },
  discountPrice: {
    type: Number,
    required: [true, "Please enter event product price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter event product stock!"],
  },
  images: [
    {
      type: String,
    },
  ],
  shopId: {
    type: String,
    required: true,
  },
  shop: {
    type: Object,
    required: true,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("event", eventSchema);
