export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const NODE_API_BASE_URL = import.meta.env.VITE_NODE_API_BASE_URL || 'http://localhost:4000';
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || NODE_API_BASE_URL.replace(/^http/, 'ws');

