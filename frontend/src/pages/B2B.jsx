import React, { useState } from 'react';
import { Building2, Send, CheckCircle2, ShieldCheck, Truck, Users } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';

export default function B2B() {
  const { showToast } = useToast();

  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('شركات ومكاتب');
  const [city, setCity] = useState('الرياض');
  const [quantity, setQuantity] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyName || !contactName || !phone || !email || !quantity) {
      showToast('يرجى ملء كافة البيانات الإلزامية المطلوبة', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/b2b', {
        companyName,
        contactName,
        phone,
        email,
        businessType,
        city,
        quantity,
        deliveryDate: deliveryDate || null,
        notes
      });
      setSubmitted(true);
      showToast('تم إرسال طلب عرض السعر بنجاح، وسيتم التواصل معكم قريباً', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'حدث خطأ أثناء تقديم الطلب', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 bg-brand-500/20 text-brand-300 rounded-2xl flex items-center justify-center mx-auto border border-brand-400/30">
          <Building2 className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">حلول مياه صحتين للأعمال والضيافة</h1>
        <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
          نقدم للمنشآت، الشركات، الفنادق، والمطاعم حلول توريد مياه دورية ومخصصة بأسعار تنافسية وجداول توصيل دقيقة.
        </p>
      </div>

      {/* Business Offerings Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 text-base">المكاتب والشركات</h3>
          <p className="text-slate-500 text-xs">جدول توريد أسبوعي أو شهري منتظم لمقرات العمل.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 text-base">المطاعم والكافيهات</h3>
          <p className="text-slate-500 text-xs">عبوات راقية تليق بطاولات الضيافة وخدمات الزبائن.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 text-base">الفنادق والقطاع الفندقي</h3>
          <p className="text-slate-500 text-xs">كميات كبرى لتغطية الغرف وقاعات المؤتمرات والفعاليات.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h3 className="font-bold text-slate-800 text-base">الفعاليات والمعارض</h3>
          <p className="text-slate-500 text-xs">توريد مبرد فوري للفعاليات والمناسبات الكبيرة.</p>
        </div>
      </div>

      {/* B2B Quote Request Form Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">طلب عرض سعر مخصص (B2B)</h2>
          <p className="text-slate-500 text-sm">قم بتعبئة النموذج وسيقوم ممثل مبيعات القطاع التجاري بالتواصل معك خلال ساعات</p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">تم إرسال طلبك بنجاح!</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              شكراً لتواصلك مع صحتين للأعمال. قام فريق المبيعات باستلام طلبك وسيتم إعداد عرض السعر والتواصل معكم قريباً.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-brand-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              تقديم طلب جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">اسم المنشأة / الشركة *</label>
              <input 
                type="text" 
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                placeholder="مثال: شركة الأفق المحدودة"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">اسم المسؤول التواصل *</label>
              <input 
                type="text" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                placeholder="الاسم الثلاثي"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">رقم الجوال *</label>
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
              <label className="block text-xs font-bold text-slate-700 mb-2">البريد الإلكتروني *</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="info@company.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">نوع النشاط التجاري *</label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="شركات ومكاتب">شركات ومكاتب</option>
                <option value="فنادق وضيافة">فنادق وضيافة</option>
                <option value="مطاعم وكافيهات">مطاعم وكافيهات</option>
                <option value="معارض وفعاليات">معارض وفعاليات</option>
                <option value="قطاع حكومي / تعليمي">قطاع حكومي / تعليمي</option>
                <option value="نشاط آخر">نشاط آخر</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">المدينة *</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="مثال: الرياض"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">الكمية التقديرية المطلوبة *</label>
              <input 
                type="text" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="مثال: 200 كرتون 330 مل شهرياً"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">تاريخ التوريد المتوقع (اختياري)</label>
              <input 
                type="date" 
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">ملاحظات أو متطلبات خاصة (اختياري)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="أذكر أي تفاصيل إضافية حول مواعيد التسليم أو جدول التوريد الدوري..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-black text-base transition shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>إرسال الطلب الان</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
