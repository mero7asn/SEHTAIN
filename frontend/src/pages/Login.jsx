import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      navigate('/account');
    }
  };

  const fillCustomerDemo = () => {
    setEmail('customer@test.com');
    setPassword('Test1234');
  };

  const fillAdminDemo = () => {
    setEmail('admin@test.com');
    setPassword('Admin1234');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">

      <div className="text-center space-y-2">
        <div className="w-14 h-14 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center mx-auto border border-brand-100">
          <User className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-slate-900">تسجيل الدخول إلى صحتين</h1>
        <p className="text-xs text-slate-500">أدخل معلومات حسابك لمتابعة الطلبات والفواتير</p>
      </div>

      {/* Demo Credentials Quick Filler Box */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
          <KeyRound className="w-4 h-4 text-sky-600" />
          <span>حسابات تجريبية للاختبار المباشر:</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={fillCustomerDemo}
            className="bg-white hover:bg-sky-100 text-sky-900 border border-sky-300 py-2 px-3 rounded-xl font-bold transition text-center"
          >
            حساب عميل (Customer)
          </button>
          <button
            type="button"
            onClick={fillAdminDemo}
            className="bg-white hover:bg-sky-100 text-sky-900 border border-sky-300 py-2 px-3 rounded-xl font-bold transition text-center"
          >
            حساب مدير (Admin)
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl space-y-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="customer@test.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">كلمة المرور</label>
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
            {loading ? <span>جاري التحقق...</span> : <span>تسجيل الدخول</span>}
          </button>
        </form>

        <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
          <span>ليس لديك حساب بعد؟ </span>
          <Link to="/register" className="font-bold text-brand-600 hover:underline">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>

    </div>
  );
}
