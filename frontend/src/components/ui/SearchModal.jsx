import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { useCart } from '../../context/CartContext';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products?search=${encodeURIComponent(query)}`);
        setResults(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-brand-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن منتج بالاسم، الحجم، الكود (SKU)..."
            autoFocus
            className="w-full bg-transparent text-slate-800 text-lg placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-600 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium transition"
          >
            إلغاء
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {loading && (
            <div className="text-center py-8 text-slate-400 text-sm">
              جاري البحث عن المنتجات...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 font-medium">لم يتم العثور على نتائج تطابق "{query}"</p>
              <p className="text-slate-400 text-xs mt-1">تأكد من كتابة الاسم أو الحجم بشكل صحيح</p>
            </div>
          )}

          {!loading && !query && (
            <div className="py-4 text-center text-slate-400 text-sm">
              اكتب كلمة البحث للبدء (مثال: 500 مل، 330 مل، 1.5 لتر)
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                نتائج البحث ({results.length})
              </p>
              {results.map((product) => (
                <div 
                  key={product._id}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition"
                >
                  <Link 
                    to={`/products/${product._id}`}
                    onClick={onClose}
                    className="flex items-center gap-4 flex-grow"
                  >
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg border border-slate-100" 
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800 hover:text-brand-600 transition">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {product.packageQuantity} عبوة | {product.volume} | SKU: {product.sku}
                      </p>
                      <div className="text-brand-600 font-bold text-sm mt-1">
                        {product.discountPrice ? (
                          <span className="flex items-center gap-2">
                            <span>{product.discountPrice} ريال</span>
                            <span className="text-slate-400 line-through text-xs">{product.price} ريال</span>
                          </span>
                        ) : (
                          <span>{product.price} ريال</span>
                        )}
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      onClose();
                    }}
                    className="bg-brand-50 hover:bg-brand-100 text-brand-700 px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition shrink-0"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    إضافة للسلة
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
