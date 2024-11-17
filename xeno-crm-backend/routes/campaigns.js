const express = require('express');
const campaignController = require('../controllers/campaignController');
const router = express.Router();

// Create a new campaign
router.post('/', campaignController.createCampaign);

// Get campaign history (ordered by most recent)
router.get('/', campaignController.getCampaignHistory);

module.exports = router;
