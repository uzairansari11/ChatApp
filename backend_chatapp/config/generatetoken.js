const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (userID) => {
  return jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });
};

module.exports = { generateToken };
