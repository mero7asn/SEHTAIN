import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Accordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div 
            key={idx} 
            className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full p-5 text-right flex justify-between items-center font-bold text-slate-800 text-base hover:text-brand-600 transition"
            >
              <span>{item.title}</span>
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-600' : ''}`} />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/50">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
