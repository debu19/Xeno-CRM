const express = require('express');
const messageController = require('../controllers/messageController');
const router = express.Router();

// Send a personalized message to the audience segment
router.post('/', messageController.sendMessage);

module.exports = router;
