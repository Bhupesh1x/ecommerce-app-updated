const express = require("express");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const routes = express.Router();

routes.post("/create-user", async (req, res) => {
  try {
    const isUserExist = User.findOne({ email: req.body.email });

    if (isUserExist) {
      return res.status(400).send("User already exists");
    }

    const password = req.body.password.toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      ...req.body,
      password: hashedPassword,
    });

    console.log(user);

    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = routes;
