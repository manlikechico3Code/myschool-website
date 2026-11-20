import { useNavigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Font from './components/font'
import Footer from './components/footer'

const App = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-blue-50'>
      <Navbar />
      <Font onApply={() => navigate('/admission')} />
      <Footer />
    </div>
  )
}

export default App
