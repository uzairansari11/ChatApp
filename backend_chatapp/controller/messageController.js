const { model } = require("mongoose");
const { MessageModel } = require("../models/messageMOdel");
const { UserModel } = require("../models/userModel");
const { ChatModel } = require("../models/chatsModel");
const asyncHandler = require("express-async-handler");

const sendMessage = asyncHandler(async (req, res) => {

    const { content, chatId } = req.body;
    if (!content || !chatId) {
        return res.sendStatus(400);
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await  MessageModel.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await UserModel.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await ChatModel.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });
        res.json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

const allMessage = asyncHandler(async (req, res) => {
    try {
        const messages = await MessageModel.find({ chat: req.params.chatId }).populate( "sender",  "name pic email"  ).populate("chat")
        res.json(messages)
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = { sendMessage, allMessage };
