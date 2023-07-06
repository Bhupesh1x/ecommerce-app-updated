const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/sendToken");
const { isAuthenticated } = require("../middleware/auth");

const routes = express.Router();

routes.post("/create-user", async (req, res) => {
  try {
    const isUserExist = await User.findOne({ email: req.body.email });

    if (isUserExist) {
      return res.status(400).send("User already exists");
    }

    const password = req.body.password.toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    const userInfo = await user.save();

    sendToken(userInfo, 201, res);
  } catch (error) {
    res.status(500).send(error);
  }
});

routes.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  const passwordInfo = password.toString();
  try {
    const isUserExist = await User.findOne({ email }).select("+password");
    if (!isUserExist) {
      return res.status(401).send("Wrong email or password!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      passwordInfo,
      isUserExist.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).send("Wrong email or password!");
    }

    sendToken(isUserExist, 200, res);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Load User

routes.get("/get-user", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(400).send("User is not logged in");
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// router.get(
//   "/getuser",
//   isAuthenticated,
//   (async (req, res, next) => {
//     try {
//       const user = await User.findById(req.user.id);

//       if (!user) {
//         return next(new ErrorHandler("User doesn't exists", 400));
//       }

//       res.status(200).json({
//         success: true,
//         user,
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   })
// );

module.exports = routes;
