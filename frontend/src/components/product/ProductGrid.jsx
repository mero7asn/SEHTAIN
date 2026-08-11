import React from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { PackageX } from 'lucide-react';

export default function ProductGrid({ products = [], loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-xs">
        <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <PackageX className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-1">لا توجد منتجات متاحة حالياً</h3>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          نعمل على إضافة منتجات جديدة قريباً. يرجى العودة لاحقاً أو التحقق من التصنيفات الأخرى.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
