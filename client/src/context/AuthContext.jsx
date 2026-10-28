import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Page load thay tyare check karse ke user pela thi login che ke nahi
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Real Backend API sathe Login function
  const login = async (credentials) => {
    try {
      // Niche na URL ma tamara backend no port nakho (dharo ke backend 5000 par chalu che)
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      // Jo backend thi 200 OK status aave to login success
      if (response.ok) {
        setUser(data.user);
        
        // Token ane user details browser ma save karo
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        return { success: true, role: data.user.role };
      } else {
        // Backend mathi je error aave (ex: "User not found") te form ma dekhadva
        return { success: false, error: data.message || "Invalid email or password." };
      }
    } catch (error) {
      console.error("Login API Error:", error);
      return { success: false, error: "Backend server sathe connect nathi thai rahyu. Server chalu che?" };
    }
  };

  // Logout function
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