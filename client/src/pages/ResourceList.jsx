import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ResourceList() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };
        const res = await axios.get(`${API_BASE_URL}/api/v1/resources/`, { headers });
        setResources(res.data);
      } catch (err) {
        setError('Failed to fetch resources.');
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDownload = url => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Resources</h2>
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {loading ? <div className="text-center">Loading...</div> : (
        <div className="grid grid-cols-1 gap-4">
          {resources.length === 0 ? <div className="text-gray-500">No resources found.</div> : (
            resources.map(r => (
              <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-bold">{r.title}</div>
                  <div className="text-sm text-gray-600">{r.url}</div>
                  <div className="text-sm">Type: {r.resource_type}</div>
                </div>
                {r.resource_type === 'pdf' && r.pdf_file && (
                  <button onClick={() => handleDownload(r.pdf_file)} className="px-3 py-1 bg-blue-500 text-white rounded">Download</button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ResourceList; 