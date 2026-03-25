import React, { useState, useMemo } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './Transactions.css'

const allTransactions = [
  { id: 1, date: '2026-03-25', merchant: 'Amazon', category: 'Shopping', icon: '🛍️', amount: -284.50, status: 'Completed' },
  { id: 2, date: '2026-03-24', merchant: 'Uber Eats', category: 'Food', icon: '🍕', amount: -42.30, status: 'Completed' },
  { id: 3, date: '2026-03-23', merchant: 'Salary Deposit', category: 'Income', icon: '💰', amount: 5200.00, status: 'Completed' },
  { id: 5, date: '2026-03-21', merchant: 'Delta Airlines', category: 'Travel', icon: '✈️', amount: -720.00, status: 'Completed' },
  { id: 6, date: '2026-03-20', merchant: 'Netflix', category: 'Entertainment', icon: '🎬', amount: -15.99, status: 'Completed' },
  { id: 7, date: '2026-03-19', merchant: 'Whole Foods', category: 'Food', icon: '🍕', amount: -89.40, status: 'Completed' },
  { id: 8, date: '2026-03-18', merchant: 'Freelance Payment', category: 'Income', icon: '💰', amount: 1500.00, status: 'Completed' },
  { id: 9, date: '2026-03-17', merchant: 'Gas Station', category: 'Transport', icon: '⛽', amount: -55.20, status: 'Failed' },
  { id: 10, date: '2026-03-16', merchant: 'Spotify', category: 'Entertainment', icon: '🎵', amount: -9.99, status: 'Completed' },
  { id: 11, date: '2026-03-15', merchant: 'Target', category: 'Shopping', icon: '🛍️', amount: -132.70, status: 'Completed' },
  { id: 13, date: '2026-03-13', merchant: 'Starbucks', category: 'Food', icon: '🍕', amount: -8.50, status: 'Completed' },
  { id: 14, date: '2026-03-12', merchant: 'Apple Store', category: 'Shopping', icon: '🛍️', amount: -999.00, status: 'Completed' },
  { id: 15, date: '2026-03-11', merchant: 'Gym Membership', category: 'Health', icon: '🏋️', amount: -59.99, status: 'Completed' },
  { id: 16, date: '2026-03-10', merchant: 'Dividend Payment', category: 'Income', icon: '💰', amount: 320.00, status: 'Completed' },
  { id: 17, date: '2026-03-09', merchant: 'Uber', category: 'Transport', icon: '🚗', amount: -24.80, status: 'Completed' },
]

const ITEMS_PER_PAGE = 8
const categories = ['All', 'Shopping', 'Food', 'Travel', 'Utilities', 'Income', 'Entertainment', 'Transport', 'Health']

export default function Transactions() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return allTransactions.filter(tx => {
      const matchCat = category === 'All' || tx.category === category
      const matchSearch = tx.merchant.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, category])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)

  const exportCSV = () => {
    const header = 'Date,Merchant,Category,Amount,Status\n'
    const rows = filtered.map(tx => `${tx.date},${tx.merchant},${tx.category},${tx.amount},${tx.status}`).join('\n')
    const blob = new Blob([header + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'transactions.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <Topbar 
          title="Transactions" 
          subtitle="View and manage your recent activity" 
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button className="btn btn-primary btn-sm" onClick={exportCSV}>📥 Export CSV</button>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search transactions..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            id="txn-search"
          />
          <select
            className="category-select"
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1) }}
            id="txn-category"
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="txn-table-wrapper glass-card">
          <table className="txn-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Merchant</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(tx => (
                <tr key={tx.id}>
                  <td className="td-date">{new Date(tx.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="td-merchant"><span className="merchant-icon">{tx.icon}</span>{tx.merchant}</td>
                  <td><span className="cat-tag">{tx.icon} {tx.category}</span></td>
                  <td className={tx.amount > 0 ? 'credit' : 'debit'}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                  </td>
                  <td><span className={`status-badge status-${tx.status.toLowerCase()}`}>{tx.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
            ))}
            <button className="page-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}
      </main>
    </div>
  )
}
