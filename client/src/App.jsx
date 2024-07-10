import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ChatPDF from './pages/ChatPdf'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8000'
axios.defaults.withCredentials = true;

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/dashboard/pdf' element={<ChatPDF />} />
    </Routes>
  )
}

export default App
