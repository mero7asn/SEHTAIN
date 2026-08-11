import React from 'react';
import { Star } from 'lucide-react';

export default function RatingStars({ rating = 5, size = 'sm' }) {
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${starSize} ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
        />
      ))}
    </div>
  );
}
