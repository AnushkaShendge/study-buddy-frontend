import React, { useState } from 'react';
import { FaImage } from "react-icons/fa6";
import { BiSolidFilePdf } from "react-icons/bi";
import axios from 'axios';

function EditNotes({ handleClose, handleEdit, note }) {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [img, setImg] = useState([]);
  const [pdf, setPdf] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', title);
      data.append('content', content);
      for (let i = 0; i < img.length; i++) {
        data.append('images', img[i]);
      }
      for (let i = 0; i < pdf.length; i++) {
        data.append('documents', pdf[i]);
      }
      
      const res = await axios.post(`http://localhost:8000/notes/${note.id}/update/`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      if (res.data) {
        handleEdit();
        handleClose();
      }
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  const handleImage = (e) => {
    setImg([...e.target.files]);
  };

  const handlePdf = (e) => {
    setPdf([...e.target.files]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gradient-to-r from-cyan-200 to-purple-200 text-black p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea
              className="w-full h-40 p-3 border border-gray-300 rounded"
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-between space-x-4">
            <label className="flex items-center px-4 py-2 bg-blue-700 text-black rounded hover:bg-blue-800 cursor-pointer">
              <FaImage size={20} />
              <input
                type="file"
                multiple
                onChange={handleImage}
                className="hidden"
              />
            </label>
            <label className="flex items-center px-4 py-2 bg-blue-700 text-black rounded hover:bg-blue-800 cursor-pointer">
              <BiSolidFilePdf size={20} />
              <input
                type="file"
                multiple
                onChange={handlePdf}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNotes;
