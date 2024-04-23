const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userModel");
const { generateToken } = require("../config/generateToken");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }

    let userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      pic,
    });

    res.status(201).json({
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ data: user, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const searchUser = async (req, res) => {
  const searchQuery = req.query.search || "";
  const regex = new RegExp(searchQuery, "i");

  try {
    const searchedUser = await UserModel.find({
      $and: [
        {
          $or: [{ name: regex }, { email: regex }],
        },
        { _id: { $ne: req.user._id } },
      ],
    });

    res.send(searchedUser);
  } catch (error) {
    console.error("Error searching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser, searchUser };
