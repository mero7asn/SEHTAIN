import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-brand-600" />
          <span>سياسة الخصوصية وسرية المعلومات</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">تاريخ آخر تحديث: أغسطس 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">1. الجمع والمعالجة</h3>
          <p>نحن في صحتين نلتزم بحماية خصوصيتك وسرية بياناتك الشخصية. نقوم بجمع المعلومات اللازمة فقط لإتمام عملية الطلب والتوصيل، مثل: الاسم، رقم الجوال، البريد الإلكتروني، وعنوان التوصيل.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">2. استخدام المعلومات</h3>
          <p>تُستخدم البيانات المستلمة حصرياً لأغراض معالجة الفواتير، توصيل الشحنات، تحسين جودة الخدمة، والتواصل معك بشأن حالة الطلبات والعروض الحصرية بعد موافقتك.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">3. حماية وأمان البيانات</h3>
          <p>نستخدم أحدث تقنيات التشفير وبروتوكولات الأمان SSL لحماية بياناتك من أي وصول غير مصرح به أو تسريب. لن يتم بيع أو مشاركة بياناتك الشخصية مع أي طرف ثالث تجاري.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">4. ملفات تعريف الارتباط (Cookies)</h3>
          <p>يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة تصفحك وتذكر المنتجات الموجودة في سلة مشترياتك أثناء التنقل بين الصفحات.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">5. التواصل معنا</h3>
          <p>إذا كان لديك أي استفسار أو طلب تعديل/حذف لبياناتك المسجلة لدينا، يمكنك التواصل مع مسؤولي الخصوصية على البريد الإلكتروني care@sahtain.demo.</p>
        </section>
      </div>

    </div>
  );
}
