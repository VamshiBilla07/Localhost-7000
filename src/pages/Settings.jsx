import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './Settings.css'

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex@nexbank.com',
    phone: '+91 98765 43210'
  })

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  })

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar 
          title="Settings" 
          subtitle="Manage your profile, security, and preferences" 
        />
        <div className="settings-container">
          {/* Profile Section */}
          <section className="settings-section glass-card">
            <h3 className="settings-title">Profile Information</h3>
            <div className="profile-grid">
              <div className="profile-avatar">AJ</div>
              <div className="profile-info">
                <button className="btn-sm btn-outline">Change Avatar</button>
                <p className="text-muted text-xs">JPG or PNG. Max size of 800K</p>
              </div>
            </div>
            <div className="settings-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
              </div>
              <button className="btn btn-primary btn-sm">Save Changes</button>
            </div>
          </section>

          {/* Security Section */}
          <section className="settings-section glass-card">
            <h3 className="settings-title">Security & Privacy</h3>
            <div className="settings-list">
              <div className="settings-item">
                <div className="item-info">
                  <p className="item-label">Two-Factor Authentication</p>
                  <p className="item-desc">Add an extra layer of security to your account.</p>
                </div>
                <button className="btn-sm btn-outline">Enable</button>
              </div>
              <div className="settings-item">
                <div className="item-info">
                  <p className="item-label">Face ID / Biometrics</p>
                  <p className="item-desc">Login quickly using your device's biometric sensors.</p>
                </div>
                <button className="btn-sm btn-outline">Configure</button>
              </div>
              <div className="settings-item">
                <div className="item-info">
                  <p className="item-label">Change Password</p>
                  <p className="item-desc">It's a good idea to use a strong password that you don't use elsewhere.</p>
                </div>
                <button className="btn-sm btn-outline">Update</button>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="settings-section glass-card">
            <h3 className="settings-title">Notification Preferences</h3>
            <div className="settings-list">
              {Object.entries(notifications).map(([key, val]) => (
                <div className="settings-item" key={key}>
                  <div className="item-info">
                    <p className="item-label" style={{textTransform: 'capitalize'}}>{key} Notifications</p>
                    <p className="item-desc">Receive updates about your account via {key}.</p>
                  </div>
                  <button 
                    className={`toggle-switch ${val ? 'on' : 'off'}`} 
                    onClick={() => setNotifications({...notifications, [key]: !val})}
                  >
                    <span className="toggle-knob" />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
