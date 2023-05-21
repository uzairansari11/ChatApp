const express = require('express');
const { accessChat, fetchChat, groupChatCreator } = require('../controller/chatController');

const chatRoutes = express.Router();

chatRoutes.post("/", accessChat)

chatRoutes.get("/", fetchChat)

chatRoutes.post("/group", groupChatCreator)

chatRoutes.put("/group/rename")

chatRoutes.put("/group/remove")

chatRoutes.put("/group/add")



module.exports = { chatRoutes }