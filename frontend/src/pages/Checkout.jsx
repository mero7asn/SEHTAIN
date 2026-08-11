import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Banknote, Smartphone, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import API from '../services/api';

export default function Checkout() {
  const { cart, subtotal, vat, deliveryFee, total, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState(user ? user.phone : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const [city, setCity] = useState('الرياض');
  const [district, setDistrict] = useState('');
  const [street, setStreet] = useState('');
  const [building, setBuilding] = useState('');
  const [apartment, setApartment] = useState('');
  const [notes, setNotes] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">السلة فارغة حالياً</h2>
        <Link to="/products" className="inline-block bg-brand-600 text-white px-6 py-2 rounded-xl text-sm font-bold">
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!fullName || !phone || !email || !city || !district || !street) {
      showToast('يرجى ملء كافة البيانات الإلزامية المطلوبة (الاسم، الجوال، البريد، المدينة، الحي، الشارع)', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        customerInfo: { fullName, phone, email },
        items: cart.map(i => ({
          product: i._id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          volume: i.volume,
          packageQuantity: i.packageQuantity,
          image: i.image
        })),
        subtotal,
        vat,
        deliveryFee,
        total,
        shippingAddress: { city, district, street, building, apartment, notes },
        paymentMethod
      };

      const res = await API.post('/orders', orderPayload);
      clearCart();
      showToast('تم إنشاء طلبك بنجاح! شكراً لطلبك من صحتين', 'success');
      navigate(`/order-success/${res.data.orderNumber}`);
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'حدث خطأ أثناء إتمام الطلب', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-black text-slate-900">إتمام الطلب الشراء</h1>
        <p className="text-slate-500 text-sm mt-1">أدخل بيانات التوصيل واختر طريقة الدفع المناسبة</p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Form Sections (Cols 1 & 2) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: Customer Info */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-black">1</span>
              <span>بيانات العميل التواصل</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم الكامل *</label>
                <input 
                  type="text" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  required
                  placeholder="أدخل الاسم الثلاثي"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الجوال *</label>
                <input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required
                  placeholder="05XXXXXXXX"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
                  dir="ltr"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">البريد الإلكتروني *</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required
                  placeholder="example@domain.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 text-left"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-black">2</span>
              <span>عنوان التوصيل السريع</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">المدينة *</label>
                <select 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold"
                >
                  <option value="الرياض">الرياض</option>
                  <option value="جدة">جدة</option>
                  <option value="الدمام">الدمام</option>
                  <option value="مكة المكرمة">مكة المكرمة</option>
                  <option value="المدينة المنورة">المدينة المنورة</option>
                  <option value="الخبر">الخبر</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الحي *</label>
                <input 
                  type="text" 
                  value={district} 
                  onChange={(e) => setDistrict(e.target.value)} 
                  required
                  placeholder="مثال: حي النخيل"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">اسم الشارع والعنوان التفصيلي *</label>
                <input 
                  type="text" 
                  value={street} 
                  onChange={(e) => setStreet(e.target.value)} 
                  required
                  placeholder="مثال: طريق الملك فهد، تقاطع..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم المبنى / الفلة (اختياري)</label>
                <input 
                  type="text" 
                  value={building} 
                  onChange={(e) => setBuilding(e.target.value)} 
                  placeholder="مبنى 12"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الشقة / الدور (اختياري)</label>
                <input 
                  type="text" 
                  value={apartment} 
                  onChange={(e) => setApartment(e.target.value)} 
                  placeholder="شقة 4"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ملاحظات سائق التوصيل (اختياري)</label>
                <textarea 
                  value={notes} 
                  onChange={(e) => setNotes(e.target.value)} 
                  rows={2}
                  placeholder="مثال: يرجى الاتصال قبل الوصول بـ 15 دقيقة..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span className="w-7 h-7 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-xs font-black">3</span>
              <span>طريقة الدفع</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <label className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between space-y-3 transition ${
                paymentMethod === 'cod' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <div className="flex justify-between items-center">
                  <Banknote className="w-6 h-6 text-brand-600" />
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod" 
                    checked={paymentMethod === 'cod'} 
                    onChange={() => setPaymentMethod('cod')} 
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">الدفع عند الاستلام</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">ادفع نقداً أو شبكة للمندوب</p>
                </div>
              </label>

              <label className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between space-y-3 transition ${
                paymentMethod === 'card' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <div className="flex justify-between items-center">
                  <CreditCard className="w-6 h-6 text-brand-600" />
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card" 
                    checked={paymentMethod === 'card'} 
                    onChange={() => setPaymentMethod('card')} 
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">بطاقة ائتمانية</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">مدى / فيزا / ماستركارد</p>
                </div>
              </label>

              <label className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between space-y-3 transition ${
                paymentMethod === 'applepay' ? 'border-brand-600 bg-brand-50/50' : 'border-slate-200 hover:border-slate-300'
              }`}>
                <div className="flex justify-between items-center">
                  <Smartphone className="w-6 h-6 text-brand-600" />
                  <input 
                    type="radio" 
                    name="payment" 
                    value="applepay" 
                    checked={paymentMethod === 'applepay'} 
                    onChange={() => setPaymentMethod('applepay')} 
                    className="w-4 h-4 text-brand-600 focus:ring-brand-500"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">Apple Pay</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">دفع سريع وآمن بنقرة واحدة</p>
                </div>
              </label>

            </div>
          </div>

        </div>

        {/* Order Summary Column (Col 3) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6 sticky top-28">
          <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">ملخص الطلب</h3>

          {/* Mini Items list */}
          <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-700">{item.quantity}x</span>
                  <span className="font-medium text-slate-800 line-clamp-1">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 shrink-0">{(item.price * item.quantity).toFixed(2)} ريال</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
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

          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            <span className="font-bold text-slate-900 text-sm">الإجمالي النهائي:</span>
            <span className="font-black text-brand-600 text-2xl">{total.toFixed(2)} ريال</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-2xl font-black text-base transition shadow-xl shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {submitting ? (
              <span>جاري تأكيد الطلب...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>تأكيد الطلب الآن</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
