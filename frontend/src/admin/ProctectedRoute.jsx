import { Navigate, Outlet } from 'react-router-dom'

function ProctectedRoute() {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  if (!isAdmin) {
    return <Navigate to='/admin/login' replace />
  }

  return <Outlet />
}

export default ProctectedRoute
