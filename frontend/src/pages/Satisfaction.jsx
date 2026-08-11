import React, { useState, useEffect } from 'react';
import { Heart, Star, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import API from '../services/api';
import { useToast } from '../context/ToastContext';
import RatingStars from '../components/ui/RatingStars';

export default function Satisfaction() {
  const { showToast } = useToast();

  const [name, setName] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fetchReviews = async () => {
    try {
      const res = await API.get('/reviews');
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!name || !comment) {
      showToast('يرجى كتابة الاسم والتعليق', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await API.post('/reviews', {
        name,
        orderNumber,
        rating,
        comment
      });
      showToast('شكراً لتقييمك! تم إرسال التقييم بنجاح', 'success');
      setSubmitted(true);
      setName('');
      setOrderNumber('');
      setComment('');
      fetchReviews();
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'حدث خطأ أثناء إرسال التقييم', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 via-sky-900 to-slate-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-4 shadow-xl">
        <div className="w-16 h-16 bg-rose-500/20 text-rose-300 rounded-2xl flex items-center justify-center mx-auto border border-rose-400/30">
          <Heart className="w-8 h-8 fill-rose-400 text-rose-400" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">رضاك أولويتنا المطلقة</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          نحن نهتم بتجربتك ونعمل باستمرار على تطوير خدماتنا لتلائم تطلعاتك. رأيك يسعدنا ويوجه مسيرتنا نحو الأفضل.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Review Submission Form (Col 1) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900">تقييم الخدمة والمنتج</h2>
            <p className="text-xs text-slate-400 mt-1">شاركتنا انطباعك عن تجربتك الأخيرة مع صحتين</p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3 bg-emerald-50 rounded-2xl p-6 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">تم إرسال تقييمك بنجاح!</h3>
              <p className="text-xs text-slate-600">نشكرك على وقتك ومشاركتنا رأيك القيم.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-xs font-bold text-emerald-700 underline pt-2"
              >
                إضافة تقييم آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">الاسم *</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="أدخل اسمك"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">رقم الطلب (اختياري)</label>
                <input 
                  type="text" 
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="مثال: #SH-100245"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">درجة التقييم *</label>
                <div className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-125 transition"
                    >
                      <Star className={`w-7 h-7 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">ملاحظاتك وتعليقك *</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                  rows={4}
                  placeholder="اكتب انطباعك عن جودة المياه، التوصيل، التعامل..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white py-3.5 rounded-2xl font-bold text-sm transition shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>إرسال التقييم</span>
              </button>
            </form>
          )}

        </div>

        {/* Reviews Feed (Cols 2 & 3) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>آراء وتقييمات العملاء</span>
            </h2>
            <span className="text-xs text-slate-400 font-bold">{reviews.length} تقييمات</span>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-400 text-sm">جاري تحميل الآراء...</div>
          ) : reviews.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200">
              لا توجد تقييمات معروضة حالياً. كن أول من يشاركنا رأيه!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviews.map((rev) => (
                <div key={rev._id} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{rev.name}</h4>
                      {rev.orderNumber && (
                        <span className="text-[10px] font-bold text-slate-400">طلب رقم {rev.orderNumber}</span>
                      )}
                    </div>
                    <RatingStars rating={rev.rating} size="sm" />
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    "{rev.comment}"
                  </p>
                  <div className="text-[10px] text-slate-400 text-left">
                    {new Date(rev.createdAt).toLocaleDateString('ar-SA')}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
