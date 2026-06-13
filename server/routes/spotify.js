const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/me', async (req, res) => {
  const token = req.cookies?.spotify_access_token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', { headers: { Authorization: `Bearer ${token}` } });
    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch Spotify profile' });
  }
});

module.exports = router;
