import React from 'react';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
          <FileText className="w-8 h-8 text-brand-600" />
          <span>شروط وأحكام الاستخدام</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">تاريخ آخر تحديث: أغسطس 2026</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-sm leading-relaxed">
        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">1. القبول بالشروط</h3>
          <p>باستخدامك لموقع ومتجر صحتين الإلكتروني، فإنك توافق التامة والكاملة على الالتزام بكافة الشروط والأحكام الواردة في هذه الاتفاقية.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">2. المنتجات والأسعار</h3>
          <p>تخضع جميع الأسعار المعروضة لضريبة القيمة المضافة 15%. نحتفظ بالحق في تعديل الأسعار والعروض في أي وقت دون إشعار مسبق، وتسري الأسعار المعتمدة لحظة تأكيد الطلب.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">3. الطلبات والتوصيل</h3>
          <p>يتعهد العميل بتوفير عنوان توصيل صحيح ودقيق ورقم جوال نشط للتواصل. يسعى فريق التوصيل للالتزام بمواعيد التسليم المحددة (24-48 ساعة عمل).</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">4. الإلغاء والاسترجاع</h3>
          <p>يمكن للعميل إلغاء الطلب مجاناً طالما أن الطلب في حالة "جديد" أو "قيد المعالجة" ولم يخرج مع مندوب التوصيل بعد. يتم استرجاع المبالغ المدفوعة عبر نفس طريقة الدفع الأصلية.</p>
        </section>

        <section className="space-y-2">
          <h3 className="font-bold text-slate-900 text-base">5. التطبيق التجريبي</h3>
          <p>هذا التطبيق مخصص لأغراض الاختبار والعرض التجريبي (Demo Application)، وجميع بيانات الشركات والمنتجات والعملاء المعروضة هي بيانات افتراضية توضيحية.</p>
        </section>
      </div>

    </div>
  );
}
