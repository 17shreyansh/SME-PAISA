const express = require('express');
const router = express.Router();
const {
  startSession,
  sendMessage,
  getMessages,
  getSessions
} = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

router.use(protect);

// Start a chat session
router.post('/session', startSession);

// Send a message
router.post('/message', sendMessage);

// Get all messages in a session
router.get('/session/:sessionId/messages', getMessages);

// Get all chat sessions for a client
router.get('/sessions', getSessions);

module.exports = router;
