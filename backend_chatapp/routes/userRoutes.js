const express = require('express');
const { registerUser, loginUser, searchUser } = require('../controller/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const userRouter = express.Router()


userRouter.post("/login", loginUser)

userRouter.post('/register', registerUser)

userRouter.get("/", authMiddleware, searchUser);



module.exports = { userRouter }