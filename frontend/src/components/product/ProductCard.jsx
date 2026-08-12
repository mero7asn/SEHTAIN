import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import RatingStars from '../ui/RatingStars';
import MediaPlayer from '../ui/MediaPlayer';

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleQtyChange = (e, delta) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const effectivePrice = product.discountPrice && product.discountPrice > 0 
    ? product.discountPrice 
    : product.price;

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md hover:border-zinc-300 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between overflow-hidden group">
      
      {/* Top Image Container */}
      <Link to={`/products/${product._id}`} className="block relative bg-zinc-50 overflow-hidden aspect-square border-b border-zinc-100">
        <MediaPlayer
          mediaMode={product.mediaMode || 'single_image'}
          images={product.images || []}
          videos={product.videos || []}
          introVideo={product.introVideo || ''}
          defaultImage="https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=600&q=80"
          className="w-full h-full"
          objectFit="contain"
        />
        
        {/* Discount Badge */}
        {product.discountPrice > 0 && (
          <span className="absolute top-3 right-3 bg-zinc-900 text-white text-[11px] font-black px-2.5 py-1 rounded-full shadow-2xs">
            خصم {Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
          </span>
        )}

        {/* Volume Tag */}
        <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-zinc-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-zinc-200 shadow-2xs">
          {product.volume}
        </span>
      </Link>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span className="font-bold text-zinc-800 bg-zinc-100 border border-zinc-200 px-2 py-0.5 rounded-md">
              {product.packageQuantity} عبوة
            </span>
            <RatingStars rating={5} size="sm" />
          </div>

          <Link to={`/products/${product._id}`} className="block">
            <h3 className="font-extrabold text-zinc-900 text-base group-hover:text-black transition leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-2 leading-relaxed font-medium">
            {product.description}
          </p>
        </div>

        {/* Pricing & Controls */}
        <div className="pt-3 border-t border-zinc-100 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-500 font-medium">السعر شامل الضريبة:</span>
            <div className="text-left">
              {product.discountPrice > 0 ? (
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-zinc-900">{product.discountPrice.toFixed(2)}</span>
                  <span className="text-xs font-bold text-zinc-900">ريال</span>
                  <span className="text-xs text-zinc-400 line-through font-medium">{product.price.toFixed(2)}</span>
                </div>
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-zinc-900">{product.price.toFixed(2)}</span>
                  <span className="text-xs font-bold text-zinc-900">ريال</span>
                </div>
              )}
            </div>
          </div>

          {/* Quantity Selector & Add Button */}
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden shrink-0">
              <button 
                onClick={(e) => handleQtyChange(e, -1)}
                className="p-2 text-zinc-700 hover:bg-zinc-200 transition"
                title="إنقاص"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-3 font-extrabold text-xs text-zinc-900">{quantity}</span>
              <button 
                onClick={(e) => handleQtyChange(e, 1)}
                className="p-2 text-zinc-700 hover:bg-zinc-200 transition"
                title="زيادة"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-grow py-2.5 px-3 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 transition duration-200 ${
                added 
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'bg-zinc-900 hover:bg-black text-white shadow-xs active:scale-95'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تمت الإضافة</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة إلى السلة</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
