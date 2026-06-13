export async function getProfile() {
  const res = await fetch('/api/spotify/me', { credentials: 'include' })
  if (!res.ok) throw new Error('Not authenticated or failed to fetch')
  return res.json()
}
