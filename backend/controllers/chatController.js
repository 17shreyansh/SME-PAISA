const ChatSession = require('../models/ChatSession');
const ChatMessage = require('../models/ChatMessage');

// Start a chat session
exports.startSession = async (req, res) => {
  try {
    const { coordinatorId, loanApplicationId } = req.body;
    const session = await ChatSession.create({
      clientId: req.user.clientId || req.user._id,
      coordinatorId,
      loanApplicationId
    });
    res.status(201).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error starting chat session', error });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  try {
    const { sessionId, message } = req.body;
    const chatMessage = await ChatMessage.create({
      sessionId,
      senderId: req.user._id,
      message
    });
    // TODO: Broadcast via WebSocket
    res.status(201).json({ success: true, chatMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error sending message', error });
  }
};

// Get all messages in a session
exports.getMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await ChatMessage.find({ sessionId }).sort({ sentAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching messages', error });
  }
};

// Get all chat sessions for a client
exports.getSessions = async (req, res) => {
  try {
    const clientId = req.user.clientId || req.user._id;
    const sessions = await ChatSession.find({ clientId });
    res.json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching sessions', error });
  }
};
