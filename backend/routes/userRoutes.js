const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/sendToken");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.post("/create-user", async (req, res) => {
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

router.post("/login-user", async (req, res) => {
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

router.get("/get-user", isAuthenticated, async (req, res) => {
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

router.get("/logout-user", async (req, res) => {
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

router.put("/update-user-info", isAuthenticated, async (req, res) => {
  const { email, avatar, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User does not exist with the email!");
    }

    const result = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        avatar,
      },
      { new: true }
    );

    res.status(200).json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/update-user-address", isAuthenticated, async (req, res) => {
  const addresses = req.body;
  try {
    const user = await User.findById(req.user._id);

    const sameTypeAddress = user.addresses.find(
      (address) => address.addressType === addresses[0].addressType
    );

    if (sameTypeAddress) {
      return res.status(500).send("Address type already exists!");
    }

    // add the new address to the array
    user.addresses.push(...addresses);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.delete("/delete-user-address/:id", isAuthenticated, async (req, res) => {
  const addressId = req.params.id;
  const userId = req.user._id;
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/update-user-password", isAuthenticated, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user._id).select("+password");

    const isPasswordCorrect = await bcrypt.compare(
      oldPassword.toString(),
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).send("Incorrect Old Password!");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).send("Password Changed Successfully");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
