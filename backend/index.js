const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}

app.use("/api/user", userRoutes);

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
