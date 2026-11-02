'use client';

import React from 'react';
import { Flame, ChevronRight } from 'lucide-react';
import { NewsArticle, Language } from '@/lib/types';

interface BreakingTickerProps {
  articles: NewsArticle[];
  lang: Language;
  onSelectArticle: (article: NewsArticle) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({
  articles,
  lang,
  onSelectArticle,
}) => {
  const breakingArticles = articles.filter(
    (a) => a.isBreaking && a.status === 'published'
  );

  const displayList = breakingArticles.length > 0 ? breakingArticles : articles.slice(0, 3);

  if (displayList.length === 0) return null;

  return (
    <div className="bg-red-800 text-white border-y border-red-900 shadow-sm overflow-hidden flex items-stretch">
      <div className="bg-amber-400 text-red-950 px-3 sm:px-4 py-2 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center gap-1.5 shrink-0 z-10 shadow-md">
        <Flame className="w-4 h-4 animate-bounce text-red-700 fill-red-600" />
        <span>తాజా ముఖ్యాంశాలు</span>
      </div>

      <div className="relative flex-1 overflow-x-auto py-2 px-3 flex items-center gap-6 whitespace-nowrap scrollbar-none text-xs sm:text-sm font-medium">
        {displayList.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => onSelectArticle(item)}
            className="inline-flex items-center gap-2 hover:text-amber-200 transition-colors cursor-pointer group text-left"
          >
            <span className="text-amber-300 font-bold">[{item.mandal || item.district}]</span>
            <span className="group-hover:underline">
              {item.title[lang] || item.title.te}
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-red-300 opacity-60 inline-block" />
            {idx < displayList.length - 1 && (
              <span className="text-red-400 mx-2">•</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
