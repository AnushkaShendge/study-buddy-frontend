import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function MeetingManager() {
  const [meetings, setMeetings] = useState([]);
  const [joined, setJoined] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${API_BASE_URL}/api/v1/connect/meeting/`, { headers });
        setMeetings(res.data.meetings || []);
      } catch (err) {
        setError('Failed to fetch meetings.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  const handleJoin = async (meetingId) => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${API_BASE_URL}/api/v1/connect/joinmeet/`, { headers, params: { meeting_id: meetingId } });
      setJoined(res.data);
    } catch (err) {
      setError('Failed to join meeting.');
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Meetings</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {loading ? <div className="text-center">Loading...</div> : (
        <div className="space-y-4">
          {meetings.length === 0 ? <div className="text-gray-500">No meetings found.</div> : (
            meetings.map(m => (
              <div key={m.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-bold">{m.title || `Meeting ${m.id}`}</div>
                  <div className="text-sm text-gray-600">{m.time}</div>
                </div>
                <button onClick={() => handleJoin(m.id)} className="px-4 py-2 bg-blue-600 text-white rounded">Join</button>
              </div>
            ))
          )}
        </div>
      )}
      {joined && (
        <div className="mt-8 p-4 bg-green-100 rounded">
          <div className="font-bold">Joined Meeting:</div>
          <div>{JSON.stringify(joined)}</div>
        </div>
      )}
    </div>
  );
}

export default MeetingManager; 