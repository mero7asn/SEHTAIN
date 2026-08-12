import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, ShieldCheck, LogOut, ChevronDown, Globe } from 'lucide-react';
import LogoVideo from '../ui/LogoVideo';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import SearchModal from '../ui/SearchModal';

export default function Header() {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [lang, setLang] = useState('AR');
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#E5E5E5] text-zinc-600 text-xs py-2.5 px-4 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-900" />
            <span>جميع الأسعار شاملة ضريبة القيمة المضافة 15% | توصيل مياه مبرد لجميع مناطق المملكة</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-medium">
            <span>خدمة العملاء: 920000000</span>
            <span className="hidden sm:inline">الرقم الضريبي: 300123456700003</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-[#E5E5E5] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-16 h-16 bg-[#E5E5E5] rounded-xl flex items-center justify-center overflow-hidden">
                <LogoVideo className="w-full h-full" />
              </div>
              <div>
                <span className="text-2xl font-black text-zinc-900 tracking-tight block leading-tight">صحتين</span>
                <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase block">مياه نقية طبيعية</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-700">
              <Link 
                to="/" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/') ? 'text-zinc-900 font-bold' : ''}`}
              >
                الرئيسية
              </Link>
              <Link 
                to="/products" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/products') ? 'text-zinc-900 font-bold' : ''}`}
              >
                المنتجات
              </Link>
              <Link 
                to="/individuals" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/individuals') ? 'text-zinc-900 font-bold' : ''}`}
              >
                الأفراد والعائلات
              </Link>
              <Link 
                to="/b2b" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/b2b') ? 'text-zinc-900 font-bold' : ''}`}
              >
                الأعمال والضيافة
              </Link>
              <Link 
                to="/charity" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/charity') ? 'text-zinc-900 font-bold' : ''}`}
              >
                سقيا المساجد والخير
              </Link>
              <Link 
                to="/about" 
                className={`transition hover:text-zinc-900 py-2 ${isActive('/about') ? 'text-zinc-900 font-bold' : ''}`}
              >
                عن صحتين
              </Link>
            </nav>

            {/* Header Controls */}
            <div className="flex items-center gap-2">
              
              {/* Language Selector */}
              <button
                onClick={() => setLang(lang === 'AR' ? 'EN' : 'AR')}
                className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition text-xs font-bold border border-zinc-200"
              >
                <Globe className="w-4 h-4" />
                <span>{lang === 'AR' ? 'العربية' : 'English'}</span>
              </button>

              {/* Search Trigger Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition flex items-center justify-center"
                title="ابحث عن منتج..."
              >
                <Search className="w-5 h-5" />
              </button>

              {/* User Account / Auth Dropdown */}
              <div className="relative">
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                      className="flex items-center gap-2 p-2 rounded-lg text-zinc-800 hover:bg-zinc-100 transition"
                    >
                      <div className="w-8 h-8 bg-zinc-900 text-white rounded-full flex items-center justify-center font-bold text-xs">
                        {user.name ? user.name.charAt(0) : 'ع'}
                      </div>
                      <span className="hidden md:inline text-xs font-bold">{user.name}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    {isUserDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 py-2 z-50 animate-fade-in text-sm">
                        <div className="px-4 py-2 border-b border-zinc-100">
                          <p className="font-bold text-zinc-900 text-xs">{user.name}</p>
                          <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                        </div>
                        
                        {isAdmin && (
                          <Link
                            to="/admin"
                            onClick={() => setIsUserDropdownOpen(false)}
                            className="block px-4 py-2 text-zinc-900 font-bold hover:bg-zinc-100 transition"
                          >
                            لوحة التحكم (الآدمن)
                          </Link>
                        )}

                        <Link
                          to="/account"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 transition"
                        >
                          حسابي الشخصي
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="block px-4 py-2 text-zinc-700 hover:bg-zinc-50 transition"
                        >
                          طلباتي السابقة
                        </Link>
                        <button
                          onClick={() => {
                            setIsUserDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-right px-4 py-2 text-zinc-900 hover:bg-zinc-100 transition flex items-center gap-2 font-bold"
                        >
                          <LogOut className="w-4 h-4" />
                          تسجيل الخروج
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="p-2.5 rounded-lg text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 transition flex items-center gap-1.5"
                    title="تسجيل الدخول"
                  >
                    <User className="w-5 h-5" />
                    <span className="hidden md:inline text-xs font-semibold">دخول</span>
                  </Link>
                )}
              </div>

              {/* Cart Drawer Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 rounded-lg bg-zinc-900 hover:bg-black text-white transition relative flex items-center justify-center"
                title="سلة المشتريات"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-zinc-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-900">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Navigation Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-zinc-700 hover:bg-zinc-100 transition"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-zinc-200 bg-[#E5E5E5] px-4 pt-3 pb-6 space-y-3 animate-fade-in">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              الرئيسية
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/products') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              جميع المنتجات
            </Link>
            <Link 
              to="/individuals" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/individuals') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              الأفراد والعائلات
            </Link>
            <Link 
              to="/b2b" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/b2b') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              الأعمال والضيافة (B2B)
            </Link>
            <Link 
              to="/charity" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/charity') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              سقيا المساجد والخير
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/about') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              عن صحتين
            </Link>
            <Link 
              to="/satisfaction" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block py-2 text-sm font-semibold rounded-lg px-3 ${isActive('/satisfaction') ? 'bg-zinc-100 text-zinc-900 font-bold' : 'text-zinc-700'}`}
            >
              رضاك أولويتنا
            </Link>
          </div>
        )}
      </header>

      {/* Dynamic Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
