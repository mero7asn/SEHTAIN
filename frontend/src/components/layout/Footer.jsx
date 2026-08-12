import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Share2, Globe, MessageCircle, Send } from 'lucide-react';
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
    <footer className="bg-[#E5E5E5] text-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-300">
          
          {/* Column 1: Customer Service */}
          <div>
            <h4 className="text-zinc-900 font-bold text-lg mb-6">خدمة العملاء</h4>
            <ul className="space-y-4 text-sm text-zinc-700">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-zinc-900 shrink-0" />
                <span dir="ltr" className="text-zinc-900 font-semibold">920000000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-zinc-900 shrink-0" />
                <span>info@sahtain.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-zinc-900 shrink-0 mt-1" />
                <span>المملكة العربية السعودية، الرياض</span>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-zinc-900 font-bold text-lg mb-6">روابط سريعة</h4>
            <ul className="space-y-3 text-sm text-zinc-700">
              <li><Link to="/products" className="hover:text-zinc-900 transition">المنتجات</Link></li>
              <li><Link to="/individuals" className="hover:text-zinc-900 transition">الأفراد والعائلات</Link></li>
              <li><Link to="/b2b" className="hover:text-zinc-900 transition">الأعمال والضيافة</Link></li>
              <li><Link to="/charity" className="hover:text-zinc-900 transition">سقيا المساجد والخير</Link></li>
              <li><Link to="/about" className="hover:text-zinc-900 transition">عن صحتين</Link></li>
              <li><Link to="/faq" className="hover:text-zinc-900 transition">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-zinc-900 font-bold text-lg mb-6">النشرة البريدية</h4>
            <p className="text-zinc-700 text-sm mb-4">اشترك في نشرتنا البريدية للحصول على آخر العروض والتحديثات</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-1 px-4 py-3 rounded-lg bg-white border border-zinc-300 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:border-zinc-900 transition"
              />
              <button className="px-6 py-3 bg-zinc-900 text-white rounded-lg font-bold text-sm hover:bg-black transition flex items-center gap-2">
                <span>اشتراك</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <p>© {new Date().getFullYear()} {footer.copyrightText || 'مياه صحتين. جميع الحقوق محفوظة (تطبيق تجريبي للاختبار والتعلم).'}</p>
          <div className="flex items-center gap-4">
            <span>الأسعار شاملة الضريبة 15%</span>
            <span>•</span>
            <span>دفع آمن 100%</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
