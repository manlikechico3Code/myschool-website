import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import cssLogo from '../assets/csslogo.jpeg'

const formatDate = (value) => {
  if (!value) {
    return 'Not available'
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Not available'
    : new Intl.DateTimeFormat(undefined, { dateStyle: 'long' }).format(date)
}

function ApplicantDashboard() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('profile')
  const [admission, setAdmission] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let active = true
    let requestInProgress = false

    const loadAdmission = async () => {
      if (requestInProgress) {
        return
      }

      requestInProgress = true
      try {
        const response = await fetch('/api/applicants/me', { cache: 'no-store' })
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
          setError('')
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load your application.')
        }
      } finally {
        requestInProgress = false
        if (active) {
          setIsLoading(false)
        }
      }
    }

    loadAdmission()
    const refreshInterval = window.setInterval(loadAdmission, 3000)
    window.addEventListener('focus', loadAdmission)

    return () => {
      active = false
      window.clearInterval(refreshInterval)
      window.removeEventListener('focus', loadAdmission)
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

  const initials = admission?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
  const firstName = admission?.name?.trim().split(/\s+/)[0] || 'Applicant'

  const sections = [
    { id: 'profile', label: 'Profile' },
    { id: 'exam-slip', label: 'Exam Slip' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'entrance-exam', label: 'Entrance Exam' },
  ]

  return (
    <main className='relative isolate min-h-screen overflow-hidden bg-blue-950 px-6 py-12'>
      <div aria-hidden='true' className='absolute inset-0'>
        <img src={cssLogo} alt='' className='h-full w-full object-cover opacity-25' />
        <div className='absolute inset-0 bg-gradient-to-br from-blue-950/90 via-blue-900/75 to-slate-950/90' />
      </div>

      <div className='relative mx-auto max-w-6xl'>
        <header className='mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/95 p-5 shadow-xl backdrop-blur-md'>
          <p className='text-sm font-bold uppercase tracking-[0.3em] text-blue-700'>
            Applicant portal
          </p>
          <div className='flex items-center gap-3'>
            <Link
              to='/'
              className='rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-50'
            >
              Home
            </Link>
            <button
              type='button'
              onClick={handleLogout}
              className='rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700'
            >
              Sign out
            </button>
          </div>
        </header>

        {isLoading ? (
          <section className='rounded-3xl bg-white/95 p-8 text-slate-700 shadow-xl'>
            Loading your application...
          </section>
        ) : error ? (
          <section role='alert' className='rounded-3xl bg-red-50 p-8 text-sm text-red-700 shadow-xl'>
            {error}
          </section>
        ) : admission ? (
          <div className='grid gap-6 md:grid-cols-[250px_minmax(0,1fr)]'>
            <aside className='h-fit rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-md'>
              <div className='mb-6 flex items-center gap-3 border-b border-blue-100 pb-5'>
                <div
                  aria-label={`${admission.name} profile initials`}
                  className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-800 font-bold text-white'
                >
                  {initials}
                </div>
                <div className='min-w-0'>
                  <p className='truncate font-bold text-blue-950'>{admission.name}</p>
                  <p className='text-xs text-slate-500'>Applicant</p>
                </div>
              </div>
              <nav aria-label='Applicant dashboard sections' className='flex gap-2 overflow-x-auto md:flex-col'>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type='button'
                    aria-current={activeSection === section.id ? 'page' : undefined}
                    onClick={() => setActiveSection(section.id)}
                    className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                      activeSection === section.id
                        ? 'bg-blue-800 text-white shadow'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-800'
                    }`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </aside>

            <section className='min-h-[420px] rounded-3xl border border-white/60 bg-white/95 p-6 shadow-2xl backdrop-blur-md sm:p-8'>
              {activeSection === 'profile' && (
                <>
                  <div className='mb-6 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-5 text-white shadow-lg'>
                    <p className='text-sm font-semibold uppercase tracking-[0.2em] text-blue-100'>
                      Welcome
                    </p>
                    <h1 className='mt-1 text-3xl font-black sm:text-4xl'>
                      {firstName}!
                    </h1>
                  </div>
                  <div className='flex flex-wrap items-start justify-between gap-4 border-b border-blue-100 pb-6'>
                    <div>
                      <h2 className='text-2xl font-black text-blue-950'>My Profile</h2>
                      <p className='mt-2 text-slate-600'>Your submitted application information.</p>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-sm font-bold capitalize ${
                        admission.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : admission.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                      }`}
                      aria-live='polite'
                    >
                      Application {admission.status}
                    </span>
                  </div>

                  {admission.status === 'approved' && (
                    <div className='mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-900'>
                      Your admission has been approved. Welcome to CSS Ukpo!
                    </div>
                  )}

                  <dl className='mt-6 grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-xl border-2 border-blue-200 bg-blue-50/70 p-4'>
                      <dt className='text-sm font-bold uppercase tracking-wide text-blue-800'>
                        Date Submitted
                      </dt>
                      <dd className='mt-2 font-semibold text-slate-900'>
                        {formatDate(admission.createdAt)}
                      </dd>
                    </div>
                    <div className='rounded-xl border-2 border-blue-200 bg-blue-50/70 p-4'>
                      <dt className='text-sm font-bold uppercase tracking-wide text-blue-800'>
                        Date of Exam
                      </dt>
                      <dd className='mt-2 font-semibold text-slate-900'>
                        {admission.examDate ? formatDate(admission.examDate) : 'Not announced'}
                      </dd>
                    </div>
                  </dl>

                  <dl className='mt-6 grid gap-4 sm:grid-cols-2'>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Email</dt>
                      <dd className='mt-1 break-all text-slate-900'>{admission.email}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Phone number</dt>
                      <dd className='mt-1 text-slate-900'>{admission.phone || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Gender</dt>
                      <dd className='mt-1 text-slate-900'>{admission.gender || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>State</dt>
                      <dd className='mt-1 text-slate-900'>{admission.state || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Local government area</dt>
                      <dd className='mt-1 text-slate-900'>{admission.localGovernment || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Parent or guardian</dt>
                      <dd className='mt-1 text-slate-900'>{admission.parentName || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Previous school</dt>
                      <dd className='mt-1 text-slate-900'>{admission.previousSchool || 'Not provided'}</dd>
                    </div>
                    <div className='rounded-xl border border-blue-100 p-4'>
                      <dt className='text-sm font-semibold text-slate-500'>Preferred class</dt>
                      <dd className='mt-1 text-slate-900'>{admission.course || 'Not provided'}</dd>
                    </div>
                    {admission.message && (
                      <div className='rounded-xl border border-blue-100 p-4 sm:col-span-2'>
                        <dt className='text-sm font-semibold text-slate-500'>Message</dt>
                        <dd className='mt-1 whitespace-pre-wrap text-slate-900'>{admission.message}</dd>
                      </div>
                    )}
                  </dl>
                </>
              )}

              {activeSection === 'exam-slip' && (
                <section>
                  <h1 className='text-3xl font-black text-blue-950'>Exam Slip</h1>
                  <p className='mt-2 text-slate-600'>Your application identification details.</p>
                  <dl className='mt-6 grid gap-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-6 sm:grid-cols-2'>
                    <div>
                      <dt className='text-sm font-semibold text-slate-500'>Applicant name</dt>
                      <dd className='mt-1 font-semibold text-slate-900'>{admission.name}</dd>
                    </div>
                    <div>
                      <dt className='text-sm font-semibold text-slate-500'>Preferred class</dt>
                      <dd className='mt-1 font-semibold text-slate-900'>{admission.course}</dd>
                    </div>
                    <div>
                      <dt className='text-sm font-semibold text-slate-500'>Application reference</dt>
                      <dd className='mt-1 break-all font-mono text-sm text-slate-900'>{admission.id}</dd>
                    </div>
                    <div>
                      <dt className='text-sm font-semibold text-slate-500'>Application status</dt>
                      <dd className='mt-1 capitalize text-slate-900'>{admission.status}</dd>
                    </div>
                  </dl>
                  <p className='mt-5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900'>
                    Exam date, venue, and seat details will appear here when they are issued by the school.
                  </p>
                </section>
              )}

              {activeSection === 'notifications' && (
                <section>
                  <h1 className='text-3xl font-black text-blue-950'>Notifications</h1>
                  <article className='mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5'>
                    <p className='text-sm font-semibold uppercase tracking-wide text-blue-700'>
                      Application update
                    </p>
                    <p className='mt-2 font-semibold text-blue-950'>
                      {admission.status === 'approved'
                        ? 'Your admission application has been approved.'
                        : admission.status === 'rejected'
                          ? 'Your admission application has been declined.'
                          : 'Your application has been received and is awaiting review.'}
                    </p>
                    <p className='mt-2 text-sm text-slate-600'>
                      This notice updates automatically when the school changes your application status.
                    </p>
                  </article>
                </section>
              )}

              {activeSection === 'entrance-exam' && (
                <section>
                  <h1 className='text-3xl font-black text-blue-950'>Entrance Exam</h1>
                  <p className='mt-2 text-slate-600'>Information about your entrance examination.</p>
                  <div className='mt-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-6'>
                    <p className='font-semibold text-blue-950'>Exam details are not available yet.</p>
                    <p className='mt-2 text-slate-600'>
                      The school will publish your exam date, time, and venue here when they are confirmed.
                    </p>
                  </div>
                </section>
              )}
            </section>
          </div>
        ) : (
          <section className='rounded-3xl border border-white/60 bg-white/95 p-8 shadow-xl'>
            <h1 className='mt-3 text-3xl font-black text-blue-900'>
              No application details
            </h1>
            <p className='mt-3 text-slate-700'>
              Submit an application to view its confirmation here.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}

export default ApplicantDashboard
