const mongoose = require("mongoose");

const couponCodeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter coupon code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: [true, "Please enter coupon code Value!"],
  },
  min: {
    type: Number,
  },
  max: {
    type: Number,
  },
  shop: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("couponCode", couponCodeSchema);
