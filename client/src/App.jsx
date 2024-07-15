import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatPDF from './pages/ChatPdf';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import Practice from './pages/Practice';
import { ImSpinner3 } from "react-icons/im";
import Profile from './pages/Profile';
import Connect from './pages/Connect';

function App() {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return <div className='flex items-center w-full h-full justify-center gap-2 text-lg'><ImSpinner3 className='text-lg' />Loading...</div>;
  }

  return (
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/' replace />} />
        <Route path="/dashboard/pdf" element={user ? <ChatPDF /> : <Navigate to='/' replace />} />
        <Route path="/practice-dost" element={user ? <Practice /> : <Navigate to='/' replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to='/' replace />} />
        <Route path="/connect" element={user ? <Connect /> : <Navigate to='/' replace />} />
      </Routes>
  );
}

export default App;
