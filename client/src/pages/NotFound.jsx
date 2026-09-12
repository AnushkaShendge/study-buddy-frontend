import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-4xl font-bold mb-4 text-red-600">404</h2>
        <p className="mb-4">Page not found.</p>
        <button onClick={() => navigate('/')} className="px-4 py-2 bg-blue-600 text-white rounded">Go Home</button>
      </div>
    </div>
  );
}

export default NotFound; 