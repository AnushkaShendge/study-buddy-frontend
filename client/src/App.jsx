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
import Chat from './pages/Chat';
import Notes from './pages/Notes';
import Test from './pages/Test';
import TestGenerate from './pages/TestGenerate';
import Resource from './pages/Resource';
import ShareTest from './pages/ShareTest';
import SharedTests from './pages/SharedTests';
import ResourceAdmin from './pages/ResourceAdmin';
import PDFManager from './pages/PDFManager';
import AdminAnalytics from './pages/AdminAnalytics';
import MeetingManager from './pages/MeetingManager';
import ErrorBoundary from './pages/ErrorBoundary';
import NotFound from './pages/NotFound';
import ResourceList from './pages/ResourceList';
import ChatHistory from './pages/ChatHistory';

function App() {
  const { user, ready } = useContext(UserContext);

  const isAdmin = user && user.is_admin;

  if (!ready) {
    return <div className='flex items-center w-full h-full justify-center gap-2 text-lg'><ImSpinner3 className='text-lg' />Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to='/' replace />} />
        <Route path="/dashboard/pdf" element={user ? <ChatPDF /> : <Navigate to='/' replace />} />
        <Route path="/practice-dost" element={user ? <Practice /> : <Navigate to='/' replace />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to='/' replace />} />
        <Route path="/connect" element={user ? <Connect /> : <Navigate to='/' replace />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to='/' replace />} />
        <Route path="/notes" element={user ? <Notes /> : <Navigate to='/' replace />} />
        <Route path="/test" element={user ? <Test /> : <Navigate to='/' replace />} />
        <Route path="/gentest" element={user ? <TestGenerate /> : <Navigate to='/' replace />} />
        <Route path="/resource" element={user ? <Resource /> : <Navigate to='/' replace />} />
        <Route path="/share-test" element={user ? <ShareTest /> : <Navigate to='/' replace />} />
        <Route path="/shared-tests" element={user ? <SharedTests /> : <Navigate to='/' replace />} />
        <Route path="/resource-admin" element={isAdmin ? <ResourceAdmin /> : <Navigate to='/' replace />} />
        <Route path="/pdf-manager" element={user ? <PDFManager /> : <Navigate to='/' replace />} />
        <Route path="/admin-analytics" element={isAdmin ? <AdminAnalytics /> : <Navigate to='/' replace />} />
        <Route path="/meetings" element={user ? <MeetingManager /> : <Navigate to='/' replace />} />
        <Route path="/resources-list" element={user ? <ResourceList /> : <Navigate to='/' replace />} />
        <Route path="/chat-history/:username" element={user ? <ChatHistory /> : <Navigate to='/' replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
