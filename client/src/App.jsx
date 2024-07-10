import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ChatPDF from './pages/ChatPdf'
import { useContext } from 'react'
import { UserContext } from './UserContext'


function App() {
  const {ready} = useContext(UserContext)

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/dashboard' element={ready ? <Dashboard /> : <Login />} />
      <Route path='/dashboard/pdf' element={ready ? <ChatPDF />  : <Login />} />
    </Routes>
  )
}

export default App
