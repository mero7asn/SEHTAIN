import React, { useState, useEffect } from 'react';
import API from '../services/api';
import ProductGrid from '../components/product/ProductGrid';
import { Users, Droplets, ShieldCheck } from 'lucide-react';

export default function Individuals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products?category=individuals');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-brand-900 to-sky-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl">
        <div className="w-14 h-14 bg-brand-500/20 text-brand-300 rounded-2xl flex items-center justify-center mx-auto border border-brand-400/30">
          <Users className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">مياه صحتين للأفراد والعائلات</h1>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          تشكيلة متنوعة من العبوات المصممة بعناية لتناسب استخداماتك الاستهلاكية اليومية والرحلات والأنشطة العائلية في المنازل.
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid products={products} loading={loading} />

    </div>
  );
}
