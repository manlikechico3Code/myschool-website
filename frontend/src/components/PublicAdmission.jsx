import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Admission from './admission'

const formatDate = (date) => new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long',
  timeStyle: 'short',
}).format(new Date(date))

function PublicAdmission() {
  const navigate = useNavigate()
  const [windowStatus, setWindowStatus] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    let requestInProgress = false

    const loadWindow = async () => {
      if (requestInProgress) {
        return
      }
      requestInProgress = true

      try {
        const response = await fetch('/api/admissions/window', { cache: 'no-store' })
        const contentType = response.headers.get('content-type') || ''
        if (!contentType.includes('application/json')) {
          throw new Error(
            'The admissions service is unavailable. Restart the backend and try again.',
          )
        }
        const result = await response.json()
        if (!response.ok) {
          throw new Error(result.message || 'Unable to check admission dates.')
        }
        if (active) {
          setWindowStatus(result)
          setError('')
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to check admission dates.')
        }
      } finally {
        requestInProgress = false
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadWindow()
    const interval = window.setInterval(loadWindow, 30000)
    window.addEventListener('focus', loadWindow)

    return () => {
      active = false
      window.clearInterval(interval)
      window.removeEventListener('focus', loadWindow)
    }
  }, [])

  if (isLoading) {
    return <main className='min-h-screen bg-blue-50 px-6 py-16 text-center text-blue-950'>Checking admission dates...</main>
  }

  if (error) {
    return (
      <main className='min-h-screen bg-blue-50 px-6 py-16'>
        <section role='alert' className='mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-8 text-red-700 shadow'>
          {error}
        </section>
      </main>
    )
  }

  if (windowStatus?.isOpen) {
    return (
      <>
        <div className='bg-blue-800 px-6 py-3 text-center text-sm font-semibold text-white'>
          Applications close {formatDate(windowStatus.closesAt)}.
        </div>
        <Admission onBack={() => navigate('/')} />
      </>
    )
  }

  return (
    <main className='min-h-screen bg-blue-50 px-6 py-16'>
      <section className='mx-auto max-w-2xl rounded-3xl border border-blue-200 bg-white p-8 text-center shadow-xl'>
        <p className='text-sm font-bold uppercase tracking-[0.3em] text-blue-700'>Admissions</p>
        <h1 className='mt-3 text-3xl font-black text-blue-950'>Applications are closed</h1>
        <p className='mt-4 text-slate-600'>
          The application form is unavailable right now. Please check back during the next admission period.
        </p>
        {windowStatus?.isUpcoming && windowStatus.opensAt && (
          <p className='mt-4 font-semibold text-blue-800'>
            Applications open {formatDate(windowStatus.opensAt)}.
          </p>
        )}
        <button
          type='button'
          onClick={() => navigate('/')}
          className='mt-8 rounded-xl bg-blue-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-800'
        >
          Return to home
        </button>
      </section>
    </main>
  )
}

export default PublicAdmission
