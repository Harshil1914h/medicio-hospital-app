// Dynamic API configuration
let base = import.meta.env.VITE_API_BASE_URL || '';

// If running in browser on a production domain (e.g. *.vercel.app),
// never route external visitors to localhost:5000
if (typeof window !== 'undefined') {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  if (!isLocalhost && base.includes('localhost')) {
    base = ''; // fallback to relative same-origin /api on Vercel
  }
  if (isLocalhost && !base && import.meta.env.DEV) {
    base = 'http://localhost:5000';
  }
}

export const API_BASE_URL = base;
