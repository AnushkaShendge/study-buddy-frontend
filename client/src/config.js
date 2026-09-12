export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://studybuddy-django-backend.onrender.com';
export const NODE_API_BASE_URL = import.meta.env.VITE_NODE_API_BASE_URL || 'https://studybuddy-node-backend.onrender.com';
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || NODE_API_BASE_URL.replace(/^http/, 'ws');


