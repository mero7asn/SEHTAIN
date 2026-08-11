import React, { useState, useEffect } from 'react';
import { Package, Clock, Calendar, ChevronRight } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'تم التوصيل':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'خرج للتوصيل':
        return 'bg-sky-100 text-sky-800 border-sky-300';
      case 'قيد التجهيز':
      case 'قيد المعالجة':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'ملغي':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">يرجى تسجيل الدخول أولاً</h2>
        <Link to="/login" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">طلباتي السابقة</h1>
          <p className="text-slate-500 text-sm mt-1">عرض حالة جميع طلبات التوصيل وتتبع الشحنات</p>
        </div>
        <Link to="/account" className="text-xs font-bold text-brand-600 hover:underline">
          العودة لحسابي
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-400 text-sm">جاري تحميل الطلبات...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200 space-y-4">
          <Package className="w-12 h-12 mx-auto text-slate-300" />
          <h3 className="text-lg font-bold text-slate-700">لا توجد طلبات مسجلة</h3>
          <p className="text-xs text-slate-400">تصفح المنتجات واطلب مياه صحتين الآن لتصلك حار بحار.</p>
          <Link to="/products" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold">
            تسوق المنتجات
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div key={ord._id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">رقم الطلب</span>
                  <span className="text-lg font-black text-brand-600">#{ord.orderNumber}</span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{new Date(ord.createdAt).toLocaleDateString('ar-SA')}</span>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-black border ${getStatusColor(ord.orderStatus)}`}>
                    {ord.orderStatus}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold bg-white px-2 py-0.5 rounded border border-slate-200">{item.quantity}x</span>
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-slate-400">({item.volume})</span>
                    </div>
                    <span className="font-bold text-slate-900">{(item.price * item.quantity).toFixed(2)} ريال</span>
                  </div>
                ))}
              </div>

              {/* Order Foot Breakdown */}
              <div className="pt-2 flex justify-between items-center text-xs border-t border-slate-100">
                <div className="text-slate-500">
                  <span>طريقة الدفع: </span>
                  <span className="font-bold text-slate-800">
                    {ord.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : ord.paymentMethod === 'card' ? 'بطاقة ائتمانية' : 'Apple Pay'}
                  </span>
                </div>

                <div className="text-left">
                  <span className="text-slate-500 font-medium ml-1">الإجمالي:</span>
                  <span className="text-base font-black text-brand-600">{ord.total.toFixed(2)} ريال</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
