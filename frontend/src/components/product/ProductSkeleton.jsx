import React from 'react';

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 animate-pulse">
      <div className="bg-slate-100 rounded-xl aspect-square w-full" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-100 rounded-md w-3/4" />
        <div className="h-3 bg-slate-100 rounded-md w-1/2" />
      </div>
      <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
        <div className="h-6 bg-slate-100 rounded-md w-1/3" />
        <div className="h-9 bg-slate-100 rounded-xl w-1/2" />
      </div>
    </div>
  );
}
