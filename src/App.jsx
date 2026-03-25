import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Background from './components/Background'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Cards from './pages/Cards'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import SendMoney from './pages/SendMoney'
import PayBill from './pages/PayBill'
import AddCard from './pages/AddCard'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/send-money" element={<SendMoney />} />
      <Route path="/pay-bill" element={<PayBill />} />
      <Route path="/add-card" element={<AddCard />} />
    </Routes>
  )
}
