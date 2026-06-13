Project JASON — React + Express + Spotify integration

Structure
- client/ — Vite + React app
- server/ — Express backend handling Spotify OAuth and API proxy

Quick start

1) Server

cd server
npm install
# create a .env from .env.example and fill in Spotify credentials
npm run dev

2) Client

cd client
npm install
npm run dev

Development notes
- The server exposes `/api/auth/login` and `/api/auth/callback` for Spotify OAuth.
- The client calls `/api/spotify/me` to fetch the current Spotify profile.

See server/.env.example for required environment variables.
