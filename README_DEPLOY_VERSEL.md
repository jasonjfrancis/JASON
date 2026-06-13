Deployment steps for Vercel

1. Ensure environment variables are set in Vercel Project Settings:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SERVER_ROOT_URL` (set to your Vercel domain, e.g. https://your-app.vercel.app)
   - `CLIENT_ROOT_URL` (same as above)

2. Commit & push all changes to `main`:
```
git add .
git commit -m "prepare for vercel"
git push
```

3. Vercel will build the `client` (Vite) and the `api/index.js` serverless function. If you see Node version warnings, set `engines.node` to `24.x` in `package.json` or set Node version in Vercel Project Settings.

4. Troubleshooting:
 - If you get 404: check the build logs to ensure `client` built to `dist` and `api/index.js` was built by `@vercel/node`.
 - If OAuth redirects fail: ensure `SERVER_ROOT_URL` matches the production URL in Spotify app settings.
