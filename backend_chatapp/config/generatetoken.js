const jwt = require("jsonwebtoken");

require("dotenv").config();

const generatetoken = (userID) => {

    return jwt.sign({ userID }, process.env.JWT_SECRET, {

        expiresIn: "20d",

    });

};

module.exports = { generatetoken };
