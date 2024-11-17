const mongoose = require('mongoose');

const CommunicationLogSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' },
  status: { type: String, enum: ['SENT', 'FAILED'], required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CommunicationLog', CommunicationLogSchema);
