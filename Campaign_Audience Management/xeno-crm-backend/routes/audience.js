const express = require('express');
const audienceController = require('../controllers/audienceController');
const router = express.Router();

// Create a new audience segment
router.post('/', audienceController.createAudienceSegment);

module.exports = router;
