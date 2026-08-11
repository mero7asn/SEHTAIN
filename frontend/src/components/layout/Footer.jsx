import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Share2, Globe, MessageCircle } from 'lucide-react';
import LogoVideo, { Favicon } from '../../components/ui/LogoVideo';
import API from '../../services/api';

export default function Footer() {
  const [config, setConfig] = React.useState(null);

  React.useEffect(() => {
    const fetchConfig = async () => {
      try {
        const res = await API.get('/config');
        setConfig(res.data?.footer);
      } catch (err) {
        console.error('Failed to load footer config:', err);
      }
    };
    fetchConfig();
  }, []);

  const footer = config || {};

  return (
    <footer className="bg-white text-zinc-700 pt-16 pb-8 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-200">

          {/* Column 1: Brand Info */}
          {(footer.showBrandInfo ?? true) && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-24 h-24 bg-zinc-900 rounded-xl flex items-center justify-center shadow-xs overflow-hidden">
                  <LogoVideo className="w-full h-full" />
                </div>
                <span className="text-2xl font-black text-zinc-900">صحتين</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                {footer.brandBio || 'شركة صحتين للمياه التعبئة الحديثة. نقدم مياه نقية عالية الجودة معبأة بأحدث التقنيات لتلائم جميع احتياجات الأفراد، المنشآت، والمساجد.'}
              </p>
              {footer.taxNumber && (
                <div className="pt-2 flex items-center gap-2 text-xs text-zinc-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-zinc-900 shrink-0" />
                  <span>الرقم الضريبي: {footer.taxNumber}</span>
                </div>
              )}
            </div>
          )}

          {/* Column 2: Helpful Links */}
          {(footer.showHelpfulLinks ?? true) && (
            <div>
              <h4 className="text-zinc-900 font-bold text-base mb-4 border-r-2 border-zinc-900 pr-3">
                {footer.helpfulLinksTitle || 'روابط تهمك'}
              </h4>
              <ul className="space-y-2.5 text-sm text-zinc-600 font-medium">
                <li><Link to="/about" className="hover:text-zinc-900 transition">عن صحتين</Link></li>
                <li><Link to="/faq" className="hover:text-zinc-900 transition">الأسئلة الشائعة</Link></li>
                <li><Link to="/satisfaction" className="hover:text-zinc-900 transition">رضاك أولويتنا</Link></li>
                <li><Link to="/privacy" className="hover:text-zinc-900 transition">خصوصيتك محفوظة</Link></li>
                <li><Link to="/terms" className="hover:text-zinc-900 transition">شروط الاستخدام</Link></li>
                <li><Link to="/user-guide" className="hover:text-zinc-900 transition">دليلك مع صحتين</Link></li>
                <li><Link to="/delivery" className="hover:text-zinc-900 transition">يوصلك بكل عناية</Link></li>
              </ul>
            </div>
          )}

          {/* Column 3: Customer Service */}
          {(footer.showCustomerService ?? true) && (
            <div>
              <h4 className="text-zinc-900 font-bold text-base mb-4 border-r-2 border-zinc-900 pr-3">
                {footer.customerServiceTitle || 'خدمة العملاء'}
              </h4>
              <ul className="space-y-3.5 text-sm text-zinc-600 font-medium">
                {footer.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>الرقم الموحد: {footer.phone}</span>
                  </li>
                )}
                {footer.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-zinc-900 shrink-0" />
                    <span>البريد الإلكتروني: {footer.email}</span>
                  </li>
                )}
                {footer.address && (
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-zinc-900 shrink-0 mt-1" />
                    <span>{footer.address}</span>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Column 4: Social Media */}
          {(footer.showSocialLinks ?? true) && (
            <div>
              <h4 className="text-zinc-900 font-bold text-base mb-4 border-r-2 border-zinc-900 pr-3">
                {footer.socialTitle || 'تابعنا'}
              </h4>
              <p className="text-xs text-zinc-500 mb-4 font-medium">تابع منصات صحتين الرسمية للتعرف على آخر العروض والأخبار:</p>
              <div className="flex items-center gap-3">
                {footer.instagramUrl && (
                  <a href={footer.instagramUrl} className="w-10 h-10 bg-zinc-100 border border-zinc-200 hover:bg-zinc-900 text-zinc-700 hover:text-white rounded-xl flex items-center justify-center transition" title="Instagram">
                    <Globe className="w-5 h-5" />
                  </a>
                )}
                {footer.twitterUrl && (
                  <a href={footer.twitterUrl} className="w-10 h-10 bg-zinc-100 border border-zinc-200 hover:bg-zinc-900 text-zinc-700 hover:text-white rounded-xl flex items-center justify-center transition" title="Twitter/X">
                    <Share2 className="w-5 h-5" />
                  </a>
                )}
                {footer.whatsappUrl && (
                  <a href={footer.whatsappUrl} className="w-10 h-10 bg-zinc-100 border border-zinc-200 hover:bg-zinc-900 text-zinc-700 hover:text-white rounded-xl flex items-center justify-center transition" title="WhatsApp">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Bar */}
        {(footer.showBottomBar ?? true) && (
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-medium">
            <p>© {new Date().getFullYear()} {footer.copyrightText || 'مياه صحتين. جميع الحقوق محفوظة (تطبيق تجريبي للاختبار والتعلم).'}</p>
            <div className="flex items-center gap-4">
              <span>الأسعار شاملة الضريبة 15%</span>
              <span>•</span>
              <span>دفع آمن 100%</span>
            </div>
          </div>
        )}

      </div>
    </footer>
  );
}
