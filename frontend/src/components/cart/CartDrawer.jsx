import React, { useEffect } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    vat, 
    deliveryFee, 
    total,
    totalItemCount 
  } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex justify-end">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-brand-100 text-brand-600 p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">سلة المشتريات</h3>
                <p className="text-xs text-slate-500">{totalItemCount} منتجات في السلة</p>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-grow overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-sky-50 text-sky-400 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h4 className="font-bold text-slate-700 text-base mb-1">سلة المشتريات فارغة</h4>
                <p className="text-slate-400 text-xs mb-6 max-w-xs">
                  يبدو أنك لم تضف أي من منتجات مياه صحتين إلى سلتك بعد.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition shadow-sm"
                >
                  تصفح المنتجات الآن
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item._id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100 relative group">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg border border-slate-200 bg-white" 
                  />
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-slate-800 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-slate-400 hover:text-rose-500 transition p-1"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{item.packageQuantity} عبوة | {item.volume}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-slate-200 bg-white rounded-lg overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="p-1 text-slate-500 hover:bg-slate-100 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-left">
                        <span className="font-bold text-brand-600 text-sm">{(item.price * item.quantity).toFixed(2)} ريال</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-3 shrink-0">
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>المجموع الفرعي:</span>
                  <span className="font-semibold text-slate-800">{subtotal.toFixed(2)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span className="font-semibold text-slate-800">{vat.toFixed(2)} ريال</span>
                </div>
                <div className="flex justify-between">
                  <span>رسوم التوصيل:</span>
                  <span className="font-semibold text-slate-800">{deliveryFee.toFixed(2)} ريال</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-900 font-bold text-base">
                <span>الإجمالي النهائي:</span>
                <span className="text-brand-600 text-lg">{total.toFixed(2)} ريال</span>
              </div>

              <div className="flex gap-2 text-xs text-slate-400 items-center justify-center py-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>جميع الأسعار شاملة الضريبة المضافة 15%</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 py-3 rounded-xl font-medium text-sm transition text-center"
                >
                  متابعة التسوق
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-brand-500/20 text-center flex items-center justify-center gap-2"
                >
                  <span>إتمام الطلب</span>
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
