const mongoose = require("mongoose");

const messagesSchema = mongoose.Schema(
	{
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		content: { type: String, trim: true },

		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
		},
	},
	{
		timestamp: true,
	},
);

const MessageModel = mongoose.model("Message", messagesSchema);

module.exports = { MessageModel };
