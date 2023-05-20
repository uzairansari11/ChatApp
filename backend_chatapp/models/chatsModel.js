const mongoose = require("mongoose");
const chatSchema = mongoose.Schema(
	{
		chatName: { type: String, trim: true },
		isGroupChat: { type: Boolean, default: false, trim: true },
		users: [
			{
				type: mongoose.Schema.Object.Types.ObjectId,
				ref: "User",
			},
		],
		latestMessage: {
			type: mongoose.Schema.Object.Types.ObjectId,
			ref: "Message",
		},
		groupAdmin: {
			type: mongoose.Schema.Object.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

const ChatModel = mongoose.model("Chat", chatSchema);

module.exports = { ChatModel };
