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

chatRoutes.put("/group/rename", renameGroup);

chatRoutes.put("/group/add", addToGroup);

chatRoutes.put("/group/remove", removeFromGroup);

module.exports = { chatRoutes };
