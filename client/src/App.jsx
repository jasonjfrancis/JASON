import React, { useState } from 'react'
import { getProfile } from './api/spotify'

export default function App() {
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState(null)

  const handleLogin = () => {
    // Redirects to server which starts the Spotify OAuth flow
    window.location.href = '/api/auth/login'
  }

  const fetchProfile = async () => {
    setError(null)
    try {
      const data = await getProfile()
      setProfile(data)
    } catch (err) {
      setError(err.message || 'Failed')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <img src="/logo.png" alt="JFRX Logo" className="logo" />
        <nav>
          <ul>
            <li><a href="#section-1">Music</a></li>
            <li><a href="#section-2">Gallery</a></li>
            <li><a href="#section-3">About</a></li>
            <li><a href="#section-4">Contact</a></li>
          </ul>
        </nav>
      </header>

      <div className="hero-section" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <h1 className="hero-title">JASON JFRANCIS</h1>
        <p className="hero-subtitle">Singer &bull; Rapper &bull; Performer &bull; Creator</p>
      </div>
      
      <main className="content">
        <section className="section-1" id="section-1">
          <h2>LATEST RELEASES</h2>
          <p className="secondary-text">Listen to the latest releases of JASON JFRANCIS. Click the "Listen" button below!</p>
          <div className="app">
            <div className="controls">
              <button onClick={handleLogin}>Listen</button>
            </div>

            {error && <div className="error">{error}</div>}

            {profile && (
              <div className="profile card">
                <h3>{profile.display_name}</h3>
                <p className="secondary-text">{profile.email}</p>
                <img src={profile.images?.[0]?.url} alt="avatar" width={120} />
              </div>
            )}
          </div>
        </section>

        <section className="section-2 gallery-section" id="section-2">
          <h2><span className="accent-text">JASON J. FRANCIS</span> GALLERY</h2>
          <p className="secondary-text">A curated visual archive.</p>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="gallery-overlay"><span>Performance</span></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-overlay"><span>Editorial</span></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-overlay"><span>Behind the Scenes</span></div>
            </div>
            <div className="gallery-item">
              <div className="gallery-overlay"><span>Creative Projects</span></div>
            </div>
          </div>
        </section>

        <section className="section-3" id="section-3">
          <h2>ABOUT THE ARTIST</h2>
          <p>
            Combining the authority of a creative executive with the authenticity of a modern performer. 
            Jason J. Francis redefines the boundaries of sound and visual artistry.
          </p>
        </section>

        <section className="section-4" id="section-4">
          <h2>CONTACT</h2>
          <p className="secondary-text">For management, bookings, and press inquiries.</p>
          <div className="controls" style={{ marginTop: '1.5rem' }}>
            <button className="secondary">Contact Management</button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} JASON JFRANCIS, HAUS OF JFRANCIS</p>
      </footer>
    </div>
  )
}
