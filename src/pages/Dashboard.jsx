import { Link } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import './Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const chartData = {
  labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  datasets: [
    { 
      label: 'Income', 
      data: [420000, 380000, 510000, 460000, 520000, 490000], 
      borderColor: '#fff',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    },
    { 
      label: 'Expenses', 
      data: [280000, 320000, 290000, 310000, 270000, 340000], 
      borderColor: '#8892b0',
      backgroundColor: 'rgba(136, 146, 176, 0.05)',
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      borderDash: [5, 5],
    },
  ],
}

const chartOptions = {
  responsive: true, maintainAspectRatio: false,
  plugins: { 
    legend: { display: true, position: 'top', labels: { color: '#8892b0', usePointStyle: true, pointStyle: 'circle', padding: 20 } },
    tooltip: {
      backgroundColor: 'rgba(10, 14, 39, 0.9)',
      titleColor: '#fff',
      bodyColor: '#fff',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: { label: (ctx) => ` ₹${ctx.raw.toLocaleString('en-IN')}` }
    }
  },
  scales: {
    x: { grid: { display: false }, ticks: { color: '#5a6380' } },
    y: { grid: { color: 'rgba(255,255,255,0.04)' }, border: { display: false }, ticks: { color: '#5a6380', callback: v => `₹${v/1000}k` } },
  },
}

const transactions = [
  { icon: '🛍️', name: 'Amazon', category: 'Shopping', amount: -284.50, date: 'Mar 24, 2026' },
  { icon: '🍕', name: 'Uber Eats', category: 'Food', amount: -42.30, date: 'Mar 23, 2026' },
  { icon: '💰', name: 'Salary Deposit', category: 'Income', amount: 5200.00, date: 'Mar 22, 2026' },
  { icon: '✈️', name: 'Delta Airlines', category: 'Travel', amount: -720.00, date: 'Mar 20, 2026' },
]

const quickActions = [
  { icon: '💸', label: 'Send Money' },
  { icon: '📄', label: 'Pay Bill' },
  { icon: '💳', label: 'Add Card' },
  { icon: '⬆️', label: 'Top Up' },
]

export default function Dashboard() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar title="Good Morning, Alex 👋" subtitle="Tuesday, March 25, 2026" />

        {/* Balance Card */}
        <section className="balance-card">
          <div className="balance-glass">
            <div className="balance-left">
              <p className="balance-label">Total Balance</p>
              <h2 className="balance-amount">₹4,85,622.80</h2>
              <p className="balance-acc">Account •••• 4832</p>
            </div>
            <div className="balance-right">
              <div className="balance-change positive">↑ 12.5% from last month</div>
            </div>
          </div>
        </section>

        {/* KPI Tiles */}
        <section className="kpi-grid">
          {[
            { label: 'Income', value: '₹5,20,000', icon: '📈', change: '+8.2%', positive: true, path: '/transactions' },
            { label: 'Expenses', value: '₹3,40,000', icon: '📉', change: '+3.1%', positive: false, path: '/transactions' },
            { label: 'Savings Rate', value: '34.6%', icon: '🏦', change: '+2.4%', positive: true, path: '/dashboard' },
          ].map((kpi, i) => (
            <Link to={kpi.path} className="kpi-card" key={i} style={{ animationDelay: `${i * 0.1}s`, textDecoration: 'none', color: 'inherit' }}>
              <div className="kpi-icon">{kpi.icon}</div>
              <div className="kpi-info">
                <span className="kpi-label">{kpi.label}</span>
                <span className="kpi-value">{kpi.value}</span>
              </div>
              <span className={`kpi-change ${kpi.positive === true ? 'pos' : kpi.positive === false ? 'neg' : ''}`}>{kpi.change}</span>
            </Link>
          ))}
        </section>

        {/* Chart + Transactions */}
        <section className="dashboard-grid">
          <div className="chart-card glass-card">
            <h3 className="card-title">Spending Overview</h3>
            <div className="chart-container">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="txn-card glass-card">
            <div className="card-header">
              <h3 className="card-title">Recent Transactions</h3>
              <a href="/transactions" className="see-all">See All →</a>
            </div>
            <div className="txn-list">
              {transactions.map((tx, i) => (
                <div className="txn-item" key={i}>
                  <div className="txn-icon">{tx.icon}</div>
                  <div className="txn-info">
                    <span className="txn-name">{tx.name}</span>
                    <span className="txn-cat">{tx.category}</span>
                  </div>
                  <div className="txn-right">
                    <span className={`txn-amount ${tx.amount > 0 ? 'credit' : 'debit'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </span>
                    <span className="txn-date">{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h3 className="card-title">Quick Actions</h3>
          <div className="actions-grid">
            <Link to="/send-money" className="action-btn" style={{ textDecoration: 'none' }}>
              <span className="action-icon">💸</span>
              <span>Send Money</span>
            </Link>
            <Link to="/pay-bill" className="action-btn" style={{ textDecoration: 'none' }}>
              <span className="action-icon">📄</span>
              <span>Pay Bill</span>
            </Link>
            <Link to="/add-card" className="action-btn" style={{ textDecoration: 'none' }}>
              <span className="action-icon">💳</span>
              <span>Add Card</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
