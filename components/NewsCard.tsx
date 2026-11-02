'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Eye,
  Share2,
  Copy,
  Check,
  PlayCircle,
  ExternalLink,
  MapPin,
  Clock,
  UserCheck,
} from 'lucide-react';
import { NewsArticle, Language } from '@/lib/types';
import { formatViewCount } from '@/lib/newsLogic';
import { copyToClipboard } from '@/lib/utils';

interface NewsCardProps {
  article: NewsArticle;
  lang: Language;
  onReadMore: (article: NewsArticle) => void;
  onOpenNewWindow: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  lang,
  onReadMore,
  onOpenNewWindow,
}) => {
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const titleText = article.title[lang] || article.title.te;
  const summaryText = article.summary[lang] || article.summary.te;

  const publishedDate = new Intl.DateTimeFormat('te-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(article.publishedAt));

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/news/${article.id}`;
    await copyToClipboard(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter', e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/news/${article.id}`;
    const text = encodeURIComponent(`${titleText}\n\nవార్త చదవండి: ${shareUrl}`);

    let url = '';
    if (platform === 'whatsapp') {
      url = `https://api.whatsapp.com/send?text=${text}`;
    } else if (platform === 'facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    } else if (platform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(titleText)}&url=${encodeURIComponent(shareUrl)}`;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setShowShareMenu(false);
  };

  return (
    <article className="group bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between">
      <div>
        {/* Thumbnail & Media Badges */}
        <div
          onClick={() => onReadMore(article)}
          className="relative aspect-video w-full bg-slate-100 overflow-hidden cursor-pointer"
        >
          {article.imageUrl ? (
            <Image
              src={article.imageUrl}
              alt={titleText}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-900 to-amber-900 text-white font-bold text-lg">
              నేటి భారతం
            </div>
          )}

          {/* Video Badge */}
          {article.youtubeUrl && (
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/40 transition">
              <div className="p-2.5 rounded-full bg-red-600 text-white shadow-lg flex items-center gap-1.5 font-bold text-xs">
                <PlayCircle className="w-6 h-6 fill-white text-red-600" />
                <span>వీడియో న్యూస్</span>
              </div>
            </div>
          )}

          {/* Location / Category Pill */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            {article.isBreaking && (
              <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded-md shadow-xs uppercase tracking-wider animate-pulse">
                Breaking
              </span>
            )}
            <span className="bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              {article.mandal !== 'అన్ని మండలాలు' ? article.mandal : article.district}
            </span>
          </div>

          {/* Public Live Views Count Overlay */}
          <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-xs font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-xs">
            <Eye className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatViewCount(article.views)} వీక్షణలు</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-4">
          {/* Metadata row */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-red-600" />
              <span className="font-semibold text-slate-700 truncate max-w-[140px]">
                {article.authorName}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{publishedDate}</span>
            </div>
          </div>

          {/* Headline */}
          <h3
            onClick={() => onReadMore(article)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-red-700 transition-colors line-clamp-2 cursor-pointer leading-snug font-serif"
          >
            {titleText}
          </h3>

          {/* Summary */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {summaryText}
          </p>
        </div>
      </div>

      {/* Card Footer: Read More + Social Share buttons */}
      <div className="px-3.5 sm:px-4 pb-3.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2 bg-slate-50/50">
        {/* Read More button */}
        <button
          onClick={() => onReadMore(article)}
          className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 hover:underline cursor-pointer"
        >
          <span>పూర్తి వివరాలు</span>
          <span className="text-sm">→</span>
        </button>

        {/* Open in New Window button (requested explicitly) */}
        <button
          onClick={() => onOpenNewWindow(article)}
          className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer"
          title="కొత్త విండోలో తెరవండి (Open in New Window)"
          aria-label="Open in new window"
        >
          <ExternalLink className="w-4 h-4" />
        </button>

        {/* Social Sharing Actions */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Copy Link Button */}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition cursor-pointer"
            title="లింక్ కాపీ చేయండి"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">కాపీ అయింది!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">కాపీ</span>
              </>
            )}
          </button>

          {/* WhatsApp Direct Share */}
          <button
            onClick={(e) => handleShare('whatsapp', e)}
            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition cursor-pointer"
            title="వాట్సాప్‌లో షేర్ చేయండి"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
          </button>
        </div>
      </div>
    </article>
  );
};
