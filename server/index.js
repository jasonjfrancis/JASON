require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const spotifyRoutes = require('./routes/spotify');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_ROOT_URL || 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/spotify', spotifyRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

if (require.main === module) {
	app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
}

module.exports = app;
