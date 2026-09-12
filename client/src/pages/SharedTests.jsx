import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function SharedTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchShared = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${API_BASE_URL}/api/v1/testseries/shared/`, { headers });
        setTests(res.data);
      } catch (err) {
        setError('Failed to fetch shared tests.');
      } finally {
        setLoading(false);
      }
    };
    fetchShared();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Shared Tests</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tests.length === 0 ? (
            <div className="text-gray-500">No shared tests found.</div>
          ) : (
            tests.map((test, idx) => (
              <div key={idx} className="bg-white p-4 rounded shadow">
                <div className="font-bold">{test.name || `Test ${test.id}`}</div>
                <div className="text-sm text-gray-600">Shared by: {test.shared_by?.username || 'Unknown'}</div>
                <div className="text-sm">Created at: {test.created_at}</div>
                <div className="text-sm">Score: {test.score}</div>
                {/* Add more test details as needed */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SharedTests; 