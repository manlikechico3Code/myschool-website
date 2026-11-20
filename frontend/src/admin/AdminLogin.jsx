import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()

    const adminEmail = 'manlikechicoc300@gmail.com'
    const adminPassword = '123456'

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin/dashboard')
      return
    }

    alert('Wrong email or password')
  }

  return (
    <div className='login-page'>
      <form className='login-box' onSubmit={handleLogin}>
        <h2>Admin Login</h2>
        <p>Sign in to access your dashboard</p>

        <label>Email</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='admin@gmail.com'
        />

        <label>Password</label>
        <div style={{ position: 'relative' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='123456'
            style={{ width: '100%', boxSizing: 'border-box', paddingRight: '52px' }}
          />
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              border: 'none',
              background: 'transparent',
              color: '#2563eb',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type='submit' className='login-btn'>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin
