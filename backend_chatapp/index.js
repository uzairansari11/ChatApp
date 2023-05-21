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
app.use("/api/chat", authMiddleware, chatRoutes)


/* making server to run */
app.listen(process.env.PORT, async () => {
	try {
		await connection();
	} catch (error) {
		console.log("something went wrong" + error);
	}
	console.log("server is running");
});
