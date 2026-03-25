import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

const DEMO_EMAIL = 'alex@nexbank.com'
const DEMO_PASS = 'demo1234'

export default function SignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fillDemo = () => { setEmail(DEMO_EMAIL); setPassword(DEMO_PASS); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      if (email === DEMO_EMAIL && password === DEMO_PASS) {
        navigate('/dashboard')
      } else {
        setError('Invalid credentials. Try the demo account below!')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="noise-overlay" />
        <div className="grid-overlay" />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">⬡</span> NexBank
          </Link>

          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to access your account</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email" type="email" placeholder="you@example.com"
                value={email} onChange={e => { setEmail(e.target.value); setError('') }}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password" type="password" placeholder="••••••••"
                value={password} onChange={e => { setPassword(e.target.value); setError('') }}
                required
              />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Sign In'}
            </button>
          </form>

          <div className="demo-box">
            <p className="demo-title">🎯 Demo Account</p>
            <div className="demo-creds">
              <div><span className="demo-label">Email:</span> <code>{DEMO_EMAIL}</code></div>
              <div><span className="demo-label">Password:</span> <code>{DEMO_PASS}</code></div>
            </div>
            <button className="demo-btn" onClick={fillDemo}>Auto-fill Demo Credentials</button>
          </div>

          <p className="auth-footer-text">
            Don't have an account? <Link to="/signup" className="auth-link">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
