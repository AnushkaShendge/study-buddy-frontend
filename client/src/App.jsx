import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ChatPDF from './pages/ChatPdf';
import { useContext } from 'react';
import { UserContext, UserContextProvider } from './UserContext';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <PrivateRoute path="/dashboard" element={<Dashboard />} />
        <PrivateRoute path="/dashboard/pdf" element={<ChatPDF />} />
      </Routes>
    </UserContextProvider>
  );
}
function PrivateRoute({ element }) {
  const { user } = useContext(UserContext);

  return user ? element : <Navigate to="/" replace />;
}

export default App;
