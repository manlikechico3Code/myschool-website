import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLayout from './admin/adminLayout.jsx'
import Dashboard from './admin/Dashboard.jsx'
import Approvals from './admin/Approvals.jsx'
import Manage from './admin/Manage.jsx'
import ProtectedRoute from './admin/ProctectedRoute.jsx'
import ApplicantDashboard from './applicant/ApplicantDashboard.jsx'
import ApplicantLogin from './applicant/ApplicantLogin.jsx'
import SignIn from './auth/SignIn.jsx'
import AdmissionsWindow from './admin/AdmissionsWindow.jsx'
import PublicAdmission from './components/PublicAdmission.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/admission' element={<PublicAdmission />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/applicant/login' element={<ApplicantLogin />} />
        <Route path='/applicant/dashboard' element={<ApplicantDashboard />} />
        <Route path='/admin/login' element={<SignIn />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/admin' element={<AdminLayout />}>
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='approvals' element={<Approvals />} />
            <Route path='manage' element={<Manage />} />
            <Route path='admissions-window' element={<AdmissionsWindow />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
