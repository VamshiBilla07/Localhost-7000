import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './Cards.css'

const cardsData = [
  {
    id: 1, type: 'Physical', last4: '7891', holder: 'ALEX JOHNSON', expiry: '12/28', network: 'VISA',
    gradient: 'linear-gradient(135deg, #6c5ce7 0%, #a29bfe 100%)',
    limit: 10000, spent: 6420, status: 'Active',
    transactions: [
      { name: 'Amazon', amount: -284.50, date: 'Mar 24' },
      { name: 'Uber Eats', amount: -42.30, date: 'Mar 23' },
      { name: 'Netflix', amount: -15.99, date: 'Mar 20' },
    ]
  },
  {
    id: 2, type: 'Virtual', last4: '3456', holder: 'ALEX JOHNSON', expiry: '06/27', network: 'MASTERCARD',
    gradient: 'linear-gradient(135deg, #00cec9 0%, #55efc4 100%)',
    limit: 5000, spent: 1850, status: 'Active',
    transactions: [
      { name: 'Spotify', amount: -9.99, date: 'Mar 22' },
      { name: 'App Store', amount: -4.99, date: 'Mar 18' },
      { name: 'Cloud Storage', amount: -2.99, date: 'Mar 15' },
    ]
  },
  {
    id: 3, type: 'Virtual', last4: '9012', holder: 'ALEX JOHNSON', expiry: '03/26', network: 'VISA',
    gradient: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)',
    limit: 3000, spent: 2890, status: 'Frozen',
    transactions: [
      { name: 'Delta Airlines', amount: -720.00, date: 'Mar 21' },
      { name: 'Hotel.com', amount: -450.00, date: 'Mar 20' },
    ]
  },
]

export default function Cards() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [frozen, setFrozen] = useState(cardsData.reduce((acc, c) => ({ ...acc, [c.id]: c.status === 'Frozen' }), {}))

  const card = cardsData[selectedIdx]
  const isFrozen = frozen[card.id]
  const spentPct = Math.min((card.spent / card.limit) * 100, 100)

  const toggleFreeze = () => setFrozen(prev => ({ ...prev, [card.id]: !prev[card.id] }))

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar 
          title="Cards Management" 
          subtitle="Manage your physical and virtual cards" 
        />

        <div className="cards-layout">
          {/* Card Carousel */}
          <div className="cards-carousel">
            <div className="carousel-track">
              {cardsData.map((c, i) => (
                <div
                  key={c.id}
                  className={`mini-card ${i === selectedIdx ? 'selected' : ''} ${frozen[c.id] ? 'is-frozen' : ''}`}
                  style={{ background: c.gradient }}
                  onClick={() => setSelectedIdx(i)}
                >
                  <div className="mini-card-shimmer" />
                  <div className="mini-card-type">{c.type}</div>
                  <div className="mini-card-chip" />
                  <div className="mini-card-number">•••• {c.last4}</div>
                  <div className="mini-card-bottom">
                    <span className="mini-card-holder">{c.holder}</span>
                    <span className="mini-card-network">{c.network}</span>
                  </div>
                  <div className="mini-card-expiry">{c.expiry}</div>
                  {frozen[c.id] && <div className="frozen-overlay">❄️ FROZEN</div>}
                </div>
              ))}
              {/* Add new card placeholder */}
              <div className="mini-card add-card" onClick={() => {}}>
                <span className="add-icon">+</span>
                <span className="add-text">Add New Card</span>
              </div>
            </div>
          </div>

          {/* Card Detail Panel */}
          <div className="card-detail glass-card">
            <div className="detail-header">
              <h3>{card.type} Card •••• {card.last4}</h3>
              <span className={`status-badge ${isFrozen ? 'status-frozen' : 'status-active'}`}>
                {isFrozen ? '❄️ Frozen' : '✅ Active'}
              </span>
            </div>

            {/* Spend Limit */}
            <div className="detail-section">
              <div className="detail-row">
                <span className="detail-label">Spend Limit</span>
                <span className="detail-value">₹{card.limit.toLocaleString('en-IN')}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Current Usage</span>
                <span className="detail-value">₹{card.spent.toLocaleString('en-IN')}</span>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${spentPct > 80 ? 'danger' : spentPct > 50 ? 'warning' : ''}`}
                  style={{ width: `${spentPct}%` }}
                />
              </div>
              <span className="progress-label">{spentPct.toFixed(1)}% of limit used</span>
            </div>

            {/* Freeze Toggle */}
            <div className="detail-section">
              <div className="detail-row">
                <span className="detail-label">Card Status</span>
                <button className={`toggle-switch ${isFrozen ? 'off' : 'on'}`} onClick={toggleFreeze} id="freeze-toggle">
                  <span className="toggle-knob" />
                  <span className="toggle-text">{isFrozen ? 'Frozen' : 'Active'}</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="detail-actions">
              <button className="detail-btn">🔢 View PIN</button>
              <button className="detail-btn warn">🚨 Report Lost</button>
              <button className="detail-btn">📦 Request New</button>
            </div>

            {/* Mini transactions */}
            <div className="detail-section">
              <h4 className="detail-subtitle">Recent Transactions</h4>
              {card.transactions.map((tx, i) => (
                <div className="detail-txn" key={i}>
                  <span className="detail-txn-name">{tx.name}</span>
                  <span className="detail-txn-date">{tx.date}</span>
                  <span className={`detail-txn-amount ${tx.amount > 0 ? 'credit' : 'debit'}`}>
                    {tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
