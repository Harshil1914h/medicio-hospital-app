// In production on Vercel, API is served from the same domain under /api
// In local development, falls back to http://localhost:5000 unless overridden by VITE_API_BASE_URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? (import.meta.env.DEV ? 'http://localhost:5000' : '');
