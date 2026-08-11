import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, ShieldCheck, Mail, Phone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">يرجى تسجيل الدخول أولاً</h2>
        <Link to="/login" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-brand-900 via-sky-900 to-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/10 text-brand-300 rounded-2xl flex items-center justify-center font-black text-2xl border border-white/10">
            {user.name ? user.name.charAt(0) : 'ع'}
          </div>
          <div>
            <h1 className="text-2xl font-black">مرحباً، {user.name}</h1>
            <p className="text-slate-300 text-xs mt-1">{user.email} | {user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin"
              className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition"
            >
              لوحة تحكم الآدمن
            </Link>
          )}
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      {/* Account Control Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Orders */}
        <Link 
          to="/orders"
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-brand-300 transition space-y-4 group"
        >
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">طلباتي السابقة</h3>
            <p className="text-slate-500 text-xs mt-1">عرض جميع الطلبات السابقة وتتبع حالة الشحنات.</p>
          </div>
        </Link>

        {/* Card 2: Personal Info */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">المعلومات الشخصية</h3>
            <div className="text-slate-600 text-xs space-y-1 mt-2">
              <p>الاسم: {user.name}</p>
              <p>الجوال: {user.phone}</p>
              <p>البريد: {user.email}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Saved Address */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">العناوين المحفوظة</h3>
            <p className="text-slate-500 text-xs mt-1">الرياض، حي النخيل - طريق الملك فهد (افتراضي)</p>
          </div>
        </div>

      </div>

    </div>
  );
}
