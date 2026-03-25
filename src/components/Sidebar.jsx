import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './Sidebar.css'

const navItems = [
  { path: '/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/transactions', icon: '💸', label: 'Transactions' },
  { path: '/cards', icon: '💳', label: 'Cards' },
  { path: '/settings', icon: '⚙️', label: 'Settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo" onClick={() => navigate('/')}>
          <span className="logo-icon">⬡</span>
          <span className="logo-text">NexBank</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sidebar-bottom">
        <button className="sidebar-link logout" onClick={() => navigate('/')}>
          <span className="sidebar-icon">🚪</span>
          <span className="sidebar-label">Logout</span>
        </button>
      </div>
    </aside>
  )
}
