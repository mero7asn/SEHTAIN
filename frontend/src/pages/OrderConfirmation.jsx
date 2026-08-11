import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, ArrowLeft, Home, Calendar, MapPin, Truck } from 'lucide-react';
import API from '../services/api';

export default function OrderConfirmation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchOrder();
    } else {
      setLoading(false);
    }
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      
      {/* Success Badge Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">✓ تم استلام طلبك بنجاح</h1>
          <p className="text-slate-500 text-sm">شكراً لطلبك من صحتين للمياه النقية.</p>
        </div>

        {/* Order Reference Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 max-w-md mx-auto space-y-2">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">رقم الطلب المرجعي</span>
          <span className="text-3xl font-black text-brand-600 tracking-wider block">#{id || 'SH-100245'}</span>
          <p className="text-xs text-slate-500 pt-1">سيتم التواصل معك هاتفياً لتأكيد موعد التوصيل المبرد</p>
        </div>

        {order && (
          <div className="text-right border-t border-slate-100 pt-6 space-y-3 text-xs text-slate-600 max-w-md mx-auto">
            <div className="flex justify-between">
              <span>العميل:</span>
              <span className="font-bold text-slate-800">{order.customerInfo?.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span>طريقة الدفع:</span>
              <span className="font-bold text-slate-800">
                {order.paymentMethod === 'cod' ? 'الدفع عند الاستلام' : order.paymentMethod === 'card' ? 'بطاقة ائتمانية' : 'Apple Pay'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>إجمالي المبلغ:</span>
              <span className="font-bold text-brand-600 text-sm">{order.total.toFixed(2)} ريال</span>
            </div>
          </div>
        )}

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/orders"
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-brand-500/25 flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            <span>متابعة حالة الطلب</span>
          </Link>

          <Link
            to="/"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3.5 rounded-2xl font-bold text-sm transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
