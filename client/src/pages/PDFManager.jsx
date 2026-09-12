import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function PDFManager() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const fetchPDFs = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const res = await axios.get(`${API_BASE_URL}/api/v1/pdfchatbot/list/`, { headers });
      setPdfs(res.data);
    } catch (err) {
      setError('Failed to fetch PDFs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPDFs(); }, []);

  const handleDelete = async id => {
    setError('');
    setMessage('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_BASE_URL}/api/v1/pdfchatbot/delete/${id}/`, { headers });
      setMessage('PDF deleted.');
      fetchPDFs();
    } catch (err) {
      setError('Failed to delete PDF.');
    }
  };

  const handleDownload = url => {
    window.open(url, '_blank');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">My PDFs</h2>
      {message && <div className="mb-4 text-green-600 text-center">{message}</div>}
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      {loading ? <div className="text-center">Loading...</div> : (
        <div className="grid grid-cols-1 gap-4">
          {pdfs.length === 0 ? <div className="text-gray-500">No PDFs found.</div> : (
            pdfs.map(pdf => (
              <div key={pdf.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                <div>
                  <div className="font-bold">{pdf.name || `PDF ${pdf.id}`}</div>
                  <div className="text-sm text-gray-600">{pdf.url}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleDownload(pdf.url)} className="px-3 py-1 bg-blue-500 text-white rounded">Download</button>
                  <button onClick={() => handleDelete(pdf.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default PDFManager; 