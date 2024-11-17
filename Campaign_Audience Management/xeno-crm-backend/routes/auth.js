const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Google login
router.post('/google', authController.verifyGoogleToken);

module.exports = router;
