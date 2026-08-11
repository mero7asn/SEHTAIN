import React from 'react';
import { Droplets, ShieldCheck, Heart, Award, Target, Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-16 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-brand-500/20 text-brand-300 rounded-2xl flex items-center justify-center mx-auto border border-brand-400/30">
          <Droplets className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black">عن صحتين للمياه</h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          نحن في شركة صحتين للمياه نؤمن بأن المياه النقية هي أصل الحياة المستدامة والصحة العالية لكل عائلة ومنشأة.
        </p>
      </div>

      {/* Grid: Who We Are, Vision, Mission */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">من نحن</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            شركة تعبئة وتوزيع مياه سعودية حديثة تعتمد أفضل خطوط الإنتاج والتقنيات العالمية لتعبئة المياه الطبيعية بأعلى معايير النقاء والسلامة.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">رؤيتنا</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            أن نكون الخيار الأول المفضل لكل منزل ومنشأة في المملكة العربية السعودية من خلال تقديم مياه صحية فائقة الجودة وخدمات توصيل دقيقة.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-sky-50 text-brand-600 rounded-2xl flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">رسالتنا</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            توفير مياه صحية نقية متوازنة في الأملاح المعدنية وتوصيلها بكل عناية واحترافية لتعزيز نمط الحياة الصحي في مجتمعنا.
          </p>
        </div>

      </div>

      {/* Values Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold">قيم صحتين الأساسية</h2>
          <p className="text-slate-400 text-sm">المبادئ التي تقود كل قطرة مياه ننتجها وكل خدمة نقدمها</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-brand-400 text-lg mb-1">الجودة الفائقة</h4>
            <p className="text-slate-400 text-xs">التزام صارم بفحوصات الجودة المختبرية اليومية.</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-brand-400 text-lg mb-1">النقاء الطبيعي</h4>
            <p className="text-slate-400 text-xs">مياه طبيعية متوازنة خالية من الشوائب.</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-brand-400 text-lg mb-1">الموثوقية</h4>
            <p className="text-slate-400 text-xs">توصيل في الوقت المحدد وجاهزية تامة للتوريد.</p>
          </div>
          <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
            <h4 className="font-bold text-brand-400 text-lg mb-1">المسؤولية المجتمعية</h4>
            <p className="text-slate-400 text-xs">المساهمة في مبادرات سقيا المساجد وحملات الخير.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
