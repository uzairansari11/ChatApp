const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const { generatetoken } = require("../config/generatetoken");
const { authMiddleware } = require("../middleware/authMiddleware");
/* ----------------User Registeration------------------ */
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all required fields");
    }

    const userExists = await UserModel.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");

    }

    if (name && email && password) {
        const hashedPassword = bcrypt.hashSync(password, 4);
        const newUser = await new UserModel({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.status(200).send({
            message: "User Created successfully",
            data: newUser,
        });
    } else {
        res.status(400)
        throw new Error("Something went wrong");
    }
});

/*------------------------- User Login -------------------------------*/
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(200).send({ message: "Please enter all required fields" });
    }

    if (email && password) {
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            bcrypt.compare(password, userExists.password).then(function (result) {
                if (result) {
                    let token = generatetoken(userExists._id);
                    res.status(200).send({ data: userExists, token });
                } else {
                    res.status(200).send({ message: "Login Failed" });
                }
            });
        } else {
            res.status(200).send({ message: "User does not exists" });
        }
    }
};

/* ----------------Search User------------------ */

const serachUser = async (req, res) => {
    const serachedUser = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
    const finalSearchedUser = await UserModel.find(serachedUser).find({
        _id: { $ne: req.user._id },
    });
    res.send(finalSearchedUser);
};

module.exports = { registerUser, loginUser, serachUser };
