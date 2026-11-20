import React, { useState } from 'react'
import Navbar from './components/navbar'
import Font from './components/font'
import Footer from './components/footer'
import Admission from './components/admission'

const App = () => {
  const [Theme, setTheme] = useState('light')
  const [showAdmission, setShowAdmission] = useState(false)

  return (
    <div className={Theme === 'dark' ? 'dark min-h-screen bg-slate-900' : 'min-h-screen bg-blue-50'}>
      <Navbar Theme={Theme} setTheme={setTheme} onOpenAdmission={() => setShowAdmission(true)} />

      {showAdmission ? (
        <Admission onBack={() => setShowAdmission(false)} />
      ) : (
        <>
          <Font onApply={() => setShowAdmission(true)} />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
