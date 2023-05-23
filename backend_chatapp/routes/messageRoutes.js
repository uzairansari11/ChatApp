const express = require('express')
const { sendMessage, allMessage } = require('../controller/messageController')

const messageRoutes = express.Router()


messageRoutes.post("/", sendMessage)
messageRoutes.get("/:chatId", allMessage)


module.exports = { messageRoutes }