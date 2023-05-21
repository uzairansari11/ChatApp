const express = require('express');
const { registerUser, loginUser, serachUser } = require('../controller/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

const userRouter = express.Router()


userRouter.post("/login", loginUser)

userRouter.post('/register', registerUser)

userRouter.get("/", authMiddleware, serachUser)



module.exports = { userRouter }