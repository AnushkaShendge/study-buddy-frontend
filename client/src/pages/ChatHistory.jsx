import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

function ChatHistory() {
  const { username } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChat = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${API_BASE_URL}/api/v1/connect/chat/${username}/`, { headers });
        setMessages(res.data);
      } catch (err) {
        setError('Failed to fetch chat history.');
      } finally {
        setLoading(false);
      }
    };
    if (username) fetchChat();
  }, [username]);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Chat with {username}</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {loading ? <div className="text-center">Loading...</div> : (
        <div className="bg-white rounded shadow p-4 h-96 overflow-y-auto">
          {messages.length === 0 ? <div className="text-gray-500">No messages found.</div> : (
            messages.map((msg, idx) => (
              <div key={idx} className={`mb-2 ${msg.is_self ? 'text-right' : 'text-left'}`}>
                <span className="inline-block px-2 py-1 rounded bg-gray-200">{msg.content}</span>
                <div className="text-xs text-gray-500">{msg.timestamp}</div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ChatHistory; 