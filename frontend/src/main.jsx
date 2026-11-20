import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLayout from './admin/adminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Approvals from './admin/Approvals.jsx'
import Manage from './admin/Manage.jsx'
import AdminLogin from './admin/AdminLogin.jsx'
import ProtectedRoute from './admin/ProctectedRoute.jsx'
import ApplicantDashboard from './applicant/ApplicantDashboard.jsx'
import ApplicantLogin from './applicant/ApplicantLogin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/applicant/login' element={<ApplicantLogin />} />
        <Route path='/applicant/dashboard' element={<ApplicantDashboard />} />
        <Route path='/admin/login' element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='approvals' element={<Approvals />} />
            <Route path='manage' element={<Manage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
