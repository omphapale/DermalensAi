const express = require("express")

const chatController = require("../controllers/chatcontroller")

const chatRouter = express.Router()

/**
 * @route POST /api/chat/:assessmentId
 * @description Send a message and receive a Gemini response
 * @access private
 */

chatRouter.post("/:assessmentId", chatController.sendChatMessageController);

/**
 * @route GET /api/chat/:assessmentId
 * @description Retrieve previous messages for an assessment
 * @access private
 */

chatRouter.get("/:assessmentId", chatController.getChatMessagesController);

module.exports = chatRouter