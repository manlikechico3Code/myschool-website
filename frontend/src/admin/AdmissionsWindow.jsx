import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

const toLocalDateTime = (value) => {
  if (!value) {
    return ''
  }
  const date = new Date(value)
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16)
}

function AdmissionsWindow() {
  const navigate = useNavigate()
  const [opensAt, setOpensAt] = useState('')
  const [closesAt, setClosesAt] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await fetch('/api/admin/admissions-window')
        const result = await response.json()

        if (response.status === 401) {
          navigate('/signin', { replace: true })
          return
        }
        if (!response.ok) {
          throw new Error(result.message || 'Unable to load admission settings.')
        }

        setOpensAt(toLocalDateTime(result.opensAt))
        setClosesAt(toLocalDateTime(result.closesAt))
      } catch (loadError) {
        setError(loadError.message || 'Unable to load admission settings.')
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setNotice('')
    setIsSaving(true)

    try {
      const response = await fetch('/api/admin/admissions-window', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          opensAt: new Date(opensAt).toISOString(),
          closesAt: new Date(closesAt).toISOString(),
        }),
      })
      const result = await response.json()

      if (response.status === 401) {
        navigate('/signin', { replace: true })
        return
      }
      if (!response.ok) {
        throw new Error(result.message || 'Unable to save admission dates.')
      }

      setOpensAt(toLocalDateTime(result.opensAt))
      setClosesAt(toLocalDateTime(result.closesAt))
      setNotice(result.message)
    } catch (saveError) {
      setError(saveError.message || 'Unable to save admission dates.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <section className='max-w-3xl'>
      <h1 className='text-3xl font-bold text-blue-950'>Admission Window</h1>
      <p className='mt-2 text-slate-600'>
        Set when the public admission form opens and closes. Outside this period,
        applicants cannot submit the form.
      </p>

      {error && (
        <p role='alert' className='mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700'>
          {error}
        </p>
      )}
      {notice && (
        <p role='status' className='mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800'>
          {notice}
        </p>
      )}

      <form onSubmit={handleSubmit} className='mt-8 grid gap-6 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm'>
        <div>
          <label htmlFor='admissions-opens-at' className='block text-sm font-semibold text-slate-700'>
            Opening date and time
          </label>
          <input
            id='admissions-opens-at'
            type='datetime-local'
            required
            disabled={isLoading || isSaving}
            value={opensAt}
            onChange={(event) => setOpensAt(event.target.value)}
            className='mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100'
          />
        </div>

        <div>
          <label htmlFor='admissions-closes-at' className='block text-sm font-semibold text-slate-700'>
            Closing date and time
          </label>
          <input
            id='admissions-closes-at'
            type='datetime-local'
            required
            disabled={isLoading || isSaving}
            value={closesAt}
            onChange={(event) => setClosesAt(event.target.value)}
            className='mt-2 w-full rounded-xl border border-blue-200 px-4 py-3 text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100'
          />
        </div>

        <p className='text-sm text-slate-500'>
          Dates use this device’s local time. The closing time is exclusive: applications stop at that time.
        </p>

        <button
          type='submit'
          disabled={isLoading || isSaving || !opensAt || !closesAt}
          className='rounded-xl bg-blue-800 px-6 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60'
        >
          {isSaving ? 'Saving...' : 'Save admission dates'}
        </button>
      </form>
    </section>
  )
}

export default AdmissionsWindow
