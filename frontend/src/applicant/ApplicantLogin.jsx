import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cssLogo from '../assets/csslogo.jpeg'

function ApplicantLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/applicants/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const contentType = response.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error(
          'The applicant login API is unavailable. Restart the backend and try again.',
        )
      }

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Unable to sign in.')
      }
      navigate('/applicant/dashboard', { replace: true })
    } catch (loginError) {
      setError(loginError.message || 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className='relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-blue-950 px-6 py-12'>
      <div aria-hidden='true' className='absolute inset-0'>
        <img src={cssLogo} alt='' className='h-full w-full object-cover opacity-25' />
        <div className='absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/75 to-slate-950/90' />
      </div>

      <form
        onSubmit={handleSubmit}
        className='relative w-full max-w-md rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl backdrop-blur-md'
      >
        <p className='text-sm font-bold uppercase tracking-[0.3em] text-blue-700'>
          Applicant portal
        </p>
        <h1 className='mt-3 text-3xl font-black text-blue-950'>Sign in</h1>
        <p className='mt-2 text-slate-600'>
          Use the email and password you created with your application.
        </p>

        {error && (
          <p role='alert' className='mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700'>
            {error}
          </p>
        )}

        <label htmlFor='applicant-email' className='mt-6 block text-sm font-semibold text-slate-700'>
          Email
        </label>
        <input
          id='applicant-email'
          type='email'
          autoComplete='email'
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className='mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
        />

        <label htmlFor='applicant-password' className='mt-5 block text-sm font-semibold text-slate-700'>
          Password
        </label>
        <input
          id='applicant-password'
          type='password'
          autoComplete='current-password'
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className='mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
        />

        <button
          type='submit'
          disabled={isSubmitting}
          className='mt-7 w-full rounded-xl bg-blue-800 px-6 py-3 font-bold uppercase tracking-wide text-white transition hover:bg-blue-700 disabled:cursor-wait disabled:opacity-60'
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>

        <p className='mt-6 text-center text-sm text-slate-600'>
          Need to apply?{' '}
          <Link to='/' className='font-semibold text-blue-700 hover:text-blue-900'>
            Go to the school website
          </Link>
        </p>
      </form>
    </main>
  )
}

export default ApplicantLogin
