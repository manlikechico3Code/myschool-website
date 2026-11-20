import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cssLogo from '../assets/csslogo.jpeg'
import localGovernmentsByState from '../data/nigerianLocalGovernments'

const nigerianStates = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
]

const Admission = ({ onBack }) => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
    localGovernment: '',
    gender: 'Male',
    parentName: '',
    previousSchool: '',
    preferredClass: 'JSS 1',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { localGovernment: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch('/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          state: formData.state,
          localGovernment: formData.localGovernment,
          gender: formData.gender,
          parentName: formData.parentName,
          previousSchool: formData.previousSchool,
          course: formData.preferredClass,
          message: formData.message,
        }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit admission.')
      }

      navigate('/applicant/dashboard', {
        state: { admission: result.admission },
      })
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit admission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className='relative overflow-hidden bg-blue-50 px-6 py-12'>
      <div className='absolute inset-0 opacity-10'>
        <img src={cssLogo} alt='School logo background' className='h-full w-full object-cover' />
      </div>

      <div className='relative mx-auto max-w-5xl rounded-3xl border border-blue-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm md:p-10'>
        <div className='mb-8 text-center'>
          <p className='text-sm font-bold uppercase tracking-[0.35em] text-blue-700'>Admission</p>
          <h1 className='mt-3 text-4xl font-black uppercase leading-tight text-blue-900 md:text-5xl'>Apply for Admission</h1>
        </div>

        <form className='grid gap-6 md:grid-cols-2' onSubmit={handleSubmit}>
          {submitError && (
            <p className='md:col-span-2 rounded-xl bg-red-50 p-3 text-sm text-red-700' role='alert'>
              {submitError}
            </p>
          )}
          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>First Name</label>
            <input name='firstName' value={formData.firstName} onChange={handleChange} type='text' placeholder='Enter your first name' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Last Name</label>
            <input name='lastName' value={formData.lastName} onChange={handleChange} type='text' placeholder='Enter your last name' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Email Address</label>
            <input name='email' value={formData.email} onChange={handleChange} type='email' placeholder='your@email.com' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Password</label>
            <input name='password' value={formData.password} onChange={handleChange} type='password' minLength={8} placeholder='Create a password (at least 8 characters)' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Confirm Password</label>
            <input name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} type='password' minLength={8} placeholder='Confirm your password' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Phone Number</label>
            <input name='phone' value={formData.phone} onChange={handleChange} type='tel' placeholder='Enter your phone number' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>State</label>
            <select name='state' value={formData.state} onChange={handleChange} className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none focus:border-blue-600' required>
              <option value=''>Select your state</option>
              {nigerianStates.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Local Government Area</label>
            <select name='localGovernment' value={formData.localGovernment} onChange={handleChange} className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none focus:border-blue-600' disabled={!formData.state} required>
              <option value=''>{formData.state ? 'Select your local government area' : 'Select your state first'}</option>
              {(localGovernmentsByState[formData.state] || []).map((area) => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Gender</label>
            <select name='gender' value={formData.gender} onChange={handleChange} className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none focus:border-blue-600'>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Parent Name</label>
            <input name='parentName' value={formData.parentName} onChange={handleChange} type='text' placeholder='Enter parent or guardian name' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' required />
          </div>

          <div>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Previous School</label>
            <input name='previousSchool' value={formData.previousSchool} onChange={handleChange} type='text' placeholder='Enter previous school name (optional)' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' />
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Preferred Class</label>
            <select name='preferredClass' value={formData.preferredClass} onChange={handleChange} className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none focus:border-blue-600'>
              <optgroup label='Junior Class'>
                <option>JSS 1</option>
                <option>JSS 2</option>
                <option>JSS 3</option>
              </optgroup>
              <optgroup label='Senior Class'>
                <option>SS 1</option>
                <option>SS 2</option>
                <option>SS 3</option>
              </optgroup>
            </select>
          </div>

          <div className='md:col-span-2'>
            <label className='mb-2 block text-sm font-bold uppercase tracking-wide text-blue-900'>Message</label>
            <textarea name='message' value={formData.message} onChange={handleChange} rows='4' placeholder='Tell us a little about yourself or why you want to join our school' className='w-full rounded-xl border border-blue-200 bg-white px-4 py-3 text-blue-900 outline-none ring-0 placeholder:text-slate-400 focus:border-blue-600' />
          </div>

          <div className='md:col-span-2 flex flex-col gap-4 pt-4 sm:flex-row sm:justify-between'>
            <button
              type='button'
              onClick={onBack}
              className='rounded-xl border border-blue-700 bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-blue-800 transition hover:bg-blue-50'
            >
              Back to Home
            </button>

            <button
              type='submit'
              disabled={isSubmitting}
              className='rounded-xl bg-blue-900 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-blue-800'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Admission'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Admission
