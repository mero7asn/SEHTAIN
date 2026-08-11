import React from 'react';
import { ShoppingBag, CheckCircle2, Truck, MapPin, CreditCard, Search } from 'lucide-react';

export default function UserGuide() {
  const steps = [
    {
      num: 1,
      title: 'اختر المنتجات المناسبة',
      desc: 'تصفح متجر صحتين واقتر الحجم المتوافق مع احتياجك (330 مل، 500 مل، 1.5 لتر، 5 لتر).'
    },
    {
      num: 2,
      title: 'أضف المنتجات لسلة المشتريات',
      desc: 'حدد الكمية المطلوبة بالضغط على زر [+] ثم اضغط زر "إضافة إلى السلة".'
    },
    {
      num: 3,
      title: 'راجع سلة المشتريات',
      desc: 'افتح السلة الجانبية أو صفحة السلة وتأكد من الفاتورة ومجموع الكميات ورسوم التوصيل.'
    },
    {
      num: 4,
      title: 'أدخل معلومات وعنوان التوصيل',
      desc: 'أدخل اسمك، رقم جوالك، وحدد المدينة والحي والشارع للتوصيل الدقيق.'
    },
    {
      num: 5,
      title: 'اختر طريقة الدفع المناسبة',
      desc: 'يمكنك اختيار الدفع نقداً/شبكة عند الاستلام، أو البطاقة الائتمانية، أو Apple Pay.'
    },
    {
      num: 6,
      title: 'تأكيد الطلب واستلام الرقم المرجعي',
      desc: 'اضغط زر "تأكيد الطلب" لتصلك رسالة التأكيد برقم الطلب #SH-XXXXXX.'
    },
    {
      num: 7,
      title: 'تتبع وتأكيد الاستلام المبرد',
      desc: 'سيتواصل معك مندوب التوصيل لتأكيد التسليم المبرد حتى باب منزلكم.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-black text-slate-900">دليلك للتسوق والطلب مع صحتين</h1>
        <p className="text-slate-500 text-sm">خطوات بسيطة وميسرة للحصول على مياه نقية تصلك حتى بابك</p>
      </div>

      <div className="space-y-4">
        {steps.map((step) => (
          <div key={step.num} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex items-start gap-5">
            <div className="w-10 h-10 bg-brand-600 text-white font-black text-lg rounded-xl flex items-center justify-center shrink-0">
              {step.num}
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
