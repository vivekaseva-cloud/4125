'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Play, Video, Eye, ExternalLink, Share2 } from 'lucide-react';
import { NewsArticle, Language } from '@/lib/types';
import { extractYouTubeVideoId, formatViewCount } from '@/lib/newsLogic';

interface VideoNewsSectionProps {
  articles: NewsArticle[];
  lang: Language;
  onSelectArticle: (article: NewsArticle) => void;
}

export const VideoNewsSection: React.FC<VideoNewsSectionProps> = ({
  articles,
  lang,
  onSelectArticle,
}) => {
  const videoArticles = articles.filter(
    (a) => a.youtubeUrl && a.status === 'published'
  );

  const [activeVideo, setActiveVideo] = useState<NewsArticle | null>(
    videoArticles[0] || null
  );

  if (videoArticles.length === 0) return null;

  const currentVideoId = extractYouTubeVideoId(activeVideo?.youtubeUrl);

  return (
    <section className="bg-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-xl my-8 border border-slate-800">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-red-600 text-white shadow-md">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black font-serif tracking-wide text-white">
              వీడియో న్యూస్ బులెటిన్లు (Video News & YouTube Updates)
            </h2>
            <p className="text-xs text-slate-400">
              క్షేత్రస్థాయి వీడియో నివేదికలు & ప్రత్యేక ముఖ్యాంశాలు
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-800/80">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          ప్రత్యక్ష నవీకరణలు
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Video Player */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-slate-800">
            {currentVideoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=0&rel=0`}
                title={activeVideo?.title[lang] || activeVideo?.title.te || 'Video'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-500">
                వీడియో లోడ్ అవుతోంది...
              </div>
            )}
          </div>

          {activeVideo && (
            <div className="p-2">
              <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
                <span className="text-amber-400 font-bold">
                  📍 {activeVideo.mandal} • {activeVideo.district}
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  {formatViewCount(activeVideo.views)} వ్యూస్
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif line-clamp-2">
                {activeVideo.title[lang] || activeVideo.title.te}
              </h3>
              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                {activeVideo.summary[lang] || activeVideo.summary.te}
              </p>
            </div>
          )}
        </div>

        {/* Video Playlist / Side list */}
        <div className="space-y-3 flex flex-col justify-between">
          <div className="space-y-2 overflow-y-auto max-h-[380px] pr-1">
            {videoArticles.map((item) => {
              const isSelected = activeVideo?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideo(item)}
                  className={`p-2.5 rounded-xl flex items-center gap-3 cursor-pointer transition border ${
                    isSelected
                      ? 'bg-red-950/60 border-red-700/80 text-white'
                      : 'bg-slate-800/60 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt="వీడియో"
                        fill
                        sizes="100px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white text-white drop-shadow-md" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-amber-400 font-bold block truncate">
                      {item.mandal || item.district}
                    </span>
                    <h4 className="text-xs font-bold line-clamp-2 text-white">
                      {item.title[lang] || item.title.te}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatViewCount(item.views)} వ్యూస్
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {activeVideo && (
            <button
              onClick={() => onSelectArticle(activeVideo)}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>పూర్తి వ్యాసం చదవండి & షేర్ చేయండి</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
