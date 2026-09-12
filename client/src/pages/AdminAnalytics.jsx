import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function AdminAnalytics() {
  const [roleCounts, setRoleCounts] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [recentSignups, setRecentSignups] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const [rolesRes, activeRes, signupRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/v1/auth/admin/role-counts/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/auth/admin/active-users/`, { headers }),
          axios.get(`${API_BASE_URL}/api/v1/auth/admin/recent-signups/`, { headers })
        ]);
        setRoleCounts(rolesRes.data);
        setActiveUsers(activeRes.data);
        setRecentSignups(signupRes.data);
      } catch (err) {
        setError('Failed to fetch admin analytics.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Analytics</h2>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded shadow">
              <div className="font-bold mb-2">Role Counts</div>
              {roleCounts ? (
                <ul>
                  {Object.entries(roleCounts).map(([role, count]) => (
                    <li key={role}>{role}: {count}</li>
                  ))}
                </ul>
              ) : <div>No data</div>}
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="font-bold mb-2">Active Users</div>
              <ul>
                {activeUsers.map(u => (
                  <li key={u.id}>{u.username} ({u.email})</li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <div className="font-bold mb-2">Recent Signups</div>
              <ul>
                {recentSignups.map(u => (
                  <li key={u.id}>{u.username} ({u.email})</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminAnalytics; 