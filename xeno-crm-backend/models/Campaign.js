const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  segment: { type: mongoose.Schema.Types.ObjectId, ref: 'AudienceSegment' },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Campaign', CampaignSchema);
