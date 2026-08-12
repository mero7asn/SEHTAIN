import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, vat, deliveryFee, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-slate-800">سلة المشتريات فارغة</h2>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          لم تقم بإضافة أي من عبوات مياه صحتين إلى سلتك بعد. تصفح تشكيلة منتجاتنا واستمتع بتوصيل مبرد وسريع.
        </p>
        <Link to="/products" className="inline-block bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-brand-500/25">
          الذهاب لمتجر المنتجات
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-black text-slate-900">سلة المشتريات</h1>
          <p className="text-slate-500 text-sm mt-1">راجع المنتجات والكميات المطلوبة قبل التوجه لإتمام الطلب</p>
        </div>
        <button 
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-bold bg-rose-50 hover:bg-rose-100 px-3 py-2 rounded-xl transition flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          تفريع السلة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl border border-slate-100 bg-slate-50 shrink-0" 
                />
                <div>
                  <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{item.packageQuantity} عبوة | {item.volume}</p>
                  <p className="text-xs font-bold text-brand-600 mt-1">{item.price.toFixed(2)} ريال للعبوة</p>
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="p-2 text-slate-600 hover:bg-slate-200 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-bold text-sm text-slate-800">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="p-2 text-slate-600 hover:bg-slate-200 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-left min-w-[60px] sm:min-w-[80px]">
                  <span className="font-black text-slate-900 text-base">{(item.price * item.quantity).toFixed(2)}</span>
                  <span className="text-xs text-slate-500 mr-1">ريال</span>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="text-slate-400 hover:text-rose-600 p-2 transition"
                  title="حذف"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}

          <div className="pt-4">
            <Link to="/products" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:underline">
              <ArrowLeft className="w-4 h-4" />
              <span>متابعة تسوق منتجات أخرى</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs sticky top-28">
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3">ملخص الفاتورة</h3>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span className="font-bold text-slate-800">{subtotal.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-bold text-slate-800">{vat.toFixed(2)} ريال</span>
            </div>
            <div className="flex justify-between">
              <span>رسوم الشحن والتوصيل:</span>
              <span className="font-bold text-slate-800">{deliveryFee.toFixed(2)} ريال</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-slate-900 font-black text-lg">
            <span>الإجمالي النهائي:</span>
            <span className="text-brand-600 text-2xl">{total.toFixed(2)} ريال</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-emerald-800 text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>جميع الأسعار المعروضة شاملة الضريبة 15%</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-black text-base transition shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2"
          >
            <span>إتمام الطلب الآن</span>
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        </div>

      </div>
    </div>
  );
}
