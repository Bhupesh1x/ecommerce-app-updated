const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie("ecommerceToken", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
