import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Admin.css'

const Dashboard = () => {
  const [counts, setCounts] = useState({ admissions: 0, students: 0, pending: 0 })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const response = await fetch('/api/admissions')
        const admissions = await response.json()

        if (!response.ok) {
          throw new Error(admissions.message || 'Unable to load admission counts.')
        }

        setCounts({
          admissions: admissions.length,
          students: admissions.filter((admission) => admission.status === 'approved').length,
          pending: admissions.filter((admission) => admission.status === 'pending').length,
        })
      } catch (loadError) {
        setError(loadError.message || 'Unable to load admission counts.')
      } finally {
        setIsLoading(false)
      }
    }

    loadCounts()
  }, [])

  return (
    <div>
      <h1 className='text-3xl font-bold text-blue-950'>Dashboard</h1>
      <p className='mt-2 text-slate-600'>Admission and student overview.</p>

      <section className='mt-6 flex flex-col gap-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-lg font-bold text-blue-950'>Admission schedule</h2>
          <p className='mt-1 text-sm text-slate-600'>
            Set when the public admission link opens and closes.
          </p>
        </div>
        <Link
          to='/admin/admissions-window'
          className='inline-flex justify-center rounded-xl bg-blue-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700'
        >
          Set Admission Dates
        </Link>
      </section>

      {error && (
        <p role='alert' className='mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700'>
          {error}
        </p>
      )}

      <section className='dashboard-cards' aria-label='School totals'>
        <article className='dash-card'>
          <h3>Total Admissions</h3>
          <p aria-live='polite'>{isLoading ? '—' : counts.admissions}</p>
          <span className='mt-2 block text-sm text-slate-500'>Applications received</span>
        </article>

        <article className='dash-card'>
          <h3>Total Students</h3>
          <p aria-live='polite'>{isLoading ? '—' : counts.students}</p>
          <span className='mt-2 block text-sm text-slate-500'>Approved applications</span>
        </article>

        <article className='dash-card'>
          <h3>Pending Applications</h3>
          <p aria-live='polite'>{isLoading ? '—' : counts.pending}</p>
          <span className='mt-2 block text-sm text-slate-500'>Awaiting approval or rejection</span>
        </article>
      </section>
    </div>
  )
}

export default Dashboard
