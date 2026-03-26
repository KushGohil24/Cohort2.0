import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginCall, registerCall } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in local storage on boot
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginCall(email, password);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const registerUser = async (name, email, password) => {
    const data = await registerCall(name, email, password);
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  const value = {
    user,
    login,
    registerUser,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
