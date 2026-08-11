import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sahtain_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('sahtain_user', JSON.stringify(res.data));
      showToast(`مرحباً بك مجدداً، ${res.data.name}`, 'success');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'فشل تسجيل الدخول';
      showToast(msg, 'error');
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, phone, password) => {
    setLoading(true);
    try {
      const res = await API.post('/auth/register', { name, email, phone, password });
      setUser(res.data);
      localStorage.setItem('sahtain_user', JSON.stringify(res.data));
      showToast(`تم إنشاء حسابك بنجاح! أهلاً بك يا ${res.data.name}`, 'success');
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'فشل في إنتاج الحساب';
      showToast(msg, 'error');
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sahtain_user');
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
