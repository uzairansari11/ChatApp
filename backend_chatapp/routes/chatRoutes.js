const express = require("express");
const {
	accessChat,
	fetchChat,
	groupChatCreator,
	renameGroup,
	addToGroup,
	removeFromGroup,
} = require("../controller/chatController");

const chatRoutes = express.Router();

chatRoutes.post("/", accessChat);

chatRoutes.get("/", fetchChat);

chatRoutes.post("/group", groupChatCreator);

chatRoutes.put("/rename", renameGroup);

chatRoutes.put("/add", addToGroup);

chatRoutes.put("/remove", removeFromGroup);

module.exports = { chatRoutes };
