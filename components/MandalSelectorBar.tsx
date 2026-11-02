'use client';

import React from 'react';
import { MapPin, Navigation, Filter, RotateCcw } from 'lucide-react';
import {
  getAllStates,
  getDistrictsForState,
  getMandalsForDistrict,
} from '@/lib/indiaData';
import { Language } from '@/lib/types';
import { getTranslation } from '@/lib/translations';

interface MandalSelectorBarProps {
  selectedState: string;
  selectedDistrict: string;
  selectedMandal: string;
  onSelectState: (state: string) => void;
  onSelectDistrict: (district: string) => void;
  onSelectMandal: (mandal: string) => void;
  onResetLocation: () => void;
  lang: Language;
}

export const MandalSelectorBar: React.FC<MandalSelectorBarProps> = ({
  selectedState,
  selectedDistrict,
  selectedMandal,
  onSelectState,
  onSelectDistrict,
  onSelectMandal,
  onResetLocation,
  lang,
}) => {
  const states = getAllStates();
  const districts = selectedState ? getDistrictsForState(selectedState) : [];
  const mandals = selectedState && selectedDistrict ? getMandalsForDistrict(selectedState, selectedDistrict) : [];

  const hasFilter =
    selectedState !== 'all' ||
    selectedDistrict !== 'all' ||
    selectedMandal !== 'all';

  return (
    <div className="bg-amber-50/70 border-b border-amber-200/80 py-2.5 px-3 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Title / Info */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-red-900 shrink-0">
          <div className="p-1 rounded-md bg-red-100 text-red-700">
            <Navigation className="w-4 h-4 text-red-700" />
          </div>
          <span className="font-extrabold text-amber-950">హైపర్‌లోకల్ వార్తలు:</span>
          <span className="text-slate-600 hidden sm:inline">రాష్ట్రం, జిల్లా మరియు మండలాన్ని ఎంచుకోండి</span>
        </div>

        {/* 3-Tier Cascading Selectors */}
        <div className="flex flex-wrap items-center gap-2 flex-1 md:justify-end">
          {/* State Selector */}
          <div className="relative min-w-[130px] sm:min-w-[160px] flex-1 sm:flex-initial">
            <select
              value={selectedState}
              onChange={(e) => {
                onSelectState(e.target.value);
              }}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-600 text-slate-800 shadow-2xs cursor-pointer"
            >
              <option value="all">అఖిల భారతం (All India)</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="relative min-w-[130px] sm:min-w-[160px] flex-1 sm:flex-initial">
            <select
              value={selectedDistrict}
              onChange={(e) => {
                onSelectDistrict(e.target.value);
              }}
              disabled={selectedState === 'all' || districts.length === 0}
              className="w-full text-xs font-semibold bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-red-600 text-slate-800 shadow-2xs cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
            >
              <option value="all">అన్ని జిల్లాలు (All Districts)</option>
              {districts.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Mandal Selector */}
          <div className="relative min-w-[150px] sm:min-w-[180px] flex-1 sm:flex-initial">
            <select
              value={selectedMandal}
              onChange={(e) => onSelectMandal(e.target.value)}
              disabled={selectedDistrict === 'all' || mandals.length === 0}
              className="w-full text-xs font-bold bg-white border border-red-300 text-red-900 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-600 shadow-2xs cursor-pointer disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-300"
            >
              <option value="all">అన్ని మండలాలు (All Mandals)</option>
              {mandals.map((m) => (
                <option key={m} value={m}>
                  📍 {m}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Filter Button */}
          {hasFilter && (
            <button
              onClick={onResetLocation}
              className="flex items-center gap-1 text-xs font-bold px-2 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition cursor-pointer shadow-2xs"
              title="ఫిల్టర్ తీసివేయండి"
            >
              <RotateCcw className="w-3 h-3" />
              <span>రీసెట్</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Mandal Banner Indicator */}
      {selectedMandal !== 'all' && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-red-800 font-extrabold">
            <MapPin className="w-3.5 h-3.5 fill-red-600 text-white" />
            <span>ప్రస్తుతం ప్రదర్శిస్తున్న మండల వార్తలు:</span>
            <span className="bg-red-700 text-white px-2 py-0.5 rounded text-[11px] tracking-wide">
              {selectedMandal}
            </span>
          </div>
          <span className="text-[11px] text-slate-600 font-medium">
            ఈ మండలంలోని ప్రత్యక్ష సమాచారం మాత్రమే చూపబడుతుంది
          </span>
        </div>
      )}
    </div>
  );
};
