'use client';

import React from 'react';
import {
  Globe2,
  MapPin,
  Video,
  Landmark,
  Sprout,
  Film,
  Trophy,
  Megaphone,
  Briefcase,
  ShieldAlert,
  PlusCircle,
} from 'lucide-react';
import { NewsCategory, Language } from '@/lib/types';
import { getTranslation } from '@/lib/translations';

interface NavigationTabsProps {
  activeCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  lang: Language;
  onOpenPostAdModal: () => void;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeCategory,
  onSelectCategory,
  lang,
  onOpenPostAdModal,
}) => {
  const tabs: { id: NewsCategory; labelKey: string; icon: React.ReactNode }[] = [
    { id: 'all', labelKey: 'allNews', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'mandal', labelKey: 'mandalNews', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'district', labelKey: 'districtNews', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'state', labelKey: 'stateNews', icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: 'national', labelKey: 'nationalNews', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'video', labelKey: 'videoNews', icon: <Video className="w-3.5 h-3.5" /> },
    { id: 'agriculture', labelKey: 'agriculture', icon: <Sprout className="w-3.5 h-3.5" /> },
    { id: 'politics', labelKey: 'politics', icon: <Landmark className="w-3.5 h-3.5" /> },
    { id: 'crime', labelKey: 'crime', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
    { id: 'cinema', labelKey: 'cinema', icon: <Film className="w-3.5 h-3.5" /> },
    { id: 'sports', labelKey: 'sports', icon: <Trophy className="w-3.5 h-3.5" /> },
    { id: 'business', labelKey: 'business', icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  return (
    <nav className="bg-red-700 text-white shadow-md sticky top-[108px] lg:top-[76px] z-30">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between overflow-x-auto scrollbar-none py-1.5">
        <div className="flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-red-950 shadow-sm'
                    : 'text-white/90 hover:bg-red-800/80 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{getTranslation(lang, tab.labelKey)}</span>
              </button>
            );
          })}
        </div>

        {/* Post Private Ad CTA */}
        <button
          onClick={onOpenPostAdModal}
          className="ml-3 shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-red-950 font-black text-xs transition cursor-pointer shadow-sm border border-amber-500"
        >
          <PlusCircle className="w-3.5 h-3.5 text-red-800" />
          <span>{getTranslation(lang, 'postAd')}</span>
        </button>
      </div>
    </nav>
  );
};
