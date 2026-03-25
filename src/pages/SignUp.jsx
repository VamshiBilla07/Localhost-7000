import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'

export default function SignUp() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (field, val) => { setForm(prev => ({ ...prev, [field]: val })); setError('') }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 1000)
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

          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start banking smarter today</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Alex Johnson" value={form.name} onChange={e => update('name', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input id="signup-email" type="email" placeholder="you@example.com" value={form.email} onChange={e => update('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="signup-pass">Password</label>
              <input id="signup-pass" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => update('password', e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-pass">Confirm Password</label>
              <input id="confirm-pass" type="password" placeholder="••••••••" value={form.confirm} onChange={e => update('confirm', e.target.value)} required />
            </div>
            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? <span className="spinner" /> : 'Create Account'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/signin" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
