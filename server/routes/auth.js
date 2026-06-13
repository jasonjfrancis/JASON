const express = require('express');
const axios = require('axios');
const querystring = require('querystring');

const router = express.Router();

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';

router.get('/login', (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID,
    response_type: 'code',
    redirect_uri: `${process.env.SERVER_ROOT_URL}/api/auth/callback`,
    scope: 'user-read-email user-read-private',
  });
  res.redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send('Missing code');

  try {
    const authHeader = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');
    const response = await axios.post(
      SPOTIFY_TOKEN_URL,
      querystring.stringify({ grant_type: 'authorization_code', code, redirect_uri: `${process.env.SERVER_ROOT_URL}/api/auth/callback` }),
      { headers: { Authorization: `Basic ${authHeader}`, 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, refresh_token, expires_in } = response.data;

    // Set tokens in secure httpOnly cookie (example)
    res.cookie('spotify_access_token', access_token, { httpOnly: true, maxAge: expires_in * 1000 });
    res.cookie('spotify_refresh_token', refresh_token, { httpOnly: true });

    // Redirect back to client app
    const clientUrl = process.env.CLIENT_ROOT_URL || 'http://localhost:5173';
    res.redirect(clientUrl);
  } catch (err) {
    console.error('Token exchange failed', err.response?.data || err.message);
    res.status(500).send('Spotify token exchange failed');
  }
});

module.exports = router;
