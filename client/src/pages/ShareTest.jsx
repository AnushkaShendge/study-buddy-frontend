import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ShareTest({ onClose }) {
  const [tests, setTests] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const testsRes = await axios.get(`${API_BASE_URL}/api/v1/testseries/get_previous_tests/`, { headers });
        setTests(testsRes.data);
        const usersRes = await axios.get(`${API_BASE_URL}/api/v1/connect/friends/`, { headers });
        setUsers(usersRes.data.friends || []);
      } catch (err) {
        setError('Failed to fetch tests or users.');
      }
    };
    fetchData();
  }, []);

  const handleShare = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const userIds = selectedUsers.map(u => u.id);
      await axios.post(`${API_BASE_URL}/api/v1/testseries/share/${selectedTest}/`, { users: userIds }, { headers });
      setMessage('Test shared successfully!');
    } catch (err) {
      setError('Failed to share test.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Share Test</h2>
        <form onSubmit={handleShare} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Test</label>
            <select
              value={selectedTest}
              onChange={e => setSelectedTest(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select Test --</option>
              {tests.map(test => (
                <option key={test.id} value={test.id}>{test.name || `Test ${test.id}`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Share With</label>
            <div className="flex flex-wrap gap-2">
              {users.map(user => (
                <label key={user.id} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={selectedUsers.some(u => u.id === user.id)}
                    onChange={() => {
                      setSelectedUsers(selectedUsers.some(u => u.id === user.id)
                        ? selectedUsers.filter(u => u.id !== user.id)
                        : [...selectedUsers, user]);
                    }}
                  />
                  {user.username}
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
              {loading ? 'Sharing...' : 'Share'}
            </button>
          </div>
        </form>
        {message && <div className="mt-4 text-green-600 text-center">{message}</div>}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}

export default ShareTest; 