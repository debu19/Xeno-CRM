import mongoose from "mongoose"

const communicationLogSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  message: String,
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
  dateSent: { type: Date, default: Date.now }
});

const CommunicationLog = mongoose.model('CommunicationLog', communicationLogSchema);
export default CommunicationLog;