import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto border border-rose-100">
        <HelpCircle className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900">404</h1>
        <h2 className="text-xl font-bold text-slate-800">الصفحة غير موجودة</h2>
        <p className="text-slate-500 text-xs leading-relaxed">
          عذراً، الرابط الذي حاولت الوصول إليه غير موجود أو تم نقله.
        </p>
      </div>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition shadow-md shadow-brand-500/20"
      >
        <Home className="w-4 h-4" />
        <span>العودة للصفحة الرئيسية</span>
      </Link>
    </div>
  );
}
