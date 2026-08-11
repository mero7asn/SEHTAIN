import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = '/products';
        if (selectedCategory !== 'all') {
          url += `?category=${selectedCategory}`;
        }
        const res = await API.get(url);
        let list = res.data;

        if (sortBy === 'price-low') {
          list = [...list].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        } else if (sortBy === 'price-high') {
          list = [...list].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        }

        setProducts(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const categories = [
    { id: 'all', name: 'جميع المنتجات' },
    { id: 'individuals', name: 'الأفراد والعائلات' },
    { id: 'business', name: 'الأعمال والضيافة' },
    { id: 'charity', name: 'سقيا المساجد والخير' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Title Header */}
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-3 relative overflow-hidden shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-black">منتجات مياه صحتين</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          اختر الحجم والعبوة المناسبة لاحتياجاتك اليومية. جميع الأسعار شاملة الضريبة 15% وتوصيل مبرد.
        </p>
      </div>

      {/* Filter & Sort Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 shrink-0 ml-2">
            <Filter className="w-4 h-4" />
            <span>التصنيف:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <SlidersHorizontal className="w-4 h-4 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-slate-100 border-none text-slate-700 text-xs font-bold rounded-xl px-3 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="price-low">السعر: من الأقل للأعلى</option>
            <option value="price-high">السعر: من الأعلى للأقل</option>
          </select>
        </div>

      </div>

      {/* Product Grid */}
      <ProductGrid products={products} loading={loading} />

    </div>
  );
}
