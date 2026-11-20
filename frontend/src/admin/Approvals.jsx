import { useState, useEffect } from 'react'
import './Admin.css'

function Approvals() {
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStudents = async () => {
      try {
        const response = await fetch('/api/admissions')
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data.message || 'Unable to load admissions.')
        }
        setStudents(data)
      } catch (loadError) {
        setError(loadError.message || 'Unable to load admissions.')
      } finally {
        setIsLoading(false)
      }
    }

    loadStudents()
  }, [])

  const updateStatus = async (id, newStatus) => {
    setError('')
    try {
      const response = await fetch(`/api/admissions/${encodeURIComponent(id)}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Unable to update admission status.')
      }

      setStudents((current) =>
        current.map((student) => (student.id === result.id ? result : student)),
      )
    } catch (updateError) {
      setError(updateError.message || 'Unable to update admission status.')
    }
  }

  return (
    <div>
      <h1>Approvals</h1>
      <p>Total: {students.length}</p>
      {error && <p role='alert'>{error}</p>}
      {isLoading && <p>Loading admissions...</p>}

      {!isLoading && students.length === 0 && <p>No admissions yet. Go to the public admission form and submit one.</p>}

      {students.map((student) => (
        <div key={student.id} style={{ background: 'white', padding: '15px', borderRadius: '10px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <b>{student.name}</b> - {student.course}
            <br />
            <small>{student.phone} | State: {student.state || 'Not provided'} | LGA: {student.localGovernment || 'Not provided'} | Status: {student.status}</small>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => updateStatus(student.id, 'approved')} style={{ background: 'green', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>Approve</button>
            <button onClick={() => updateStatus(student.id, 'rejected')} style={{ background: 'red', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px' }}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Approvals
