import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './SendMoney.css'

const recentRecipients = [
  { id: 1, name: 'John Doe', avatar: 'JD', acc: '•••• 1234' },
  { id: 2, name: 'Sarah Wilson', avatar: 'SW', acc: '•••• 5678' },
  { id: 3, name: 'Michael Chen', avatar: 'MC', acc: '•••• 9012' },
  { id: 4, name: 'Emma Davis', avatar: 'ED', acc: '•••• 3456' },
]

export default function SendMoney() {
  const [amount, setAmount] = useState('')
  const [selectedRecipient, setSelectedRecipient] = useState(null)
  const [note, setNote] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleTransfer = () => {
    if (!amount || !selectedRecipient) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Topbar title="Transfer Status" subtitle="Confirmation of your transaction" />
          <div className="status-container glass-card">
            <div className="success-icon">✅</div>
            <h2>Transfer Successful!</h2>
            <p className="status-msg">You've sent <strong>₹{parseFloat(amount).toLocaleString('en-IN')}</strong> to <strong>{selectedRecipient.name}</strong>.</p>
            <div className="status-details">
              <div className="detail-row"><span>Transaction ID</span><span>#TXN-9823412</span></div>
              <div className="detail-row"><span>Date</span><span>{new Date().toLocaleDateString('en-IN')}</span></div>
              <div className="detail-row"><span>Status</span><span className="text-success">Settled</span></div>
            </div>
            <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block', marginTop: '20px' }}>Return to Dashboard</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar title="Send Money" subtitle="Transfer funds instantly to any account" />
        
        <div className="send-money-grid">
          <div className="transfer-card glass-card">
            <section className="transfer-section">
              <h3 className="section-title">Select Recipient</h3>
              <div className="recipients-list">
                {recentRecipients.map(r => (
                  <div 
                    key={r.id} 
                    className={`recipient-item ${selectedRecipient?.id === r.id ? 'active' : ''}`}
                    onClick={() => setSelectedRecipient(r)}
                  >
                    <div className="recipient-avatar">{r.avatar}</div>
                    <div className="recipient-info">
                      <span className="recipient-name">{r.name}</span>
                      <span className="recipient-acc">{r.acc}</span>
                    </div>
                  </div>
                ))}
                <div className="recipient-item add-new">
                  <div className="recipient-avatar" style={{ background: 'rgba(255,255,255,0.05)', color: '#8892b0' }}>+</div>
                  <div className="recipient-info">
                    <span className="recipient-name">New Recipient</span>
                  </div>
                </div>
              </div>
            </section>

            <section className="transfer-section">
              <h3 className="section-title">Transfer Amount</h3>
              <div className="amount-input-wrapper">
                <span className="currency-prefix">₹</span>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="amount-presets">
                {['500', '1000', '5000', '10000'].map(p => (
                  <button key={p} className="preset-btn" onClick={() => setAmount(p)}>+₹{parseFloat(p).toLocaleString('en-IN')}</button>
                ))}
              </div>
            </section>

            <section className="transfer-section">
              <h3 className="section-title">Note (Optional)</h3>
              <input 
                type="text" 
                placeholder="What's this for? (e.g. Rent, Dinner)" 
                className="note-input"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </section>

            <button 
              className={`btn btn-primary transfer-btn ${isProcessing ? 'loading' : ''}`}
              disabled={!amount || !selectedRecipient || isProcessing}
              onClick={handleTransfer}
            >
              {isProcessing ? 'Processing Transfer...' : `Send ₹${amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}`}
            </button>
          </div>

          <div className="transfer-summary glass-card">
            <h3 className="section-title">Transaction Summary</h3>
            <div className="summary-details">
              <div className="summary-row">
                <span>From Account</span>
                <strong>Main Balance (•••• 4832)</strong>
              </div>
              <div className="summary-row">
                <span>Sending To</span>
                <strong>{selectedRecipient ? selectedRecipient.name : 'Not selected'}</strong>
              </div>
              <div className="summary-row">
                <span>Amount</span>
                <strong className={amount ? 'has-value' : ''}>₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0.00'}</strong>
              </div>
              <div className="summary-row">
                <span>Transfer Fee</span>
                <span className="fee-free">₹0.00 (Free)</span>
              </div>
              <hr className="summary-divider" />
              <div className="summary-row total">
                <span>Total Payable</span>
                <strong>₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0.00'}</strong>
              </div>
            </div>
            <div className="summary-info">
              <i className="info-icon">🛡️</i>
              <p>Your transfer is protected by end-to-end encryption and bank-grade security protocols.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
