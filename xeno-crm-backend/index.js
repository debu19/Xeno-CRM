const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const campaignRoutes = require('./routes/campaigns');
const messageRoutes = require('./routes/messages');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/api/campaigns', campaignRoutes);  // Correct use of router
app.use('/api/messages', messageRoutes);    // Correct use of router

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
