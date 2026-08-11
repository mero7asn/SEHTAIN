import React from 'react';
import { Truck, Clock, ShieldCheck, PhoneCall, MapPin } from 'lucide-react';

export default function Delivery() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-3 shadow-xl">
        <div className="w-14 h-14 bg-brand-500/20 text-brand-300 rounded-2xl flex items-center justify-center mx-auto border border-brand-400/30">
          <Truck className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">يوصلك بكل عناية</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          نضمن لك وصول شحنات المياه بدرجة برودة جيدة وجودة ممتازة عبر أسطول نقل مخصص ومجهز.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 bg-sky-50 text-brand-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">مناطق التغطية</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            نغطي حالياً كبرى مدن المملكة: الرياض، جدة، الدمام، مكة المكرمة، المدينة المنورة، والخبر، مع خيارات التوصيل السريع لجميع الأحياء.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 bg-sky-50 text-brand-600 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">مواعيد وسرعة التوصيل</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            يتم التوصيل خلال 24 إلى 48 ساعة عمل من تاريخ تأكيد الطلب. يتواصل السائق هاتفياً قبل موعد التوصيل بـ 30 دقيقة.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 bg-sky-50 text-brand-600 rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">رسوم التوصيل والحد الأدنى</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            رسوم التوصيل الثابتة هي 10 ريال فقط لكافة الطلبات، ولا يوجد حد أدنى تعجيزي للطلب.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 bg-sky-50 text-brand-600 rounded-xl flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">دعم سائقي التوصيل</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            في حال وجود أي استفسار حول حالة التوصيل يمكنك الاتصال بخدمة العملاء الموحدة 920000000.
          </p>
        </div>

      </div>

    </div>
  );
}
