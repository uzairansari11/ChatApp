/* imported express */
const express = require("express");
const app = express();
var cors = require("cors");
require("dotenv").config();
const { chats } = require("./data");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { chatRoutes } = require("./routes/chatRoutes");
const { authMiddleware } = require("./middleware/authMiddleware");
const { messageRoutes } = require("./routes/messageRoutes");

app.use(cors());
// app.use(parse())

app.use(express.json());

/* Home Page Route */
app.get("/", (req, res) => {
	res.status(200).send("welcome to chatapp");
});

/* All Users  Route */
app.use("/user", userRouter);

/* All  Chat Route */
app.use("/api/chat", authMiddleware, chatRoutes);

app.use("/api/messages", authMiddleware, messageRoutes);
/* making server to run */
const server = app.listen(process.env.PORT, async () => {
	try {
		await connection();
	} catch (error) {
		console.log("something went wrong" + error);
	}
	console.log("server is running");
});

const io = require("socket.io")(server, {
	pingTimeOut: 6000,
	cors: {
		origin: "http://localhost:3000",
	},
});

io.on("connection", (socket) => {
	console.log("connection established socket.io");

	socket.on("setup", (userData) => {
		socket.join(userData._id);
		console.log(userData._id);
		socket.emit("connected");
	});

	socket.on("join chat", (room) => {
		socket.join(room);
		console.log("userJoined Room", room);
	});

	socket.on("typing", (room) => socket.in(room).emit("typing"));
	socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

	socket.on("new messagae", (newMessageRecived) => {
		var chat = newMessageRecived.chat;
		if (!chat.users) return console.log("chat.user is not defined");

		chat.users.forEach((user) => {
			if (user._id == newMessageRecived.sender._id) return;
			socket.in(user._id).emit("message recived", newMessageRecived);
		});
	});
});
