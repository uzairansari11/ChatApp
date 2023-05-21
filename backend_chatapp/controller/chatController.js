const asyncHandler = require("express-async-handler");
const { ChatModel } = require("../models/chatsModel");
const { UserModel } = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		console.log("userId is required");
		return res.sendStatus(404);
	}
	var isChat = await ChatModel.find({
		isGroupChat: false,
		$and: [
			{
				users: { $elemMatch: { $eq: req.user._id } },
				users: {
					$elemMatch: { $eq: userId },
				},
			},
		],
	})
		.populate("users", "-password")
		.populate("latestMessage");
	isChat = await UserModel.populate(isChat, {
		path: "lastestMessage.sender",
		select: "name pic email",
	});

	if (isChat.length > 0) {
		res.send(isChat[0]);
	} else {
		const chatData = {
			chatName: "sender",
			isGroupChat: false,
			users: [req.user._id, userId],
		};

		try {
			const createdChat = await ChatModel.create(chatData);
			const fullChat = await ChatModel.findOne({
				_id: createdChat._id,
			}).populate("users", "-password");
			res.status(200).send(fullChat);
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}
});

const fetchChat = async (req, res) => {
	try {
		const allChat = await ChatModel.find({
			users: { $elemMatch: { $eq: req.user._id } },
		})
			.populate("users", "-password")
			.populate("groupAdmin", "-password")
			.populate("latestMessage")
			.sort({ updateAt: -1 })
			.then(async (result) => {
				result = await UserModel.populate(result, {
					path: "latestMessage",
					select: "name pic email",
				});
				res.status(200).send(result);
			});
	} catch (error) {
		res.status(400).send(error);
	}
};

const groupChatCreator = async (req, res) => {
    if (!req.body.users || !req.body.name) {
        return res.status(400).send({ message: "Please fill all required fields" });
    }

    var users = JSON.parse(req.body.users);

    if (users.length < 2) {
        return res.status(400).send({ message: "More than 2 users are required" });
    }

    users.push(req.user);

    try {
        const groupChat = await ChatModel.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user,
        });

        const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        return res.status(200).json(fullGroupChat);
    } catch (error) {
        return res.status(400).send({ message: error.message });
    }
};

module.exports = { accessChat, fetchChat, groupChatCreator };
