const AudienceSegment = require('../models/AudienceSegment');
const Customer = require('../models/Customer');

const createAudienceSegment = async (req, res) => {
  const { name, conditions } = req.body;

  try {
    // Assuming the conditions are a simple MongoDB query string (like a filter)
    const audience = await Customer.find(JSON.parse(conditions)); // Filter customers based on conditions
    const audienceSize = audience.length;

    const newSegment = new AudienceSegment({ name, conditions, audience_size: audienceSize });
    await newSegment.save();

    res.status(201).json({ message: 'Audience segment created', segmentId: newSegment._id });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

module.exports = { createAudienceSegment };
