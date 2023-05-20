const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		pic: {
			type: String,
			required: true,
			default:
				"https://w0.peakpx.com/wallpaper/208/752/HD-wallpaper-whatsapp-dp-cartoon.jpg",
		},
	},
	{
		timestamp: true,
	},
);
const UserModel = mongoose.model("User", userSchema);

module.exports = { UserModel };
