'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Eye,
  Share2,
  Copy,
  Check,
  MapPin,
  Calendar,
  UserCheck,
  Volume2,
  VolumeX,
  Type,
  Home,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { NewsArticle } from '@/lib/types';
import { getStoredArticles, saveStoredArticles } from '@/lib/storage';
import {
  extractYouTubeVideoId,
  formatViewCount,
  incrementViewCount,
} from '@/lib/newsLogic';
import { copyToClipboard } from '@/lib/utils';

export default function StandaloneNewsPage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params?.id as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (!articleId) return;

    const all = getStoredArticles();
    const found = all.find((a) => a.id === articleId);

    if (found) {
      // Increment view count
      const updated = incrementViewCount(all, articleId);
      saveStoredArticles(updated);
      setArticle(updated.find((a) => a.id === articleId) || found);

      // Related news from same mandal or category
      const related = all.filter(
        (a) =>
          a.id !== articleId &&
          a.status === 'published' &&
          (a.mandal === found.mandal || a.category === found.category)
      );
      setRelatedArticles(related.slice(0, 4));
    }
  }, [articleId]);

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Logo size="md" className="mb-4" />
        <p className="text-sm font-bold text-slate-700">వార్త లోడ్ అవుతోంది...</p>
        <Link
          href="/"
          className="mt-4 px-4 py-2 bg-red-700 text-white rounded-xl text-xs font-bold"
        >
          హోమ్ పేజీకి తిరిగి వెళ్లండి
        </Link>
      </div>
    );
  }

  const titleText = article.title.te;
  const contentText = article.content.te;
  const summaryText = article.summary.te;
  const videoId = extractYouTubeVideoId(article.youtubeUrl);

  const publishedDate = new Intl.DateTimeFormat('te-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date(article.publishedAt));

  const handleCopyLink = async () => {
    await copyToClipboard(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShare = (platform: 'whatsapp' | 'facebook' | 'twitter') => {
    const shareUrl = window.location.href;
    const text = encodeURIComponent(`${titleText}\n\nచదవండి: ${shareUrl}`);

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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="bg-red-800 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="hover:opacity-90 transition">
            <Logo size="sm" showTagline={false} />
          </Link>

          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-900/80 hover:bg-red-900 text-amber-300 font-bold rounded-xl text-xs transition border border-red-700"
          >
            <Home className="w-3.5 h-3.5" />
            <span>హోమ్ పేజీ</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-bold text-red-700 hover:text-red-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>అన్ని వార్తలకు తిరిగి వెళ్లండి</span>
        </Link>

        {/* Article Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 sm:p-8 space-y-6">
          {/* Location & Public Views */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="bg-red-100 text-red-800 font-bold px-2.5 py-1 rounded-md text-xs flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                {article.mandal} • {article.district}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md">
                {article.state}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-amber-50 text-amber-950 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-300">
              <Eye className="w-4 h-4 text-amber-600" />
              <span>{formatViewCount(article.views)} మంది చూశారు (Views)</span>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif leading-snug">
            {titleText}
          </h1>

          {/* Reporter Byline */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-700 text-white font-black flex items-center justify-center shrink-0">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <span>{article.authorName}</span>
                  <span className="bg-red-100 text-red-800 text-[10px] px-1.5 py-0.2 rounded font-extrabold">
                    అధికారిక రిపోర్టర్
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  పరిధి: {article.mandal}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-slate-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{publishedDate}</span>
            </div>
          </div>

          {/* Font resizer & Audio narration */}
          <div className="flex items-center justify-between bg-slate-100/70 px-3.5 py-2 rounded-xl text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-600 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" /> ఫాంట్:
              </span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'normal' ? 'bg-white shadow-xs font-bold text-red-700' : 'text-slate-600'}`}
              >
                సాధారణ
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'large' ? 'bg-white shadow-xs font-bold text-red-700' : 'text-slate-600'}`}
              >
                పెద్దది
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontSize === 'xlarge' ? 'bg-white shadow-xs font-bold text-red-700' : 'text-slate-600'}`}
              >
                చాలా పెద్దది
              </button>
            </div>

            <button
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                isSpeaking
                  ? 'bg-red-600 text-white animate-pulse'
                  : 'bg-white hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-red-600" />}
              <span>{isSpeaking ? 'ఆపు' : 'వార్త వినండి'}</span>
            </button>
          </div>

          {/* Main Media Image */}
          {article.imageUrl && (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-md bg-slate-100">
              <Image
                src={article.imageUrl}
                alt={titleText}
                fill
                priority
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
                <span>వీడియో కథనం (YouTube Live / Bulletin):</span>
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

          {/* Summary Lead */}
          {summaryText && (
            <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-2xl text-slate-800 font-semibold text-base sm:text-lg">
              {summaryText}
            </div>
          )}

          {/* Content */}
          <div className={`text-slate-800 whitespace-pre-line font-serif ${contentFontSizeClass}`}>
            {contentText}
          </div>

          {/* Social Share Box */}
          <div className="mt-8 pt-5 border-t border-slate-200 bg-slate-50 p-4 sm:p-5 rounded-2xl space-y-3">
            <span className="text-xs sm:text-sm font-black text-slate-800 flex items-center gap-1.5">
              <Share2 className="w-4 h-4 text-red-700" />
              ఈ వార్తను వాట్సాప్, ఫేస్‌బుక్, ట్విట్టర్‌లో షేర్ చేయండి:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleShare('whatsapp')}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                WhatsApp
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                Facebook
              </button>
              <button
                onClick={() => handleShare('twitter')}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
              >
                X (Twitter)
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3.5 py-2 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ml-auto flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-600" />}
                <span>{copied ? 'లింక్ కాపీ అయింది!' : 'లింక్ కాపీ చేయండి'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Mandal News */}
        {relatedArticles.length > 0 && (
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-black text-slate-900 font-serif">
              మరిన్ని సంబంధిత మండల వార్తలు ({article.mandal}):
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/news/${rel.id}`}
                  className="p-3 bg-white border border-slate-200 rounded-2xl shadow-2xs hover:shadow-md transition flex items-center gap-3 group"
                >
                  {rel.imageUrl && (
                    <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                      <Image
                        src={rel.imageUrl}
                        alt="వార్త"
                        fill
                        sizes="80px"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] font-bold text-red-700 block">
                      {rel.mandal}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-700 transition line-clamp-2">
                      {rel.title.te}
                    </h4>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {formatViewCount(rel.views)} వ్యూస్
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 text-center">
        <p>© 2026 నేటి భారతం న్యూస్ నెట్‌వర్క్. ప్రజా గొంతుక - నిష్పక్షపాత సత్య సమాచారం.</p>
      </footer>
    </div>
  );
}
