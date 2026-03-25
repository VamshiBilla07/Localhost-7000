import { Link } from 'react-router-dom'
import './NotificationDropdown.css'

const notifications = [
  { id: 1, title: 'Security Alert', message: 'New login detected from a new device.', time: '2 mins ago', icon: '🛡️', unread: true },
  { id: 2, title: 'Payment Received', message: 'Salary deposit of ₹5,20,000 has been credited.', time: '1 hour ago', icon: '💰', unread: true },
  { id: 3, title: 'Card Frozen', message: 'Your Visa card ending in 9012 was frozen.', time: '3 hours ago', icon: '❄️', unread: false },
]

export default function NotificationDropdown({ isOpen, onClose }) {
  if (!isOpen) return null

  return (
    <div className="notif-dropdown glass-card">
      <div className="notif-header">
        <h3>Notifications</h3>
        <button className="mark-all">Mark all as read</button>
      </div>
      <div className="notif-list">
        {notifications.map(n => (
          <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`} onClick={onClose}>
            <div className="notif-icon">{n.icon}</div>
            <div className="notif-content">
              <p className="notif-title">{n.title}</p>
              <p className="notif-message">{n.message}</p>
              <p className="notif-time">{n.time}</p>
            </div>
            {n.unread && <span className="unread-dot" />}
          </div>
        ))}
      </div>
      <div className="notif-footer">
        <Link to="/notifications" className="view-all" onClick={onClose}>View all notifications</Link>
      </div>
    </div>
  )
}
