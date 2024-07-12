import './App.css'
import {Routes , Route} from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ChatPDF from './pages/ChatPdf'
import { useContext } from 'react'
import { UserContext, UserContextProvider } from './UserContext'
import { Navigate } from 'react-router-dom'


function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
        <Route
          path="/dashboard/pdf"
          element={ <ChatPDF />}
        />
      </Routes>
    </UserContextProvider>
  )
}

export default App
