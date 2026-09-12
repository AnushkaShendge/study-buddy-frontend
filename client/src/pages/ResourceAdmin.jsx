import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';

function ResourceAdmin() {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', pdf_file: null, resource_type: 'pdf' });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

  useEffect(() => { fetchResources(); }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      const data = new FormData();
      data.append('title', form.title);
      data.append('url', form.url);
      if (form.pdf_file) data.append('pdf_file', form.pdf_file);
      data.append('resource_type', form.resource_type);
      if (editingId) {
        await axios.put(`${API_BASE_URL}/api/v1/resources/${editingId}/`, data, { headers });
        setMessage('Resource updated.');
      } else {
        await axios.post(`${API_BASE_URL}/api/v1/resources/`, data, { headers });
        setMessage('Resource added.');
      }
      setForm({ title: '', url: '', pdf_file: null, resource_type: 'pdf' });
      setEditingId(null);
      fetchResources();
    } catch (err) {
      setError('Failed to save resource.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = r => {
    setForm({ title: r.title, url: r.url, pdf_file: null, resource_type: r.resource_type });
    setEditingId(r.id);
  };

  const handleDelete = async id => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`${API_BASE_URL}/api/v1/resources/${id}/`, { headers });
      setMessage('Resource deleted.');
      fetchResources();
    } catch (err) {
      setError('Failed to delete resource.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Resource Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
        <input name="url" value={form.url} onChange={handleChange} placeholder="URL" className="w-full p-2 border rounded" required />
        <input name="pdf_file" type="file" onChange={handleChange} className="w-full p-2 border rounded" />
        <select name="resource_type" value={form.resource_type} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pdf">PDF</option>
          <option value="youtube">YouTube Link</option>
          <option value="website">Website Link</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>
            {editingId ? 'Update' : 'Add'} Resource
          </button>
          {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', url: '', pdf_file: null, resource_type: 'pdf' }); }} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>}
        </div>
      </form>
      {message && <div className="mb-4 text-green-600 text-center">{message}</div>}
      {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
      <div className="grid grid-cols-1 gap-4">
        {resources.map(r => (
          <div key={r.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
            <div>
              <div className="font-bold">{r.title}</div>
              <div className="text-sm text-gray-600">{r.url}</div>
              <div className="text-sm">Type: {r.resource_type}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(r)} className="px-3 py-1 bg-yellow-400 rounded">Edit</button>
              <button onClick={() => handleDelete(r.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourceAdmin; 