const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const eventRoutes = require("./routes/eventRoutes");
const couponCodeRoutes = require("./routes/couponCodeRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: "https://ecommerce-mernn-app.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use("/test", (req, res) => {
  res.send("Hello world");
});

app.use("/api/user", userRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/product", productRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/couponCode", couponCodeRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);

function connectDB() {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`mongo db conneted to the server : ${data.connection.host}`);
    });
}
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`server is running on port : ${process.env.PORT}`);
});
