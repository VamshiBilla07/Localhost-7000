import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './Notifications.css'

const notifications = [
  { id: 1, title: 'Security Alert', message: 'New login detected from a new device in San Francisco, CA.', time: '2 mins ago', icon: '🛡️', unread: true, category: 'Security' },
  { id: 2, title: 'Payment Received', message: 'Salary deposit of ₹5,20,000.00 from Tech Corp has been credited to your account.', time: '1 hour ago', icon: '💰', unread: true, category: 'Banking' },
  { id: 3, title: 'Card Frozen', message: 'Your Visa virtual card ending in 9012 was frozen as requested.', time: '3 hours ago', icon: '❄️', unread: false, category: 'Cards' },
  { id: 5, title: 'New Feature', message: 'NexBank now supports instant crypto-to-fiat transfers!', time: '1 day ago', icon: '🚀', unread: false, category: 'Updates' },
  { id: 6, title: 'Statement Ready', message: 'Your monthly statement for February 2026 is now available for download.', time: '2 days ago', icon: '📄', unread: false, category: 'Documents' },
]

export default function Notifications() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar 
          title="All Notifications" 
          subtitle="Stay updated with your account activity" 
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button className="btn btn-outline btn-sm">Mark All as Read</button>
        </div>

        <div className="notif-page-container glass-card">
          <div className="notif-filters">
            <button className="filter-pill active">All</button>
            <button className="filter-pill">Unread</button>
            <button className="filter-pill">Security</button>
            <button className="filter-pill">Banking</button>
          </div>

          <div className="full-notif-list">
            {notifications.map(n => (
              <div key={n.id} className={`full-notif-item ${n.unread ? 'unread' : ''}`}>
                <div className="notif-icon-large">{n.icon}</div>
                <div className="notif-details">
                  <div className="notif-meta">
                    <span className="notif-category">{n.category}</span>
                    <span className="notif-dot-sep">•</span>
                    <span className="notif-time-full">{n.time}</span>
                  </div>
                  <h3 className="notif-heading">{n.title}</h3>
                  <p className="notif-text">{n.message}</p>
                </div>
                <div className="notif-actions">
                  <button className="icon-btn-sm">🗑️</button>
                  <button className="icon-btn-sm">⚙️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
