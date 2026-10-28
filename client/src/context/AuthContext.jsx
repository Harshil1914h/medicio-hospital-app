import { createContext, useState, useContext, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (credentials) => {
    try {
      const url = `${API_BASE_URL}/api/auth/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON login response:', response.status, text.slice(0, 200));
        return { success: false, error: `Server error (${response.status}). Please try again.` };
      }

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('token', data.token || '');
        localStorage.setItem('user', JSON.stringify(data.user));
        return { success: true, role: data.user.role };
      } else {
        return { success: false, error: data.message || 'Invalid email or password.' };
      }
    } catch (error) {
      console.error('Login Error:', error);
      return { success: false, error: 'Could not connect to server. Please check your internet connection.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
