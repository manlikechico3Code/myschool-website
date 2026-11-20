import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import './Admin.css'

function AdminLayout() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
    } finally {
      localStorage.removeItem('isAdmin')
      navigate('/signin')
    }
  }

  return (
    <div className='admin-layout'>
      <aside className='admin-sidebar'>
        <h2>Admin Panel</h2>
        <NavLink to='/admin/dashboard'>Dashboard</NavLink>
        <NavLink to='/admin/approvals'>Approvals</NavLink>
        <NavLink to='/admin/manage'>Manage</NavLink>
        <NavLink to='/admin/admissions-window'>Admission Window</NavLink>

        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className='admin-content'>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
