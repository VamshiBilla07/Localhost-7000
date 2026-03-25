import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './AddCard.css'

export default function AddCard() {
  const [formData, setFormData] = useState({
    type: 'Virtual',
    network: 'VISA',
    holder: 'ALEX JOHNSON',
    limit: 50000
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleCreate = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2500)
  }

  if (isSuccess) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Topbar title="Card Issued" subtitle="Your new card is ready to use" />
          <div className="status-container glass-card">
            <div className="success-icon">💳</div>
            <h2>Card Created!</h2>
            <p className="status-msg">Your new {formData.type} {formData.network} card has been successfully issued.</p>
            <div className="card-preview success">
              <div className="card-type">{formData.type}</div>
              <div className="card-chip" />
              <div className="card-num">•••• •••• •••• 8821</div>
              <div className="card-btm">
                <span>{formData.holder}</span>
                <span>{formData.network}</span>
              </div>
            </div>
            <Link to="/cards" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '30px' }}>Go to Cards Management</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar title="Issue New Card" subtitle="Create a virtual or physical card instantly" />
        
        <div className="add-card-grid">
          <div className="card-form-container glass-card">
            <section className="form-section">
              <h3 className="section-title">Card Type</h3>
              <div className="type-toggle">
                {['Virtual', 'Physical'].map(t => (
                  <button 
                    key={t}
                    className={`toggle-btn ${formData.type === t ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, type: t})}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <p className="type-desc">
                {formData.type === 'Virtual' 
                  ? 'Instant delivery, optimized for online shopping and security.'
                  : 'Delivered in 3-5 business days. NFC support for in-store payments.'}
              </p>
            </section>

            <section className="form-section">
              <h3 className="section-title">Card Network</h3>
              <div className="network-grid">
                {['VISA', 'MASTERCARD'].map(n => (
                  <button 
                    key={n}
                    className={`net-btn ${formData.network === n ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, network: n})}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </section>

            <section className="form-section">
              <h3 className="section-title">Spend Limit</h3>
              <div className="limit-input-box">
                <span className="cur">₹</span>
                <input 
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({...formData, limit: e.target.value})}
                />
              </div>
              <input 
                type="range" 
                min="1000" 
                max="500000" 
                step="1000"
                className="limit-slider"
                value={formData.limit}
                onChange={(e) => setFormData({...formData, limit: e.target.value})}
              />
            </section>

            <button 
              className={`btn btn-primary create-btn ${isProcessing ? 'loading' : ''}`}
              disabled={isProcessing}
              onClick={handleCreate}
            >
              {isProcessing ? 'Generating Secure Card...' : 'Issue Card'}
            </button>
          </div>

          <div className="card-visual-preview">
            <div className={`live-card ${formData.network.toLowerCase()}`}>
              <div className="live-shimmer" />
              <div className="live-type">{formData.type}</div>
              <div className="live-chip" />
              <div className="live-num">•••• •••• •••• ••••</div>
              <div className="live-btm">
                <div className="live-holder">
                  <span className="live-label">CARD HOLDER</span>
                  <span className="live-name">{formData.holder}</span>
                </div>
                <div className="live-expiry">
                  <span className="live-label">EXPIRES</span>
                  <span className="live-date">03/31</span>
                </div>
                <div className="live-network">{formData.network}</div>
              </div>
            </div>
            <div className="preview-tip">
              <i className="tip-icon">✨</i>
              <p>Your card will be available for online use immediately after issuance.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
