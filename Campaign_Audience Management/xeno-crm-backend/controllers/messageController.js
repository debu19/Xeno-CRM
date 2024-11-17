const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');
const Customer = require('../models/Customer');

const sendMessage = async (req, res) => {
  const { segmentId, message } = req.body;

  try {
    // Find the audience segment based on ID
    const segment = await AudienceSegment.findById(segmentId);
    if (!segment) {
      return res.status(404).json({ error: 'Audience segment not found' });
    }

    // Parse the segment conditions and filter customers
    const conditions = segment.conditions; // Assuming the conditions are saved as a valid MongoDB query string
    const customers = await Customer.find(JSON.parse(conditions));

    // Iterate through the customers and send personalized messages
    for (const customer of customers) {
      const personalizedMessage = message.replace('[Name]', customer.name);

      // Log the communication in the CommunicationLog table
      const communicationLog = new CommunicationLog({
        customer: customer._id,
        message: segment._id, // Reference the message from the campaign
        status: 'SENT', // Initial status before Delivery Receipt API is called
      });

      await communicationLog.save();

      // Simulate Delivery Receipt API with random success or failure
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      communicationLog.status = status;

      // Update the communication log with delivery status
      await communicationLog.save();
    }

    res.status(200).json({ message: 'Messages sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending messages', details: error.message });
  }
};

module.exports = { sendMessage };
