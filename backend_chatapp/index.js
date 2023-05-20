/* imported express */
const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const { chats } = require("./data");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");

app.use(cors());
// app.use(parse())

app.use(express.json());
/* Home Page Route */
app.get("/", (req, res) => {
	res.status(200).send("welcome to chatapp");
});

/* All Users Chat Route */
app.get("/api/chat", (req, res) => {
	res.status(200).send(chats);
});

/* Single User Chat Route */
app.get("/api/chat/:id", (req, res) => {
	const single_user_chat_id = req.params.id;

	const single_user_chat = chats.find((userschat) => {
		return userschat._id === single_user_chat_id;
	});

	res.status(200).send(single_user_chat);
});

app.use("/user", userRouter);
/* making server to run */
app.listen(process.env.PORT, async () => {
	try {
		await connection();
	} catch (error) {
		console.log("something went wrong" + error);
	}
	console.log("server is running");
});
