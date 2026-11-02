'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Header,
} from '@/components/Header';
import { BreakingTicker } from '@/components/BreakingTicker';
import { NavigationTabs } from '@/components/NavigationTabs';
import { MandalSelectorBar } from '@/components/MandalSelectorBar';
import { NewsCard } from '@/components/NewsCard';
import { NewsReaderModal } from '@/components/NewsReaderModal';
import { VideoNewsSection } from '@/components/VideoNewsSection';
import { PrivateAdsSection } from '@/components/PrivateAdsSection';
import { ReporterRegistrationModal } from '@/components/ReporterRegistrationModal';
import { ReporterDashboardModal } from '@/components/ReporterDashboardModal';
import { AdminDashboardModal } from '@/components/AdminDashboardModal';
import { PostAdModal } from '@/components/PostAdModal';
import { UserFeedbackModal } from '@/components/UserFeedbackModal';
import { NotificationCenterModal } from '@/components/NotificationCenterModal';
import { PWAInstallModal } from '@/components/PWAInstallModal';
import { Logo } from '@/components/Logo';

import {
  NewsArticle,
  Reporter,
  PrivateAd,
  AdSenseConfig,
  UserFeedback,
  NotificationItem,
  Language,
  NewsCategory,
  PortalBranding,
} from '@/lib/types';
import {
  getStoredArticles,
  saveStoredArticles,
  getStoredReporters,
  saveStoredReporters,
  getStoredAds,
  saveStoredAds,
  getStoredAdSense,
  saveStoredAdSense,
  getStoredFeedback,
  saveStoredFeedback,
  getStoredNotifications,
  saveStoredNotifications,
  getStoredBranding,
  saveStoredBranding,
  INITIAL_BRANDING,
} from '@/lib/storage';
import {
  filterArticles,
  incrementViewCount,
} from '@/lib/newsLogic';
import { getTranslation } from '@/lib/translations';
import { MapPin, Sparkles, TrendingUp, ShieldCheck, Newspaper, Download } from 'lucide-react';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('te');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('all');

  // Location Hierarchy Filters
  const [selectedState, setSelectedState] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedMandal, setSelectedMandal] = useState<string>('all');

  // Data Collections
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [reporters, setReporters] = useState<Reporter[]>([]);
  const [ads, setAds] = useState<PrivateAd[]>([]);
  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>({
    enabled: true,
    publisherId: 'ca-pub-9848012345678901',
    topBannerSlot: 'slot-banner-top-728x90',
    sidebarSlot: 'slot-sidebar-300x250',
    inFeedSlot: 'slot-infeed-native-fluid',
  });
  const [feedback, setFeedback] = useState<UserFeedback[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [branding, setBranding] = useState<PortalBranding>(INITIAL_BRANDING);

  // Logged-in Reporter
  const [currentReporter, setCurrentReporter] = useState<Reporter | null>(null);

  // Modals state
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isReporterRegOpen, setIsReporterRegOpen] = useState(false);
  const [isReporterDashOpen, setIsReporterDashOpen] = useState(false);
  const [isAdminDashOpen, setIsAdminDashOpen] = useState(false);
  const [isPostAdOpen, setIsPostAdOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isNotifCenterOpen, setIsNotifCenterOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);

  // Load Initial Storage Data
  useEffect(() => {
    setArticles(getStoredArticles());
    setReporters(getStoredReporters());
    setAds(getStoredAds());
    setAdSenseConfig(getStoredAdSense());
    setFeedback(getStoredFeedback());
    setNotifications(getStoredNotifications());
    setBranding(getStoredBranding());

    // Register Service Worker for PWA
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration note:', err);
      });
    }
  }, []);

  // Filtered Articles based on Category, Location, and Search
  const filteredArticles = filterArticles(articles, {
    category: activeCategory,
    state: selectedState,
    district: selectedDistrict,
    mandal: selectedMandal,
    searchQuery: searchQuery,
    lang: lang,
  });

  // Top Lead Featured Article
  const leadArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  // Article View Event Handler
  const handleReadMore = (article: NewsArticle) => {
    // Increment view count immutably
    const updated = incrementViewCount(articles, article.id);
    setArticles(updated);
    saveStoredArticles(updated);

    const target = updated.find((a) => a.id === article.id) || article;
    setActiveArticle(target);
  };

  // Open in New Window/Tab Handler
  const handleOpenNewWindow = (article: NewsArticle) => {
    // Increment view count
    const updated = incrementViewCount(articles, article.id);
    setArticles(updated);
    saveStoredArticles(updated);

    window.open(`/news/${article.id}`, '_blank', 'noopener,noreferrer');
  };

  // Reporter Registration
  const handleRegisterReporter = (newReporter: Reporter) => {
    const updated = [newReporter, ...reporters];
    setReporters(updated);
    saveStoredReporters(updated);

    // Notify Admin
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'కొత్త రిపోర్టర్ రిజిస్ట్రేషన్ దరఖాస్తు',
      summary: `${newReporter.fullName} (${newReporter.mandal}) రిపోర్టర్ ఆమోదం కోసం దరఖాస్తు చేసుకున్నారు.`,
      timestamp: 'ఇప్పుడే',
      type: 'mandal',
      read: false,
    };
    const updatedNotifs = [notif, ...notifications];
    setNotifications(updatedNotifs);
    saveStoredNotifications(updatedNotifs);
  };

  // Reporter Publishing New Article
  const handleCreateArticle = (newArticle: NewsArticle) => {
    const updated = [newArticle, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);

    // Broadcast notification
    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `తాజా మండల వార్త: ${newArticle.mandal}`,
      summary: newArticle.title.te,
      timestamp: 'ఇప్పుడే',
      articleId: newArticle.id,
      type: 'mandal',
      read: false,
    };
    const updatedNotifs = [notif, ...notifications];
    setNotifications(updatedNotifs);
    saveStoredNotifications(updatedNotifs);
  };

  // Admin Actions
  const handleApproveReporter = (reporterId: string) => {
    const updated = reporters.map((r) =>
      r.id === reporterId ? { ...r, status: 'approved' as const, approvedAt: new Date().toISOString() } : r
    );
    setReporters(updated);
    saveStoredReporters(updated);
  };

  const handleRejectReporter = (reporterId: string) => {
    const updated = reporters.map((r) =>
      r.id === reporterId ? { ...r, status: 'rejected' as const } : r
    );
    setReporters(updated);
    saveStoredReporters(updated);
  };

  const handleUpdateReporter = (updatedReporter: Reporter) => {
    const updated = reporters.map((r) =>
      r.id === updatedReporter.id ? updatedReporter : r
    );
    setReporters(updated);
    saveStoredReporters(updated);

    // If current logged-in reporter was updated, update current session too
    if (currentReporter && currentReporter.id === updatedReporter.id) {
      setCurrentReporter(updatedReporter);
    }
  };

  const handleToggleBreaking = (articleId: string) => {
    const updated = articles.map((a) =>
      a.id === articleId ? { ...a, isBreaking: !a.isBreaking } : a
    );
    setArticles(updated);
    saveStoredArticles(updated);
  };

  const handleDeleteArticle = (articleId: string) => {
    const updated = articles.filter((a) => a.id !== articleId);
    setArticles(updated);
    saveStoredArticles(updated);
  };

  const handleUpdateArticle = (updatedArticle: NewsArticle) => {
    const updated = articles.map((a) =>
      a.id === updatedArticle.id ? updatedArticle : a
    );
    setArticles(updated);
    saveStoredArticles(updated);

    // If currently reading this article, update active modal view
    if (activeArticle && activeArticle.id === updatedArticle.id) {
      setActiveArticle(updatedArticle);
    }
  };

  const handleAddArticle = (newArticle: NewsArticle) => {
    const updated = [newArticle, ...articles];
    setArticles(updated);
    saveStoredArticles(updated);
  };

  const handleUpdateBranding = (updatedBranding: PortalBranding) => {
    setBranding(updatedBranding);
    saveStoredBranding(updatedBranding);
  };

  // Ads Actions
  const handlePostAd = (newAd: PrivateAd) => {
    const updated = [newAd, ...ads];
    setAds(updated);
    saveStoredAds(updated);
  };

  const handleApproveAd = (adId: string) => {
    const updated = ads.map((a) =>
      a.id === adId ? { ...a, status: 'approved' as const } : a
    );
    setAds(updated);
    saveStoredAds(updated);
  };

  const handleRejectAd = (adId: string) => {
    const updated = ads.map((a) =>
      a.id === adId ? { ...a, status: 'rejected' as const } : a
    );
    setAds(updated);
    saveStoredAds(updated);
  };

  const handleDeleteAd = (adId: string) => {
    const updated = ads.filter((a) => a.id !== adId);
    setAds(updated);
    saveStoredAds(updated);
  };

  // Feedback Submission
  const handleSubmitFeedback = (newFb: UserFeedback) => {
    const updated = [newFb, ...feedback];
    setFeedback(updated);
    saveStoredFeedback(updated);
  };

  // Reset Location Filter
  const handleResetLocation = () => {
    setSelectedState('all');
    setSelectedDistrict('all');
    setSelectedMandal('all');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. Global Header with Languages, Portals, Search */}
      <Header
        lang={lang}
        onLanguageChange={setLang}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenReporterModal={() => setIsReporterDashOpen(true)}
        onOpenAdminModal={() => setIsAdminDashOpen(true)}
        onOpenFeedbackModal={() => setIsFeedbackOpen(true)}
        onOpenNotificationModal={() => setIsNotifCenterOpen(true)}
        onOpenInstallModal={() => setIsInstallOpen(true)}
        notifications={notifications}
        currentReporterName={currentReporter?.fullName}
        branding={branding}
        articles={articles}
        onSelectArticle={handleReadMore}
      />

      {/* 2. Live Breaking News Ticker */}
      <BreakingTicker
        articles={articles}
        lang={lang}
        onSelectArticle={handleReadMore}
      />

      {/* 3. Navigation Categories Bar */}
      <NavigationTabs
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        lang={lang}
        onOpenPostAdModal={() => setIsPostAdOpen(true)}
      />

      {/* 4. 3-Tier Mandal & District Cascading Selector */}
      <MandalSelectorBar
        selectedState={selectedState}
        selectedDistrict={selectedDistrict}
        selectedMandal={selectedMandal}
        onSelectState={setSelectedState}
        onSelectDistrict={setSelectedDistrict}
        onSelectMandal={setSelectedMandal}
        onResetLocation={handleResetLocation}
        lang={lang}
      />

      {/* 5. Google AdSense Header Slot (if configured) */}
      {adSenseConfig.enabled && (
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 pt-3">
          <div className="bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-center shadow-2xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
              ప్రకటన • Google AdSense ({adSenseConfig.publisherId})
            </span>
            <div className="h-16 sm:h-20 bg-gradient-to-r from-slate-200 via-amber-100/60 to-slate-200 rounded-lg flex items-center justify-center border border-dashed border-amber-300 text-xs sm:text-sm font-bold text-slate-700">
              ⚡ నేటి భారతం స్పాన్సర్డ్ స్పేస్ (Leaderboard Banner 728x90)
            </div>
          </div>
        </div>
      )}

      {/* 6. Main Content Area */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 flex-1 w-full space-y-8">
        {/* Section Title with Live Count */}
        <div className="flex items-center justify-between border-b-2 border-red-700 pb-2">
          <div className="flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-red-700" />
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
              {selectedMandal !== 'all'
                ? `${selectedMandal} మండల వార్తలు`
                : activeCategory !== 'all'
                ? getTranslation(lang, activeCategory)
                : 'తాజా ప్రధాన వార్తలు (Latest Stories)'}
            </h1>
          </div>

          <span className="text-xs font-bold text-slate-500">
            {filteredArticles.length} వార్తలు అందుబాటులో ఉన్నాయి
          </span>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-red-50 text-red-700 rounded-full flex items-center justify-center mx-auto">
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 font-serif">
              {getTranslation(lang, 'noNewsFound')}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              మీ మండలంలో జరిగే అభివృద్ధి పనులు, ప్రజా సమస్యలు మరియు సంఘటనలను ప్రపంచానికి తెలియజేయడానికి వెంటనే నేటి భారతం రిపోర్టర్‌గా నమోదు చేసుకోండి.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsReporterRegOpen(true)}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer"
              >
                రిపోర్టర్‌గా రిజిస్టర్ అవ్వండి
              </button>
              <button
                onClick={handleResetLocation}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
              >
                అన్ని వార్తలు చూపించు
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Lead Headline Story (Full width hero style) */}
            {leadArticle && (
              <div
                onClick={() => handleReadMore(leadArticle)}
                className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12"
              >
                <div className="relative aspect-video lg:aspect-auto lg:col-span-7 bg-slate-900 min-h-[260px] sm:min-h-[340px]">
                  {leadArticle.imageUrl ? (
                    <Image
                      src={leadArticle.imageUrl}
                      alt={leadArticle.title.te}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  ) : null}

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="bg-red-700 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wide animate-pulse">
                      ముఖ్యాంశం (Lead Story)
                    </span>
                    <span className="bg-slate-900/80 backdrop-blur-xs text-amber-300 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
                      📍 {leadArticle.mandal}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-md">
                    👁️ {leadArticle.views.toLocaleString('en-IN')} వీక్షణలు
                  </div>
                </div>

                <div className="lg:col-span-5 p-5 sm:p-7 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-red-700">
                        {leadArticle.authorName}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(leadArticle.publishedAt).toLocaleDateString('te-IN')}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-red-700 transition font-serif leading-snug">
                      {leadArticle.title[lang] || leadArticle.title.te}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-4 leading-relaxed">
                      {leadArticle.summary[lang] || leadArticle.summary.te}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-red-700 group-hover:underline">
                      పూర్తి వివరాలు చదవండి →
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenNewWindow(leadArticle);
                      }}
                      className="text-xs text-slate-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-slate-100"
                      title="కొత్త విండోలో తెరవండి"
                    >
                      కొత్త విండో ↗
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* News Cards Grid */}
            {gridArticles.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {gridArticles.map((article) => (
                  <NewsCard
                    key={article.id}
                    article={article}
                    lang={lang}
                    onReadMore={handleReadMore}
                    onOpenNewWindow={handleOpenNewWindow}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* 7. Dedicated YouTube Video News Section */}
        <VideoNewsSection
          articles={articles}
          lang={lang}
          onSelectArticle={handleReadMore}
        />

        {/* 8. Mandal-wise & District-wise Private Classifieds Section */}
        <PrivateAdsSection
          ads={ads}
          selectedState={selectedState}
          selectedDistrict={selectedDistrict}
          selectedMandal={selectedMandal}
          lang={lang}
          onOpenPostAdModal={() => setIsPostAdOpen(true)}
        />
      </main>

      {/* 9. Official Neti Bharatham Footer */}
      <footer className="bg-slate-950 text-slate-300 pt-10 pb-6 border-t-4 border-red-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand & Bio */}
            <div className="space-y-3 md:col-span-2">
              <Logo
                size="md"
                className="brightness-110"
                customLogoUrl={branding.logoUrl}
                customTitle={branding.siteName}
                customTagline={branding.tagline}
              />
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                నేటి భారతం (Neti Bharatham) భారతదేశపు ప్రముఖ బహుభాషా హైపర్‌లోకల్ న్యూస్ నెట్‌వర్క్. గ్రామీణ స్థాయి మండలం నుండి జాతీయ స్థాయి వరకు నిష్పక్షపాత సత్య వార్తలు, వీడియో విశ్లేషణలు మరియు ప్రజా గొంతుకను ప్రపంచానికి అందించడం మా సంకల్పం.
              </p>
              <div className="flex items-center gap-2 pt-2 text-xs text-amber-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>భారతీయ ప్రెస్ కౌన్సిల్ ప్రమాణాలకు అనుగుణంగా ధ్రువీకరించబడిన పోర్టల్</span>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="space-y-2 text-xs">
              <span className="font-extrabold text-white text-sm block font-serif">
                ముఖ్య విభాగాలు
              </span>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => setActiveCategory('national')} className="hover:text-amber-300 cursor-pointer">జాతీయ వార్తలు</button></li>
                <li><button onClick={() => setActiveCategory('state')} className="hover:text-amber-300 cursor-pointer">రాష్ట్ర వార్తలు (AP & TS)</button></li>
                <li><button onClick={() => setActiveCategory('mandal')} className="hover:text-amber-300 cursor-pointer">మండల ప్రత్యేక వార్తలు</button></li>
                <li><button onClick={() => setActiveCategory('video')} className="hover:text-amber-300 cursor-pointer">యూట్యూబ్ వీడియో బులెటిన్లు</button></li>
                <li><button onClick={() => setIsPostAdOpen(true)} className="hover:text-amber-300 cursor-pointer">వాణిజ్య ప్రకటనలు ఇవ్వండి</button></li>
              </ul>
            </div>

            {/* Col 3: Reporter & PWA */}
            <div className="space-y-2 text-xs">
              <span className="font-extrabold text-white text-sm block font-serif">
                రిపోర్టర్ నెట్‌వర్క్
              </span>
              <p className="text-slate-400 text-xs">
                మీ మండలంలో నేటి భారతం ప్రతినిధిగా చేరండి.
              </p>
              <button
                onClick={() => setIsReporterRegOpen(true)}
                className="w-full py-2 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition shadow-2xs cursor-pointer block text-center"
              >
                రిపోర్టర్ రిజిస్ట్రేషన్
              </button>
              <button
                onClick={() => setIsInstallOpen(true)}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold rounded-xl text-xs transition border border-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>మొబైల్ యాప్ డౌన్‌లోడ్ (PWA)</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© 2026 నేటి భారతం న్యూస్ నెట్‌వర్క్ (Neti Bharatham). సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsFeedbackOpen(true)} className="hover:text-slate-300 cursor-pointer">
                ఫీడ్‌బ్యాక్
              </button>
              <span>•</span>
              <button onClick={() => setIsAdminDashOpen(true)} className="hover:text-amber-400 cursor-pointer">
                అడ్మిన్ లాగిన్
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* 10. Modals */}
      {/* Article Reader Modal */}
      <NewsReaderModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        lang={lang}
        onOpenNewWindow={handleOpenNewWindow}
      />

      {/* Reporter Registration Modal */}
      <ReporterRegistrationModal
        isOpen={isReporterRegOpen}
        onClose={() => setIsReporterRegOpen(false)}
        onSubmit={handleRegisterReporter}
        onSwitchToLogin={() => {
          setIsReporterRegOpen(false);
          setIsReporterDashOpen(true);
        }}
      />

      {/* Reporter Dashboard & Login Modal */}
      <ReporterDashboardModal
        isOpen={isReporterDashOpen}
        onClose={() => setIsReporterDashOpen(false)}
        reporters={reporters}
        currentReporter={currentReporter}
        onLogin={setCurrentReporter}
        onLogout={() => setCurrentReporter(null)}
        onOpenRegister={() => {
          setIsReporterDashOpen(false);
          setIsReporterRegOpen(true);
        }}
        onUpdateReporter={handleUpdateReporter}
        articles={articles}
        onCreateArticle={handleCreateArticle}
        branding={branding}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashOpen}
        onClose={() => setIsAdminDashOpen(false)}
        reporters={reporters}
        onApproveReporter={handleApproveReporter}
        onRejectReporter={handleRejectReporter}
        onUpdateReporter={handleUpdateReporter}
        articles={articles}
        onToggleBreaking={handleToggleBreaking}
        onDeleteArticle={handleDeleteArticle}
        onUpdateArticle={handleUpdateArticle}
        onAddArticle={handleAddArticle}
        branding={branding}
        onUpdateBranding={handleUpdateBranding}
        ads={ads}
        onApproveAd={handleApproveAd}
        onRejectAd={handleRejectAd}
        onDeleteAd={handleDeleteAd}
        adSenseConfig={adSenseConfig}
        onUpdateAdSense={(cfg) => {
          setAdSenseConfig(cfg);
          saveStoredAdSense(cfg);
        }}
        feedback={feedback}
        onBroadcastNotification={(notif) => {
          const updated = [notif, ...notifications];
          setNotifications(updated);
          saveStoredNotifications(updated);
        }}
      />

      {/* Post Private Ad Modal */}
      <PostAdModal
        isOpen={isPostAdOpen}
        onClose={() => setIsPostAdOpen(false)}
        onSubmitAd={handlePostAd}
      />

      {/* User Feedback Modal */}
      <UserFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        onSubmitFeedback={handleSubmitFeedback}
      />

      {/* Notification Center Modal */}
      <NotificationCenterModal
        isOpen={isNotifCenterOpen}
        onClose={() => setIsNotifCenterOpen(false)}
        notifications={notifications}
        onSelectNotification={(n) => {
          if (n.articleId) {
            const found = articles.find((a) => a.id === n.articleId);
            if (found) handleReadMore(found);
          }
        }}
        onClearAll={() => {
          setNotifications([]);
          saveStoredNotifications([]);
        }}
      />

      {/* PWA & Play Store Install Modal */}
      <PWAInstallModal
        isOpen={isInstallOpen}
        onClose={() => setIsInstallOpen(false)}
      />
    </div>
  );
}
