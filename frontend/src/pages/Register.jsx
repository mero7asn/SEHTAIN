import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Phone, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(name, email, phone, password);
    if (res.success) {
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto border border-brand-100">
          <UserPlus className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">إنشاء حساب جديد في صحتين</h1>
        <p className="text-xs text-slate-500">انضم إلينا واستمتع بتوصيل سريع لمنتجات المياه النقية</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل *</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="الاسم الثلاثي"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني *</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@domain.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الجوال *</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="05XXXXXXXX"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور *</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
              dir="ltr"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <span>جاري إنشاء الحساب...</span> : <span>إنشاء حساب</span>}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>لديك حساب بالفعل؟ </span>
          <Link to="/login" className="font-bold text-brand-600 hover:underline">
            تسجيل الدخول
          </Link>
        </div>
      </div>

    </div>
  );
}
