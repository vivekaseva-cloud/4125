'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Globe,
  Bell,
  Download,
  ShieldCheck,
  UserCheck,
  Search,
  MessageSquare,
  Sparkles,
  X,
  FileText,
  User,
  MapPin,
  Eye,
  TrendingUp,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { Logo } from './Logo';
import { Language, NotificationItem, PortalBranding, NewsArticle } from '@/lib/types';
import { getTranslation } from '@/lib/translations';
import { searchArticlesGlobal, SearchResultItem, formatViewCount } from '@/lib/newsLogic';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenReporterModal: () => void;
  onOpenAdminModal: () => void;
  onOpenFeedbackModal: () => void;
  onOpenNotificationModal: () => void;
  onOpenInstallModal: () => void;
  notifications: NotificationItem[];
  currentReporterName?: string;
  branding?: PortalBranding;
  articles?: NewsArticle[];
  onSelectArticle?: (article: NewsArticle) => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  onOpenReporterModal,
  onOpenAdminModal,
  onOpenFeedbackModal,
  onOpenNotificationModal,
  onOpenInstallModal,
  notifications,
  currentReporterName,
  branding,
  articles = [],
  onSelectArticle,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const todayTelugu = new Intl.DateTimeFormat('te-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  // Real-time search results matching title, content, or reporter name
  const liveResults: SearchResultItem[] = searchQuery.trim().length > 0
    ? searchArticlesGlobal(articles, searchQuery, lang)
    : [];

  const showDropdown = isSearchFocused;

  // Handle click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsSearchFocused(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleItemClick = (article: NewsArticle) => {
    setIsSearchFocused(false);
    if (onSelectArticle) {
      onSelectArticle(article);
    }
  };

  const popularKeywords = ['విజయవాడ', 'హైదరాబాద్', 'వ్యవసాయం', 'ఇస్రో', 'బ్రేకింగ్', 'వరంగల్'];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Date & Tag */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-slate-300">{todayTelugu}</span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1 text-amber-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              24x7 విశ్వసనీయ ప్రజా సమాచారం
            </span>
          </div>

          {/* Actions: Lang, Notifications, PWA App, Feedback */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium transition cursor-pointer border border-slate-700"
                aria-label="భాష ఎంచుకోండి"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>
                  {lang === 'te' ? 'తెలుగు' : lang === 'hi' ? 'हिंदी' : 'English'}
                </span>
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50 text-slate-900 text-xs">
                  <button
                    onClick={() => {
                      onLanguageChange('te');
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center justify-between cursor-pointer ${
                      lang === 'te' ? 'font-bold text-red-700 bg-red-50/50' : ''
                    }`}
                  >
                    <span>తెలుగు (Telugu)</span>
                    {lang === 'te' && <span className="text-red-700">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('hi');
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center justify-between cursor-pointer ${
                      lang === 'hi' ? 'font-bold text-red-700 bg-red-50/50' : ''
                    }`}
                  >
                    <span>हिंदी (Hindi)</span>
                    {lang === 'hi' && <span className="text-red-700">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      onLanguageChange('en');
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-red-50 flex items-center justify-between cursor-pointer ${
                      lang === 'en' ? 'font-bold text-red-700 bg-red-50/50' : ''
                    }`}
                  >
                    <span>English</span>
                    {lang === 'en' && <span className="text-red-700">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Install App / Play Store */}
            <button
              onClick={onOpenInstallModal}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-medium transition cursor-pointer text-xs"
              title="యాప్ డౌన్‌లోడ్ చేయండి / Install App"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">యాప్ డౌన్‌లోడ్</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Notifications */}
            <button
              onClick={onOpenNotificationModal}
              className="relative p-1 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition cursor-pointer"
              title={getTranslation(lang, 'notifications')}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-600 text-[10px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Feedback */}
            <button
              onClick={onOpenFeedbackModal}
              className="hidden sm:flex items-center gap-1 text-slate-300 hover:text-amber-300 transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{getTranslation(lang, 'userFeedback')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Branding & Navigation Action Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          {/* Logo & Reporter quick info */}
          <div className="flex items-center justify-between">
            <Logo
              size="md"
              customLogoUrl={branding?.logoUrl}
              customTitle={branding?.siteName}
              customTagline={branding?.tagline}
            />

            {/* Mobile Portals Buttons */}
            <div className="flex items-center gap-1.5 lg:hidden">
              <button
                onClick={onOpenReporterModal}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-red-50 text-red-800 font-bold rounded-lg border border-red-200"
              >
                <UserCheck className="w-3.5 h-3.5 text-red-600" />
                <span>రిపోర్టర్</span>
              </button>
              <button
                onClick={onOpenAdminModal}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-900 text-amber-300 font-bold rounded-lg"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Search Bar & Desktop Role Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-1 lg:max-w-xl lg:ml-auto">
            {/* Real-time Global Search Input with Floating Results Dropdown */}
            <div ref={searchContainerRef} className="relative flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  placeholder="శీర్షిక, వార్తా కథనం లేదా రిపోర్టర్ పేరుతో వెతకండి..."
                  className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-red-600 rounded-xl focus:outline-none transition shadow-2xs font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      onSearchChange('');
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-xs font-bold p-1 cursor-pointer"
                    title="క్లియర్"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* FLOATING REAL-TIME SEARCH RESULTS DROPDOWN */}
              {showDropdown && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[460px] flex flex-col animate-in fade-in zoom-in-95 duration-100">
                  {/* Dropdown Header */}
                  <div className="px-3.5 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 shrink-0">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Search className="w-3.5 h-3.5 text-red-700" />
                      {searchQuery.trim().length > 0 ? (
                        <span>
                          శోధన ఫలితాలు ({liveResults.length}{' '}
                          {liveResults.length === 1 ? 'వార్త' : 'వార్తలు'} లభించాయి)
                        </span>
                      ) : (
                        <span>తాజా శోధన సూచనలు (Search Suggestions)</span>
                      )}
                    </div>
                    <button
                      onClick={() => setIsSearchFocused(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
                    >
                      మూసివేయి (Esc)
                    </button>
                  </div>

                  {/* Results List */}
                  <div className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
                    {searchQuery.trim().length === 0 ? (
                      /* Empty state: popular suggestions */
                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                          <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                          <span>ప్రముఖ శోధన అంశాలు:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {popularKeywords.map((kw) => (
                            <button
                              key={kw}
                              type="button"
                              onClick={() => {
                                onSearchChange(kw);
                                setIsSearchFocused(true);
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-800 hover:border-red-300 rounded-lg text-xs font-medium text-slate-700 border border-slate-200 transition cursor-pointer"
                            >
                              {kw}
                            </button>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500 pt-1">
                          వార్తా శీర్షిక (Title), కథనం (Content) లేదా రిపోర్టర్ పేరు (Reporter Name) టైప్ చేయడం ద్వారా తక్షణమే వెతకవచ్చు.
                        </p>
                      </div>
                    ) : liveResults.length === 0 ? (
                      /* No matches found */
                      <div className="p-6 text-center space-y-2">
                        <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                        <p className="text-xs font-bold text-slate-700">
                          &quot;{searchQuery}&quot; కోసం ప్రచురితమైన వార్తలు ఏవీ లభించలేదు.
                        </p>
                        <p className="text-[11px] text-slate-500">
                          దయచేసి వేరొక పదం లేదా విలేఖరి పేరుతో మళ్ళీ ప్రయత్నించండి.
                        </p>
                      </div>
                    ) : (
                      /* Matching results */
                      liveResults.map(({ article, matchType, matchedSnippet }) => (
                        <div
                          key={article.id}
                          onClick={() => handleItemClick(article)}
                          className="p-2.5 rounded-xl hover:bg-red-50/60 transition cursor-pointer flex gap-3 items-start group"
                        >
                          {/* Thumbnail */}
                          <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            {article.imageUrl ? (
                              <Image
                                src={article.imageUrl}
                                alt={article.title[lang] || article.title.te}
                                fill
                                sizes="64px"
                                className="object-cover group-hover:scale-105 transition-transform duration-200"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500 text-xs">
                                న్యూస్
                              </div>
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {/* Match Type Badge */}
                              {matchType === 'title' && (
                                <span className="bg-red-100 text-red-800 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <Tag className="w-2.5 h-2.5" />
                                  శీర్షిక
                                </span>
                              )}
                              {matchType === 'reporter' && (
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <User className="w-2.5 h-2.5" />
                                  విలేఖరి
                                </span>
                              )}
                              {matchType === 'content' && (
                                <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded flex items-center gap-0.5">
                                  <FileText className="w-2.5 h-2.5" />
                                  కథనంలో
                                </span>
                              )}

                              {/* Location */}
                              <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                                <MapPin className="w-2.5 h-2.5 text-slate-400" />
                                {article.mandal || article.district}
                              </span>

                              {/* Views */}
                              <span className="text-[10px] text-slate-400 ml-auto flex items-center gap-0.5">
                                <Eye className="w-2.5 h-2.5" />
                                {formatViewCount(article.views)}
                              </span>
                            </div>

                            {/* Headline */}
                            <h5 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-700 transition line-clamp-1 leading-snug">
                              {article.title[lang] || article.title.te}
                            </h5>

                            {/* Snippet / Reporter info */}
                            <p className="text-[11px] text-slate-600 line-clamp-1">
                              {matchType === 'reporter' ? (
                                <span className="font-semibold text-blue-900">
                                  విలేఖరి: {article.authorName} ({article.authorRole})
                                </span>
                              ) : (
                                matchedSnippet
                              )}
                            </p>
                          </div>

                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-700 shrink-0 self-center transition-transform group-hover:translate-x-0.5" />
                        </div>
                      ))
                    )}
                  </div>

                  {/* Dropdown Footer */}
                  {liveResults.length > 0 && (
                    <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                      <span className="text-[10px] text-slate-500">
                        పూర్తి వార్తను చదవడానికి ఏదైనా కథనంపై క్లిక్ చేయండి
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Reporter Button */}
            <button
              onClick={onOpenReporterModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-800 font-bold rounded-xl border border-red-200 transition cursor-pointer text-xs shrink-0 shadow-2xs"
            >
              <UserCheck className="w-4 h-4 text-red-700" />
              <span>
                {currentReporterName ? `రిపోర్టర్ (${currentReporterName})` : 'రిపోర్టర్ పోర్టల్'}
              </span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={onOpenAdminModal}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl transition cursor-pointer text-xs shrink-0 shadow-2xs"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>అడ్మిన్ లాగిన్</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
