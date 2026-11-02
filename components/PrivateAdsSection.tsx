'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Megaphone,
  Phone,
  MessageCircle,
  PlusCircle,
  MapPin,
  CheckCircle,
  Calendar,
  PlayCircle,
  Video,
  X,
  ExternalLink,
} from 'lucide-react';
import { PrivateAd, AdCategory, Language } from '@/lib/types';
import { filterActiveAds, extractYouTubeVideoId } from '@/lib/newsLogic';

interface PrivateAdsSectionProps {
  ads: PrivateAd[];
  selectedState: string;
  selectedDistrict: string;
  selectedMandal: string;
  lang: Language;
  onOpenPostAdModal: () => void;
}

export const PrivateAdsSection: React.FC<PrivateAdsSectionProps> = ({
  ads,
  selectedState,
  selectedDistrict,
  selectedMandal,
  lang,
  onOpenPostAdModal,
}) => {
  const [selectedAdCategory, setSelectedAdCategory] = useState<string>('all');
  const [activeVideoAd, setActiveVideoAd] = useState<PrivateAd | null>(null);

  const filteredAds = filterActiveAds(ads, {
    state: selectedState,
    district: selectedDistrict,
    mandal: selectedMandal,
    category: selectedAdCategory,
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'అన్ని ప్రకటనలు (All)' },
    { id: 'real_estate', label: 'రియల్ ఎస్టేట్' },
    { id: 'jobs', label: 'ఉద్యోగాలు' },
    { id: 'business', label: 'వ్యాపారం' },
    { id: 'education', label: 'విద్య & కోచింగ్' },
    { id: 'matrimony', label: 'శుభకార్యాలు' },
  ];

  const activeVideoId = activeVideoAd?.youtubeUrl
    ? extractYouTubeVideoId(activeVideoAd.youtubeUrl)
    : null;

  return (
    <section className="my-8 bg-amber-50/50 rounded-3xl p-4 sm:p-6 border border-amber-200/80 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-200">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500 text-red-950 shadow-xs">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 font-serif">
              వాణిజ్య ప్రకటనలు & వర్గీకృత సమాచారం (Private Classifieds)
            </h2>
            <p className="text-xs text-slate-600">
              మండల & జిల్లా స్థాయి వ్యాపారాలు, రియల్ ఎస్టేట్, వీడియో ప్రకటనలు మరియు ఉద్యోగ సమాచారం
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPostAdModal}
          className="flex items-center gap-2 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>మీ ప్రకటన ఇవ్వండి (Post Ad)</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedAdCategory(c.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
              selectedAdCategory === c.id
                ? 'bg-red-700 text-white shadow-2xs'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Ads Grid */}
      {filteredAds.length === 0 ? (
        <div className="text-center py-8 bg-white/70 rounded-2xl border border-dashed border-amber-300 p-6">
          <Megaphone className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-70" />
          <p className="text-sm font-bold text-slate-700">
            ఎంచుకున్న మండలంలో ప్రస్తుతం ఎలాంటి ప్రకటనలు లేవు.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            మీ వ్యాపారాన్ని లక్షలాది మందికి చేర్చడానికి ఫోన్ గ్యాలరీ ఫోటో లేదా యూట్యూబ్ వీడియోతో ప్రకటనను సమర్పించండి (అడ్మిన్ ఆమోదం పొందిన తర్వాత కనిపిస్తుంది).
          </p>
          <button
            onClick={onOpenPostAdModal}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-red-700 text-white rounded-lg shadow-2xs hover:bg-red-800"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>ప్రకటనను సమర్పించండి</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAds.map((ad) => {
            const adVideoId = ad.youtubeUrl ? extractYouTubeVideoId(ad.youtubeUrl) : null;
            return (
              <div
                key={ad.id}
                className="bg-white rounded-2xl border border-amber-200/90 shadow-2xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Media Banner: Image or YouTube Video */}
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    {ad.bannerUrl ? (
                      ad.bannerUrl.startsWith('data:') ? (
                        <img
                          src={ad.bannerUrl}
                          alt={ad.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image
                          src={ad.bannerUrl}
                          alt={ad.title}
                          fill
                          sizes="400px"
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-600 to-red-800 text-white font-bold text-sm">
                        వాణిజ్య ప్రకటన
                      </div>
                    )}

                    {/* Admin Verified Badge */}
                    <div className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                      <CheckCircle className="w-3 h-3" />
                      <span>Admin Verified</span>
                    </div>

                    {/* YouTube Video Overlay Trigger if present */}
                    {adVideoId && (
                      <button
                        onClick={() => setActiveVideoAd(ad)}
                        className="absolute inset-0 bg-black/35 hover:bg-black/50 transition flex items-center justify-center cursor-pointer group"
                      >
                        <div className="p-2.5 rounded-full bg-red-600 text-white shadow-lg flex items-center gap-1.5 font-bold text-xs group-hover:scale-105 transition-transform">
                          <PlayCircle className="w-5 h-5 fill-white text-red-600" />
                          <span>వీడియో చూడండి (Watch Video)</span>
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="p-3.5 sm:p-4">
                    <div className="flex items-center justify-between gap-2 text-xs text-red-700 font-bold mb-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{ad.mandal} • {ad.district}</span>
                      </span>
                      {ad.youtubeUrl && (
                        <span className="flex items-center gap-1 text-[10px] text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                          <Video className="w-3 h-3" />
                          వీడియో ప్రకటన
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-slate-900 line-clamp-2 leading-snug">
                      {ad.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {ad.description}
                    </p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-semibold text-slate-700">{ad.advertiserName}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        వరకు: {ad.validTill}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Phone & WhatsApp */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${ad.contactPhone}`}
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg text-xs font-bold transition border border-red-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-red-600" />
                    <span>కాల్ చేయండి</span>
                  </a>
                  <a
                    href={`https://wa.me/91${ad.contactWhatsApp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Ad Modal */}
      {activeVideoAd && activeVideoId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <div className="p-3 bg-slate-800 text-white flex items-center justify-between">
              <span className="text-xs font-bold truncate max-w-[80%]">
                {activeVideoAd.title}
              </span>
              <button
                onClick={() => setActiveVideoAd(null)}
                className="p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0`}
                title={activeVideoAd.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-3 bg-slate-800 flex items-center justify-between text-xs text-slate-300">
              <span>ప్రకటనదారు: {activeVideoAd.advertiserName}</span>
              <a
                href={`tel:${activeVideoAd.contactPhone}`}
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
              >
                కాల్ చేయండి: +91 {activeVideoAd.contactPhone}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
