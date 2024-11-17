const Campaign = require('../models/Campaign');
const AudienceSegment = require('../models/AudienceSegment');

const createCampaign = async (req, res) => {
  const { name, segmentId, message } = req.body;

  try {
    // Validate if the segment exists
    const segment = await AudienceSegment.findById(segmentId);
    if (!segment) {
      return res.status(404).json({ error: 'Audience segment not found' });
    }

    // Create a new campaign
    const newCampaign = new Campaign({
      name,
      segment: segmentId,
      message,
    });

    // Save the campaign
    await newCampaign.save();

    res.status(201).json({ message: 'Campaign created successfully', campaignId: newCampaign._id });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

// Get all campaigns, ordered by creation date (most recent first)
const getCampaignHistory = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .sort({ created_at: -1 }) // Sort by creation date, descending order
      .populate('segment', 'name audience_size'); // Populate audience segment info

    res.status(200).json({ campaigns });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

module.exports = {
  createCampaign,
  getCampaignHistory,
};
