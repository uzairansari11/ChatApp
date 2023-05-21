const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/userModel");
require("dotenv").config();
const authMiddleware = async (req, res, next) => {
    var token;
    if (
        req.headers.authorization
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            /* since it is decoded so now we want user name but not password in user body so we can exclude is by using select query in which "+* prefix means including and "-" excluding/  */
            if (decoded) {
                const user = await UserModel.findById(decoded.userID).select("-password");
                req.user = user
                next();
            } else {
                res.status(401);
                throw new Error("Not Authorized");

            }
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized , something went wrong");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized , no token provided");
    }
};

module.exports = { authMiddleware };
