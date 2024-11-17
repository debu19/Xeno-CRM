const mongoose = require('mongoose');

const AudienceSegmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conditions: { type: String, required: true },
  audience_size: { type: Number, default: 0 },
});

module.exports = mongoose.model('AudienceSegment', AudienceSegmentSchema);
