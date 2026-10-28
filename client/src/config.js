// API Base URL Configuration
// On Vercel: API_BASE_URL = '' (empty) → requests go to same domain /api/...
// On localhost: API_BASE_URL = 'http://localhost:5000' → requests go to local backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
