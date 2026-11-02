'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Eye,
  Share2,
  Copy,
  Check,
  ExternalLink,
  MapPin,
  Calendar,
  UserCheck,
  Volume2,
  VolumeX,
  Type,
  ChevronLeft,
} from 'lucide-react';
import { NewsArticle, Language } from '@/lib/types';
import { extractYouTubeVideoId, formatViewCount } from '@/lib/newsLogic';
import { copyToClipboard } from '@/lib/utils';

interface NewsReaderModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  lang: Language;
  onOpenNewWindow: (article: NewsArticle) => void;
}

export const NewsReaderModal: React.FC<NewsReaderModalProps> = ({
  article,
  onClose,
  lang,
  onOpenNewWindow,
}) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Stop speaking if closed
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  if (!article) return null;

  const titleText = article.title[lang] || article.title.te;
  const contentText = article.content[lang] || article.content.te;
  const summaryText = article.summary[lang] || article.summary.te;
  const videoId = extractYouTubeVideoId(article.youtubeUrl);

  const publishedDate = new Intl.DateTimeFormat('te-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(article.publishedAt));

  const handleCopyLink = async () => {
    const shareUrl = `${window.location.origin}/news/${article.id}`;
    await copyToClipboard(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const shareUrl = `${window.location.origin}/news/${article.id}`;
    const text = encodeURIComponent(`${titleText}\n\nపూర్తి వివరాలు: ${shareUrl}`);

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
  };

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`${titleText}. ${summaryText}. ${contentText}`);
      utterance.rate = 0.95;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const contentFontSizeClass =
    fontSize === 'xlarge'
      ? 'text-xl leading-loose'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-base leading-relaxed';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Sticky Header */}
        <div className="bg-red-800 text-white px-4 py-3 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm sm:text-base font-serif tracking-wide">
              నేటి భారతం వార్తా పత్రిక
            </span>
            <span className="bg-amber-400 text-red-950 text-[10px] font-black px-1.5 py-0.5 rounded">
              ప్రత్యేక కథనం
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Open in new window */}
            <button
              onClick={() => onOpenNewWindow(article)}
              className="flex items-center gap-1 text-xs bg-red-900/60 hover:bg-red-900 text-amber-200 px-2.5 py-1.5 rounded-lg border border-red-700 transition cursor-pointer"
              title="కొత్త విండోలో తెరవండి"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">కొత్త విండో</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 text-red-200 hover:text-white hover:bg-red-900 rounded-lg transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Area */}
        <div className="overflow-y-auto p-4 sm:p-7 flex-1 space-y-5">
          {/* Tags & Views Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {article.mandal} • {article.district}
              </span>
              <span className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md">
                {article.state}
              </span>
            </div>

            {/* Live Views Counter */}
            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>{formatViewCount(article.views)} మంది వీక్షించారు (Views)</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-xl sm:text-3xl font-black text-slate-900 leading-snug font-serif">
            {titleText}
          </h1>

          {/* Byline / Reporter Credential */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-red-700 text-white font-black flex items-center justify-center shrink-0">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <span>{article.authorName}</span>
                  <span className="bg-red-100 text-red-700 text-[10px] px-1.5 py-0.2 rounded font-extrabold">
                    {article.authorRole === 'Reporter' ? 'అధికారిక రిపోర్టర్' : 'ఎడిటోరియల్ టీమ్'}
                  </span>
                </div>
                <div className="text-slate-500 text-[11px] flex items-center gap-1">
                  <span>పరిధి: {article.mandal || article.district}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishedDate}</span>
            </div>
          </div>

          {/* Reading Tools (Font Size + Audio Read Aloud) */}
          <div className="flex items-center justify-between bg-slate-100/70 px-3 py-2 rounded-lg text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> అక్షరాల పరిమాణం:
              </span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-red-700' : 'text-slate-600'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'large' ? 'bg-white shadow-xs font-bold text-red-700 text-sm' : 'text-slate-600'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'xlarge' ? 'bg-white shadow-xs font-bold text-red-700 text-base' : 'text-slate-600'}`}
              >
                A++
              </button>
            </div>

            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md font-bold transition cursor-pointer ${
                isSpeaking
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>వినడం ఆపు</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>వార్త వినండి</span>
                </>
              )}
            </button>
          </div>

          {/* Featured Image */}
          {article.imageUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-slate-100">
              <Image
                src={article.imageUrl}
                alt={titleText}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* YouTube Video Embed if present */}
          {videoId && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-red-800">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                <span>ప్రత్యక్ష వీడియో కథనం (YouTube Video Update):</span>
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md border border-slate-200">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`}
                  title={titleText}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Article Summary Lead */}
          {summaryText && (
            <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl text-slate-800 font-semibold text-base sm:text-lg">
              {summaryText}
            </div>
          )}

          {/* Article Body */}
          <div className={`text-slate-800 whitespace-pre-line font-serif ${contentFontSizeClass}`}>
            {contentText}
          </div>

          {/* Gallery Images if present */}
          {article.galleryUrls && article.galleryUrls.length > 0 && (
            <div className="space-y-2 pt-4 border-t border-slate-200">
              <h4 className="font-bold text-sm text-slate-800">మరిన్ని ఫోటోలు:</h4>
              <div className="grid grid-cols-2 gap-3">
                {article.galleryUrls.map((url, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden shadow-xs">
                    <Image
                      src={url}
                      alt={`చిత్రం ${i + 1}`}
                      fill
                      sizes="400px"
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mandatory Social Share Bar */}
          <div className="mt-8 pt-5 border-t border-slate-200 bg-slate-50 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                <Share2 className="w-4 h-4 text-red-700" />
                ఈ వార్తను ఇతరులతో పంచుకోండి (Share):
              </span>
              <span className="text-xs text-slate-500">
                సత్య వార్తలను ప్రోత్సహించండి
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* WhatsApp */}
              <button
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>

              {/* Facebook */}
              <button
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>Facebook</span>
              </button>

              {/* Twitter / X */}
              <button
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer"
              >
                <span>X (Twitter)</span>
              </button>

              {/* Copy Link */}
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition shadow-2xs cursor-pointer ml-auto"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">లింక్ కాపీ అయింది!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>లింక్ కాపీ చేయండి</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
