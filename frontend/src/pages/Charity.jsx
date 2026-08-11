import React, { useState } from 'react';
import { HeartHandshake, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';

export default function Charity() {
  const { showToast } = useToast();

  const [organizationName, setOrganizationName] = useState('');
  const [organizationType, setOrganizationType] = useState('جامع ومسجد');
  const [location, setLocation] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [quantity, setQuantity] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!organizationName || !location || !beneficiaries || !quantity || !phone) {
      showToast('يرجى ملء كافة البيانات الإلزامية المطلوبة', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/charity', {
        organizationName,
        organizationType,
        location,
        beneficiaries: Number(beneficiaries),
        quantity,
        phone,
        notes
      });
      setSubmitted(true);
      showToast('تم استلام طلب السقيا بنجاح، ونسأل الله أن يجعلها في ميزان حسناتكم', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'حدث خطأ أثناء إرسال طلب السقيا', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="w-16 h-16 bg-emerald-500/20 text-emerald-300 rounded-2xl flex items-center justify-center mx-auto border border-emerald-400/30">
          <HeartHandshake className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">سقيا المساجد والمشاريع الخيرية</h1>
        <p className="text-emerald-100 text-sm max-w-2xl mx-auto leading-relaxed">
          «أفضل الصدقة سقيا الماء». نسهل عليك المساهمة في توفير وتوصيل المياه النقية للمساجد والجمعيات الخيرية والمحتاجين بكل أمانة وموثوقية.
        </p>
      </div>

      {/* Charity Process Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 font-black rounded-full flex items-center justify-center mx-auto">1</div>
          <h3 className="font-bold text-slate-800 text-base">تقديم طلب السقيا</h3>
          <p className="text-slate-500 text-xs">حدد اسم المسجد أو الموقع والكمية المطلوبة عبر النموذج.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 font-black rounded-full flex items-center justify-center mx-auto">2</div>
          <h3 className="font-bold text-slate-800 text-base">التجهيز والتوزيع المبرد</h3>
          <p className="text-slate-500 text-xs">نقوم بنقل وتفريغ الكراتين مباشرة داخل مقر المسجد أو الجهة.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 font-black rounded-full flex items-center justify-center mx-auto">3</div>
          <h3 className="font-bold text-slate-800 text-base">تأكيد الإنجاز</h3>
          <p className="text-slate-500 text-xs">إشعارك بتأكيد الوصول والتسليم للجهة المستفيدة.</p>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-extrabold text-slate-900">نموذج طلب توريد سقيا الماء</h2>
          <p className="text-slate-500 text-sm">قم بتعبئة بيانات الموقع والمستفيدين ليتولى فريق صحتين إتمام التوصيل</p>
        </div>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">تم استلام طلب السقيا بنجاح!</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              تقبل الله طاعتكم وجعلها في ميزان حسناتكم. سيتواصل فريق العمل معك فوراً لتأكيد تفاصيل وموعد التوصيل للموقع المعتمد.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              تقديم طلب جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">اسم المسجد / الجهة المستفيدة *</label>
              <input 
                type="text" 
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                required
                placeholder="مثال: جامع الملك فهد / جمعية البر"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">نوع الجهة *</label>
              <select
                value={organizationType}
                onChange={(e) => setOrganizationType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="جامع ومسجد">جامع ومسجد</option>
                <option value="جمعية خيرية">جمعية خيرية</option>
                <option value="مدرسة / مجمع تعليمي">مدرسة / مجمع تعليمي</option>
                <option value="دار رعاية أيتام/مسنين">دار رعاية أيتام/مسنين</option>
                <option value="حملة إفطار/توزيع أفراد">حملة إفطار/توزيع أفراد</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">الموقع والمدينة بالضبط *</label>
              <input 
                type="text" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                placeholder="الرياض - حي النفل - الشارع العام"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">عدد المستفيدين التقديري *</label>
              <input 
                type="number" 
                value={beneficiaries}
                onChange={(e) => setBeneficiaries(e.target.value)}
                required
                placeholder="مثال: 500"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">الكمية المطلوبة (بالكرتون) *</label>
              <input 
                type="text" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                placeholder="مثال: 100 كرتون 330 مل"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">رقم التواصل (الواتساب) *</label>
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="05XXXXXXXX"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left"
                dir="ltr"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">ملاحظات إضافية (مواعيد فتح المسجد، حارس المسجد...)</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="أدخل أي ملاحظات تساعد سائق الفان على التفريغ بالمسجد بسهولة..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-black text-base transition shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                <span>إرسال طلب السقيا</span>
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
