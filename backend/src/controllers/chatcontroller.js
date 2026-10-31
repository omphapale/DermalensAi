
const mongoose = require("mongoose");

const Assessment = require("../models/assessment");
const ChatSession = require("../models/ChatSession");
const ChatMessage = require("../models/ChatMessage");

const { generateChatResponse } = require("../services/geminiService");

// POST /api/chat/:assessmentId
const sendChatMessageController = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { message } = req.body;

    // 1. Validate assessment ID
    if (!mongoose.Types.ObjectId.isValid(assessmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assessment ID.",
      });
    }

    // 2. Validate user message
    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.trim().length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Message must contain 1-5000 characters.",
      });
    }

    // 3. Find the assessment
    const assessment = await Assessment.findById(assessmentId).select(
      "-image.data"
    );

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found.",
      });
    }

    // 4. Find an existing session or create a new one
    let session = await ChatSession.findOne({ assessmentId }).sort({
      updatedAt: -1,
    });

    if (!session) {
      session = await ChatSession.create({ assessmentId });
    }

    // 5. Save the user's message
    const userMessage = await ChatMessage.create({
      sessionId: session._id,
      role: "user",
      content: message.trim(),
    });

    // 6. Generate a response using Gemini and the assessment context
    let aiReply;

    try {
      aiReply = await generateChatResponse({
        message: message.trim(),
        assessment: {
          symptoms: assessment.symptoms,
          duration: assessment.duration,
          bodyLocation: assessment.bodyLocation,
          pain: assessment.pain,
          aiAnalysis: assessment.aiAnalysis,
        },
      });

      if (!aiReply || typeof aiReply !== "string" || !aiReply.trim()) {
        throw new Error("Gemini returned an empty response.");
      }
    } catch (aiError) {
      console.error("Gemini chat error:", aiError);

      return res.status(502).json({
        success: false,
        message:
          "Your message was saved, but the AI response could not be generated. Please try again.",
        sessionId: session._id,
        userMessage,
      });
    }

    // 7. Save Gemini's response
    const assistantMessage = await ChatMessage.create({
      sessionId: session._id,
      role: "assistant",
      content: aiReply.trim(),
    });

    // 8. Update the session's timestamp
    session.updatedAt = new Date();
    await session.save();

    // 9. Return the conversation messages
    return res.status(200).json({
      success: true,
      message: "Chat response generated successfully.",
      sessionId: session._id,
      userMessage,
      assistantMessage,
    });
  } catch (error) {
    console.error("Chat controller error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process your message. Please try again.",
    });
  }
};


// GET /api/chat/:assessmentId
const getChatMessagesController = async (req, res) => {
  try {
    const { assessmentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(assessmentId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid assessment ID.",
      });
    }

    // Confirm the assessment exists
    const assessment = await Assessment.findById(assessmentId).select("_id");

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found.",
      });
    }

    // Find the session for this assessment
    const session = await ChatSession.findOne({ assessmentId }).sort({
      updatedAt: -1,
    });

    if (!session) {
      return res.status(200).json({
        success: true,
        sessionId: null,
        messages: [],
      });
    }

    // Fetch messages in chronological order
    const messages = await ChatMessage.find({
      sessionId: session._id,
    }).sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      sessionId: session._id,
      messages,
    });
  } catch (error) {
    console.error("Get chat messages error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to load chat history.",
    });
  }
};

module.exports = {
  sendChatMessageController,
  getChatMessagesController,
};
