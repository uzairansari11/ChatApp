/* imported express */
const express = require("express")
const app = express()

require('dotenv').config()
const { chats } = require("./data")

/* Home Page Route */
app.get("/", (req, res) => {

    res.status(200).send("welcome to chatapp")

})

/* All Users Chat Route */
app.get("/api/chat", (req, res) => {

    res.status(200).send(chats)

})

/* Single User Chat Route */
app.get("/api/chat/:id", (req, res) => {

    const single_user_chat_id = req.params.id

    const single_user_chat = chats.find((userschat) => {
        return userschat._id === single_user_chat_id
    })

    res.status(200).send(single_user_chat)
})

/* making server to run */
app.listen(process.env.PORT, () => {

    console.log("server is running")

})

