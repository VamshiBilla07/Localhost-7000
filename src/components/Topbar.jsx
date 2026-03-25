import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NotificationDropdown from './NotificationDropdown'
import './Topbar.css'

export default function Topbar({ title, subtitle }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
      
      <div className="topbar-right">
        <div className="notif-wrapper" style={{ position: 'relative' }}>
          <button 
            className="icon-btn" 
            id="notif-bell"
            onClick={() => setIsNotifOpen(!isNotifOpen)}
          >
            🔔<span className="notif-dot" />
          </button>
          <NotificationDropdown isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>
        
        <Link to="/settings" className="avatar-link">
          <div className="avatar">AJ</div>
        </Link>
      </div>
    </header>
  )
}
