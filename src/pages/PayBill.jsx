import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './PayBill.css'

const categories = [
  { id: 'util', name: 'Utilities', icon: '💡' },
  { id: 'tel', name: 'Telcom', icon: '📱' },
  { id: 'cc', name: 'Credit Card', icon: '💳' },
  { id: 'ins', name: 'Insurance', icon: '🛡️' },
]

const bills = [
  { id: 1, cat: 'util', name: 'BESCOM Electricity', icon: '⚡' },
  { id: 2, cat: 'util', name: 'BWSSB Water', icon: '💧' },
  { id: 3, cat: 'tel', name: 'Airtel Fiber', icon: '🌐' },
  { id: 4, cat: 'tel', name: 'Jio Mobile', icon: '📶' },
  { id: 5, cat: 'cc', name: 'HDFC Credit Card', icon: '🏦' },
]

export default function PayBill() {
  const [selectedCat, setSelectedCat] = useState('util')
  const [selectedBill, setSelectedBill] = useState(null)
  const [amount, setAmount] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filteredBills = bills.filter(b => b.cat === selectedCat)

  const handlePay = () => {
    if (!amount || !selectedBill) return
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
          <Topbar title="Payment Confirmed" subtitle="Bill payment successful" />
          <div className="status-container glass-card">
            <div className="success-icon">🧾</div>
            <h2>Payment Successful!</h2>
            <p className="status-msg">Your payment of <strong>₹{parseFloat(amount).toLocaleString('en-IN')}</strong> to <strong>{selectedBill.name}</strong> was successful.</p>
            <div className="status-details">
              <div className="detail-row"><span>Receipt ID</span><span>#BILL-772341</span></div>
              <div className="detail-row"><span>Biller</span><span>{selectedBill.name}</span></div>
              <div className="detail-row"><span>Status</span><span className="text-success">Paid</span></div>
            </div>
            <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Back to Dashboard</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar title="Pay Bills" subtitle="Quickly pay your utility and service bills" />
        
        <div className="bill-grid">
          <div className="bill-selection glass-card">
            <section className="bill-section">
              <h3 className="section-title">Select Category</h3>
              <div className="cat-grid">
                {categories.map(c => (
                  <button 
                    key={c.id} 
                    className={`cat-btn ${selectedCat === c.id ? 'active' : ''}`}
                    onClick={() => { setSelectedCat(c.id); setSelectedBill(null); }}
                  >
                    <span className="cat-icon">{c.icon}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="bill-section">
              <h3 className="section-title">Choose Biller</h3>
              <div className="biller-list">
                {filteredBills.map(b => (
                  <div 
                    key={b.id} 
                    className={`biller-item ${selectedBill?.id === b.id ? 'active' : ''}`}
                    onClick={() => setSelectedBill(b)}
                  >
                    <span className="biller-icon">{b.icon}</span>
                    <span className="biller-name">{b.name}</span>
                    {selectedBill?.id === b.id && <span className="check">✓</span>}
                  </div>
                ))}
              </div>
            </section>

            <section className="bill-section">
              <h3 className="section-title">Billing Amount</h3>
              <div className="bill-input-wrapper">
                <span className="currency">₹</span>
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </section>

            <button 
              className={`btn btn-primary pay-btn ${isProcessing ? 'loading' : ''}`}
              disabled={!amount || !selectedBill || isProcessing}
              onClick={handlePay}
            >
              {isProcessing ? 'Verifying Payment...' : `Pay ₹${amount ? parseFloat(amount).toLocaleString('en-IN') : '0'}`}
            </button>
          </div>

          <div className="bill-history glass-card">
            <h3 className="section-title">Recent Bill Payments</h3>
            <div className="history-list">
              {[
                { name: 'BESCOM', amount: 1450, date: 'Feb 28' },
                { name: 'Airtel Fiber', amount: 999, date: 'Feb 15' },
                { name: 'LIC Insurance', amount: 4500, date: 'Feb 10' }
              ].map((h, i) => (
                <div className="history-item" key={i}>
                  <div className="h-info">
                    <span className="h-name">{h.name}</span>
                    <span className="h-date">{h.date}</span>
                  </div>
                  <span className="h-amount">₹{h.amount.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
