import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cssLogo from '../assets/csslogo.jpeg'

function ApplicantDashboard() {
  const navigate = useNavigate()
  const [admission, setAdmission] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true

    const loadAdmission = async () => {
      try {
        const response = await fetch('/api/applicants/me')
        const result = await response.json()

        if (response.status === 401) {
          navigate('/applicant/login', { replace: true })
          return
        }
        if (!response.ok) {
          throw new Error(result.message || 'Unable to load your application.')
        }
        if (active) {
          setAdmission(result.admission)
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load your application.')
        }
      } finally {
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadAdmission()
    return () => {
      active = false
    }
  }, [navigate])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/applicants/logout', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Unable to sign out. Please try again.')
      }
      navigate('/applicant/login', { replace: true })
    } catch (logoutError) {
      setError(logoutError.message)
    }
  }

  return (
    <main className='relative isolate min-h-screen overflow-hidden bg-blue-950 px-6 py-12'>
      <div aria-hidden='true' className='absolute inset-0'>
        <img src={cssLogo} alt='' className='h-full w-full object-cover opacity-25' />
        <div className='absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/75 to-slate-950/90' />
      </div>

      <section className='relative mx-auto max-w-3xl rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl backdrop-blur-md'>
        <div className='flex items-center justify-between gap-4'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-blue-700'>
            Applicant portal
          </p>
          <button
            type='button'
            onClick={handleLogout}
            className='rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-50'
          >
            Sign out
          </button>
        </div>

        {isLoading ? (
          <p className='mt-6 text-slate-700'>Loading your application...</p>
        ) : error ? (
          <p role='alert' className='mt-6 rounded-xl bg-red-50 p-3 text-sm text-red-700'>
            {error}
          </p>
        ) : admission ? (
          <>
            <h1 className='mt-3 text-3xl font-black text-blue-900'>
              Application submitted
            </h1>
            <p className='mt-3 text-slate-700'>
              Thank you, {admission.name}. Your application has been received.
            </p>

            <dl className='mt-8 grid gap-4 sm:grid-cols-2'>
              <div>
                <dt className='font-semibold text-slate-600'>Course</dt>
                <dd className='text-slate-900'>{admission.course}</dd>
              </div>
              <div>
                <dt className='font-semibold text-slate-600'>Application status</dt>
                <dd className='capitalize text-slate-900'>{admission.status}</dd>
              </div>
              <div>
                <dt className='font-semibold text-slate-600'>Applicant email</dt>
                <dd className='break-all text-slate-900'>{admission.email}</dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <h1 className='mt-3 text-3xl font-black text-blue-900'>
              No application details
            </h1>
            <p className='mt-3 text-slate-700'>
              Submit an application to view its confirmation here.
            </p>
          </>
        )}

        <Link
          to='/'
          className='mt-8 inline-flex rounded-xl bg-blue-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-800'
        >
          Return to home
        </Link>
      </section>
    </main>
  )
}

export default ApplicantDashboard
