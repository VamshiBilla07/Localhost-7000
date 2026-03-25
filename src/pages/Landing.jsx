import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

export default function Landing() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.15 }
    )
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="landing-page">
      {/* Decorative */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="noise-overlay" />
      <div className="grid-overlay" />

      {/* Nav */}
      <nav className={`landing-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo"><span className="logo-icon">⬡</span> NexBank</Link>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className="nav-actions">
            <Link to="/signin" className="btn btn-outline btn-sm">Sign In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Open Account</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge"><span className="dot" /> Next-Gen Digital Banking</div>
            <h1 className="hero-title">Your Money,<br /><span className="highlight">Intelligently Managed</span></h1>
            <p className="hero-subtitle">Experience banking reimagined. Smart analytics, instant transfers, and bank-grade security — all in one elegant platform.</p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn btn-primary">Open Account <span>→</span></Link>
              <Link to="/signin" className="btn btn-outline">Sign In</Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><span className="val">2M+</span><span className="label">Active Users</span></div>
              <div className="hero-stat"><span className="val">$18B+</span><span className="label">Transactions</span></div>
              <div className="hero-stat"><span className="val">99.9%</span><span className="label">Uptime</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="card-wrapper">
              <div className="floating-el el-1">🔒</div>
              <div className="floating-el el-2">📊</div>
              <div className="floating-el el-3"><span>↑</span> +12.5%</div>
              <div className="credit-card">
                <div className="card-chip" />
                <div className="card-contactless">))))</div>
                <div className="card-number">4532 •••• •••• 7891</div>
                <div className="card-bottom">
                  <div><div className="card-label">Card Holder</div><div className="card-value">ALEX JOHNSON</div></div>
                  <div><div className="card-label">Expires</div><div className="card-value">12/28</div></div>
                  <div className="card-network">VISA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-tag">Why Choose NexBank</span>
          <h2 className="section-title">Built for Modern Finance</h2>
          <p className="section-sub">Everything you need to manage, grow, and protect your money.</p>
        </div>
        <div className="features-grid">
          {[
            { icon: '🛡️', title: 'Bank-Grade Security', desc: '256-bit encryption, biometric authentication, and real-time fraud detection keep your accounts safe around the clock.', cls: 'security' },
            { icon: '⚡', title: 'Real-Time Transfers', desc: 'Send and receive money instantly, anywhere in the world. Zero fees on domestic transfers, ultra-low rates internationally.', cls: 'transfers' },
            { icon: '📈', title: 'Smart Analytics', desc: 'AI-powered insights help you understand spending patterns, set budgets, and reach your financial goals faster.', cls: 'analytics' },
          ].map((f, i) => (
            <div className={`feature-card animate-on-scroll delay-${i + 1}`} key={i} id={i === 0 ? 'security' : undefined}>
              <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-brand">
              <Link to="/" className="nav-logo"><span className="logo-icon">⬡</span> NexBank</Link>
              <p>The future of banking is here. Secure, intelligent, and designed for you.</p>
            </div>
            {[
              { title: 'Product', links: ['Features', 'Pricing', 'Security', 'Business'] },
              { title: 'Company', links: ['About', 'Careers', 'Blog', 'Press'] },
              { title: 'Support', links: ['Help Center', 'Contact', 'Status', 'API Docs'] },
            ].map((col, i) => (
              <div className="footer-col" key={i}>
                <h4>{col.title}</h4>
                {col.links.map((l, j) => <a href="#" key={j}>{l}</a>)}
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <span>© 2026 NexBank. All rights reserved.</span>
            <div className="footer-socials">
              <a href="#">𝕏</a><a href="#">in</a><a href="#">⌘</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
