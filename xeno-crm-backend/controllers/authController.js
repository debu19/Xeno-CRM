const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const verifyGoogleToken = async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const userId = payload['sub'];
    const email = payload['email'];

    // JWT token generation for session management
    const userJwt = jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ userJwt });
  } catch (error) {
    res.status(400).json({ error: 'Invalid Google Token' });
  }
};

module.exports = { verifyGoogleToken };
