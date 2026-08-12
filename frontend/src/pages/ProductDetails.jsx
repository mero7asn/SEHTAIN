import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, ShieldCheck, Truck, Droplets, Check, ArrowRight, Package } from 'lucide-react';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import RatingStars from '../components/ui/RatingStars';
import Accordion from '../components/ui/Accordion';
import MediaPlayer from '../components/ui/MediaPlayer';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        جاري تحميل تفاصيل المنتج...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">عذراً، لم نتمكن من العثور على المنتج.</h2>
        <Link to="/products" className="inline-block bg-brand-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm">
          العودة للمنتجات
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const specAccordionItems = [
    {
      title: 'المواصفات الفنية والتعبئة',
      content: (
        <ul className="space-y-2 text-slate-600">
          <li><strong>رمز المنتج (SKU):</strong> {product.sku}</li>
          <li><strong>سعة العبوة:</strong> {product.volume}</li>
          <li><strong>عدد العبوات في الشدة:</strong> {product.packageQuantity} عبوة</li>
          <li><strong>الوزن الإجمالي التقريبي:</strong> {product.weight || 'غير محدد'}</li>
          <li><strong>نوع التعبئة:</strong> كرتون/شدة بلاستيك عالية الجودة</li>
        </ul>
      )
    },
    {
      title: 'معلومات الشحن والتوصيل',
      content: 'يتم التوصيل بواسطة شاحنات مبردة مخصصة لنقل المياه للحفاظ على درجة الحرارة المناسبة والجودة العالية. يتم التوصيل خلال 24-48 ساعة عمل.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
        <Link to="/" className="hover:text-brand-600">الرئيسية</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-brand-600">المنتجات</Link>
        <span>/</span>
        <span className="text-slate-700 font-bold">{product.name}</span>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left/Right Images Column */}
        <div className="space-y-4">
          {['two_videos', 'single_video', 'loop_videos', 'loop_images'].includes(product.mediaMode) ? (
            <div className="bg-white rounded-3xl border border-slate-200 aspect-square relative overflow-hidden shadow-xs">
              <MediaPlayer
                mediaMode={product.mediaMode || 'single_image'}
                images={product.images || []}
                videos={product.videos || []}
                introVideo={product.introVideo || ''}
                defaultImage="https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=800&q=80"
                className="w-full h-full"
                objectFit="contain"
              />
              <span className="absolute top-4 right-4 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-brand-200 z-10">
                {product.volume}
              </span>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 aspect-square flex items-center justify-center relative overflow-hidden shadow-xs">
              <img 
                src={product.images && product.images.length > 0 ? product.images[selectedImage] : ''} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain"
              />
              <span className="absolute top-4 right-4 bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-brand-200">
                {product.volume}
              </span>
            </div>
          )}

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && ['single_image', 'loop_images'].includes(product.mediaMode) && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white overflow-hidden transition ${
                    selectedImage === idx ? 'border-brand-600 shadow-md' : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Information Column */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-lg">
                {product.packageQuantity} عبوة
              </span>
              <RatingStars rating={5} size="md" />
              <span className="text-xs text-slate-400 font-medium">(12 تقييم)</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="text-xs text-slate-400 mt-1">رمز المنتج (SKU): {product.sku}</p>
          </div>

          {/* Price Box */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 block font-medium">السعر (شامل الضريبة 15%):</span>
              <div className="flex items-baseline gap-2 mt-1">
                {product.discountPrice > 0 ? (
                  <>
                    <span className="text-3xl font-black text-brand-600">{product.discountPrice.toFixed(2)}</span>
                    <span className="text-sm font-bold text-brand-600">ريال</span>
                    <span className="text-sm text-slate-400 line-through mr-2">{product.price.toFixed(2)}</span>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-black text-slate-900">{product.price.toFixed(2)}</span>
                    <span className="text-sm font-bold text-slate-900">ريال</span>
                  </>
                )}
              </div>
            </div>

            <div className="text-left text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              متوفر بالمخزون ({product.stock} شدة)
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold text-slate-800 text-sm mb-2">الوصف:</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          {/* Quantity Selector & Action Buttons */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="font-bold text-slate-700 text-sm">الكمية:</span>
              <div className="flex items-center border border-slate-300 rounded-2xl bg-white overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-slate-600 hover:bg-slate-100 transition"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-black text-sm text-slate-800">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-slate-600 hover:bg-slate-100 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-2xl font-bold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
                  added 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/25 active:scale-95'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>تمت الإضافة بنجاح</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>إضافة إلى السلة</span>
                  </>
                )}
              </button>

              <Link
                to="/checkout"
                onClick={handleAddToCart}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-bold text-sm transition text-center flex items-center justify-center gap-2"
              >
                <span>شراء الآن مباشر</span>
                <ArrowRight className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>

          {/* Specifications Accordions */}
          <div className="pt-6">
            <Accordion items={specAccordionItems} />
          </div>

        </div>

      </div>
    </div>
  );
}
