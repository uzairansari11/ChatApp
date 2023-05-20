const express = require('express');
const { registerUser, loginUser } = require('../controller/userController');

const userRouter = express.Router()


userRouter.post("/login", loginUser)

userRouter.post('/register', registerUser)



module.exports = { userRouter }