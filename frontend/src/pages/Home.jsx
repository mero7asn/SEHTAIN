import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Droplets, Sparkles, Clock, ShieldCheck, Truck, Users, Building2, HeartHandshake } from 'lucide-react';
import API from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import MediaPlayer from '../components/ui/MediaPlayer';

export default function Home() {
  const [config, setConfig] = useState(null);
  const [activeProducts, setActiveProducts] = useState([]);
  const [comingSoonProducts, setComingSoonProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, prodRes] = await Promise.all([
          API.get('/config'),
          API.get('/products')
        ]);
        setConfig(configRes.data);

        const allProds = prodRes.data || [];
        setActiveProducts(allProds.filter(p => !p.isComingSoon));
        setComingSoonProducts(allProds.filter(p => p.isComingSoon));
      } catch (err) {
        console.error('Failed to load home page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mainHero = config?.mainHero || {};
  const productsSec = config?.productsSection || {};
  const comingSoonHero = config?.comingSoonHero || {};
  const comingSoonSec = config?.comingSoonProductsSection || {};
  const partnersSec = config?.partnersSection || {};

  return (
    <div className="space-y-16 pb-16 bg-white text-zinc-900">

      {/* 1. Main Hero Section */}
      <section 
        className="relative overflow-hidden mx-4 sm:mx-8 lg:mx-16 mt-6"
        style={{ height: 'clamp(500px, 52vw, 740px)' }}
      >
        {/* Full-bleed media */}
        <MediaPlayer
          mediaMode={mainHero.mediaMode || 'single_image'}
          images={mainHero.images || []}
          videos={mainHero.videos || []}
          introVideo={mainHero.introVideo || ''}
          defaultImage="https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1600&q=80"
          className="w-full h-full"
        />
        {/* Minimal CTA — video already contains logo/Arabic text */}
        {mainHero.ctaText && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
            <Link
              to={mainHero.ctaLink || '/products'}
              className="bg-white/90 backdrop-blur-sm text-zinc-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition shadow-lg"
            >
              {mainHero.ctaText}
            </Link>
          </div>
        )}
      </section>

      {/* Quick Solutions Grid (Pristine White Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white transition duration-300">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">للأفراد والعائلات</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                مياه يومية لمنزلك وعائلتك بأحجام متنوعة (330 مل، 500 مل، 1.5 لتر) تضمن ترطيباً صحياً طوال اليوم.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/individuals" className="w-full bg-zinc-50 border border-zinc-200 group-hover:bg-zinc-900 text-zinc-800 group-hover:text-white py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2">
                <span>اكتشف المنتجات</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white transition duration-300">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">للأعمال والضيافة</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                حلول مياه متكاملة للشركات، المكاتب، الفنادق، والمطاعم مع خدمات جدول التوريد الدوري وبأسعار تنافسية.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/b2b" className="w-full bg-zinc-50 border border-zinc-200 group-hover:bg-zinc-900 text-zinc-800 group-hover:text-white py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2">
                <span>اكتشف حلول الأعمال</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-zinc-200 shadow-2xs hover:shadow-md transition duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-14 h-14 bg-zinc-100 text-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-200 group-hover:bg-zinc-900 group-hover:text-white transition duration-300">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">سقيا المساجد والخير</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">
                ساهم في توفير المياه للمساجد، الجمعيات، وحملات الخير بالتوصيل المباشر الموثوق إلى موقع المسجد.
              </p>
            </div>
            <div className="pt-6">
              <Link to="/charity" className="w-full bg-zinc-50 border border-zinc-200 group-hover:bg-zinc-900 text-zinc-800 group-hover:text-white py-3 px-4 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2">
                <span>اعرف المزيد</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Products Section (Clean White) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-zinc-200 pb-4">
          <div className="space-y-1">
            <span className="text-zinc-500 font-bold text-xs uppercase tracking-wider">{productsSec.badge || 'تشكيلتنا المختارة'}</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">{productsSec.title || 'منتجاتنا الحالية'}</h2>
            
            <p className="text-zinc-600 text-sm font-medium leading-relaxed">
              {productsSec.line1 || 'اختر الحجم المناسب لاحتياجك اليومي من عبوات مياه صحتين المتميزة.'}
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {productsSec.line2 || 'نضمن لك توصيلاً سريعاً ومبرداً حتى باب منزلك أو منشأتك.'}
            </p>
          </div>

          <Link
            to="/products"
            className="bg-zinc-100 hover:bg-zinc-900 text-zinc-800 hover:text-white border border-zinc-200 px-5 py-2.5 rounded-xl font-bold text-sm transition flex items-center gap-2 self-start sm:self-auto shrink-0"
          >
            <span>عرض جميع المنتجات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <ProductGrid products={activeProducts} loading={loading} />
      </section>

      {/* 3. Coming Soon Hero Section */}
      {comingSoonHero.enabled && (
        <section className="relative overflow-hidden mx-4 sm:mx-8 lg:mx-16 mt-6" style={{ height: 'clamp(480px, 48vw, 660px)' }}>
          <MediaPlayer
            mediaMode={comingSoonHero.mediaMode || 'single_image'}
            images={comingSoonHero.images || []}
            videos={comingSoonHero.videos || []}
            introVideo={comingSoonHero.introVideo || ''}
            defaultImage="https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full"
          />
          {/* Minimal CTA — video/image already contains integrated messaging */}
          {comingSoonHero.ctaText && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <Link
                to={comingSoonHero.ctaLink || '/products'}
                className="bg-white/90 backdrop-blur-sm text-zinc-900 px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white transition shadow-lg"
              >
                {comingSoonHero.ctaText}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* 4. Coming Soon Products Section */}
      {comingSoonSec.enabled && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 border-b border-zinc-200 pb-4 space-y-1">
            <div className="flex items-center gap-2 text-zinc-800 font-bold text-xs uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>{comingSoonSec.badge || 'منتجات قادمة'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">{comingSoonSec.title || 'قريباً في صحتين'}</h2>
            
            <p className="text-zinc-600 text-sm font-medium leading-relaxed">
              {comingSoonSec.line1 || 'تشكيلة حصريّة جاري تجهيزها لتنضم إلى عائلة منتجاتنا في القريب العاجل.'}
            </p>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {comingSoonSec.line2 || 'يمكنك الاطلاع على المواصفات والاشتراك في قائمة الانتظار للطلب المسبق.'}
            </p>
          </div>

          {comingSoonProducts.length > 0 ? (
            <ProductGrid products={comingSoonProducts} loading={loading} />
          ) : (
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-10 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-zinc-700 mx-auto" />
              <h3 className="font-bold text-zinc-900 text-base">جاري تجهيز تشكيلة المنتجات القادمة</h3>
              <p className="text-zinc-500 text-xs">سجل في نشرتنا البريدية لتكون أول من يعلم عند إطلاق المنتجات الجديدة.</p>
            </div>
          )}
        </section>
      )}

      {/* 5. Our Partners Section (Clean White Grid) */}
      {partnersSec.enabled && (
        <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto border border-zinc-200 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">{partnersSec.title || 'شركاء النجاح'}</h2>
            <p className="text-zinc-500 text-xs sm:text-sm font-medium">{partnersSec.description || 'نفخر بثقة كبرى المؤسسات، الفنادق، والجهات الخيرية في جميع أنحاء المملكة.'}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {(partnersSec.partners && partnersSec.partners.length > 0
              ? partnersSec.partners
              : [
                  { name: 'فندق النخيل الذهبي', logo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=200&q=80' },
                  { name: 'مستشفى الشفاء التخصصي', logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=200&q=80' },
                  { name: 'سلسلة مطاعم غولدن', logo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=200&q=80' },
                  { name: 'جمعية إطعام الخيرية', logo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=200&q=80' },
                  { name: 'مدارس الرواد العالمية', logo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=200&q=80' },
                  { name: 'منتجع الساحل', logo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=200&q=80' }
                ]
            ).map((partner, idx) => (
              <div key={idx} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex flex-col items-center gap-2 hover:bg-zinc-100 transition">
                <img src={partner.logo} alt={partner.name} className="w-12 h-12 object-cover rounded-xl border border-zinc-200" />
                <span className="text-[11px] font-bold text-zinc-800 text-center">{partner.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Features & Values (White Minimalist) */}
      <section className="bg-white border border-zinc-200 py-14 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Droplets className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="font-extrabold text-zinc-900 text-base">نقاء متكامل</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-medium">تصفية فائقة وترشيح متعدد المراحل للحفاظ على توازن الأملاح المعدنية الطبيعية.</p>
          </div>
          <div className="space-y-3 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="font-extrabold text-zinc-900 text-base">جودة معتمدة</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-medium">خاضعة للفحص المختبري الدوري وفقاً للمواصفات القياسية السعودية.</p>
          </div>
          <div className="space-y-3 p-6 bg-zinc-50 rounded-2xl border border-zinc-200">
            <div className="w-12 h-12 bg-white border border-zinc-200 rounded-2xl flex items-center justify-center mx-auto shadow-2xs">
              <Truck className="w-6 h-6 text-zinc-900" />
            </div>
            <h3 className="font-extrabold text-zinc-900 text-base">توصيل مبرد</h3>
            <p className="text-zinc-500 text-xs leading-relaxed font-medium">أسطول توصيل مجهز بشاحنات مبردة لضمان وصول المياه بدرجة الحرارة المناسبة.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
