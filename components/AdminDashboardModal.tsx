'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  ShieldCheck,
  UserCheck,
  Check,
  Trash2,
  Megaphone,
  Sparkles,
  DollarSign,
  Bell,
  MessageSquare,
  AlertCircle,
  Eye,
  CheckCircle,
  FileText,
  Lock,
  Edit,
  Phone,
  QrCode,
  IdCard,
  ExternalLink,
  FileBadge,
  Mail,
  MapPin,
  Heart,
  Briefcase,
  GraduationCap,
  Camera,
  Upload,
  Video,
  Play,
  Key,
  PlusCircle,
  EyeOff,
  Image as ImageIcon,
  RotateCcw,
  Search,
} from 'lucide-react';
import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  DEFAULT_LOGO_URL,
  getStoredAdminPassword,
  saveStoredAdminPassword,
} from '@/lib/storage';
import {
  Reporter,
  NewsArticle,
  PrivateAd,
  AdSenseConfig,
  UserFeedback,
  NotificationItem,
  PortalBranding,
  NewsCategory,
} from '@/lib/types';
import {
  getAllStates,
  getDistrictsForState,
  getMandalsForDistrict,
} from '@/lib/indiaData';
import { formatViewCount, extractYouTubeVideoId } from '@/lib/newsLogic';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reporters: Reporter[];
  onApproveReporter: (reporterId: string) => void;
  onRejectReporter: (reporterId: string) => void;
  onUpdateReporter?: (updatedReporter: Reporter) => void;
  articles: NewsArticle[];
  onToggleBreaking: (articleId: string) => void;
  onDeleteArticle: (articleId: string) => void;
  onUpdateArticle?: (updatedArticle: NewsArticle) => void;
  onAddArticle?: (newArticle: NewsArticle) => void;
  branding?: PortalBranding;
  onUpdateBranding?: (branding: PortalBranding) => void;
  ads: PrivateAd[];
  onApproveAd: (adId: string) => void;
  onRejectAd: (adId: string) => void;
  onDeleteAd: (adId: string) => void;
  adSenseConfig: AdSenseConfig;
  onUpdateAdSense: (cfg: AdSenseConfig) => void;
  feedback: UserFeedback[];
  onBroadcastNotification: (item: NotificationItem) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  reporters,
  onApproveReporter,
  onRejectReporter,
  onUpdateReporter,
  articles,
  onToggleBreaking,
  onDeleteArticle,
  onUpdateArticle,
  onAddArticle,
  branding,
  onUpdateBranding,
  ads,
  onApproveAd,
  onRejectAd,
  onDeleteAd,
  adSenseConfig,
  onUpdateAdSense,
  feedback,
  onBroadcastNotification,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeAdminPassword, setActiveAdminPassword] = useState(ADMIN_PASSWORD);

  // Load latest admin password on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setActiveAdminPassword(getStoredAdminPassword());
    }
  }, [isOpen]);

  const [adminTab, setAdminTab] = useState<
    'reporters' | 'articles' | 'videos' | 'branding' | 'security' | 'ads' | 'adsense' | 'notifications' | 'feedback'
  >('reporters');

  // Password Change state
  const [currentPwdInput, setCurrentPwdInput] = useState('');
  const [newPwdInput, setNewPwdInput] = useState('');
  const [confirmPwdInput, setConfirmPwdInput] = useState('');
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // Branding state
  const [brandLogoUrl, setBrandLogoUrl] = useState(branding?.logoUrl || DEFAULT_LOGO_URL);
  const [brandSiteName, setBrandSiteName] = useState(branding?.siteName || 'నేటి భారతం');
  const [brandTagline, setBrandTagline] = useState(branding?.tagline || 'ప్రజా గొంతుక - నిష్పక్షపాత సత్య వార్తలు');
  const [brandSuccess, setBrandSuccess] = useState(false);

  React.useEffect(() => {
    if (branding) {
      setBrandLogoUrl(branding.logoUrl || DEFAULT_LOGO_URL);
      setBrandSiteName(branding.siteName || 'నేటి భారతం');
      setBrandTagline(branding.tagline || 'ప్రజా గొంతుక - నిష్పక్షపాత సత్య వార్తలు');
    }
  }, [branding]);

  // Article / Video Bulletins Editing state
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [isCreatingNewArticle, setIsCreatingNewArticle] = useState(false);
  const [articleSearchQuery, setArticleSearchQuery] = useState('');
  const [articleFilter, setArticleFilter] = useState<'all' | 'video' | 'breaking'>('all');

  // Article Edit Form fields
  const [artTitleTe, setArtTitleTe] = useState('');
  const [artTitleEn, setArtTitleEn] = useState('');
  const [artTitleHi, setArtTitleHi] = useState('');
  const [artSummaryTe, setArtSummaryTe] = useState('');
  const [artSummaryEn, setArtSummaryEn] = useState('');
  const [artSummaryHi, setArtSummaryHi] = useState('');
  const [artContentTe, setArtContentTe] = useState('');
  const [artContentEn, setArtContentEn] = useState('');
  const [artCategory, setArtCategory] = useState<NewsCategory>('mandal');
  const [artState, setArtState] = useState('ఆంధ్రప్రదేశ్ (Andhra Pradesh)');
  const [artDistrict, setArtDistrict] = useState('కృష్ణా (Krishna)');
  const [artMandal, setArtMandal] = useState('విజయవాడ అర్బన్ (Vijayawada Urban)');
  const [artImageUrl, setArtImageUrl] = useState('');
  const [artYoutubeUrl, setArtYoutubeUrl] = useState('');
  const [artIsBreaking, setArtIsBreaking] = useState(false);
  const [artStatus, setArtStatus] = useState<'published' | 'pending' | 'rejected'>('published');
  const [artAuthorName, setArtAuthorName] = useState('నేటి భారతం డెస్క్');
  const [artAuthorRole, setArtAuthorRole] = useState('Admin Editor');
  const [articleSaveSuccess, setArticleSaveSuccess] = useState(false);

  // Full Profile & Edit Modal States
  const [selectedReporterForProfile, setSelectedReporterForProfile] = useState<Reporter | null>(null);
  const [editingReporter, setEditingReporter] = useState<Reporter | null>(null);

  // Edit form fields
  const [editFullName, setEditFullName] = useState('');
  const [editMobile, setEditMobile] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editPincode, setEditPincode] = useState('');
  const [editBloodGroup, setEditBloodGroup] = useState('O+');
  const [editDesignation, setEditDesignation] = useState('');
  const [editEmergencyContact, setEditEmergencyContact] = useState('');
  const [editEducation, setEditEducation] = useState('');
  const [editPhotoUrl, setEditPhotoUrl] = useState('');
  const [editAadhaarDocUrl, setEditAadhaarDocUrl] = useState('');
  const [editState, setEditState] = useState('');
  const [editDistrict, setEditDistrict] = useState('');
  const [editMandal, setEditMandal] = useState('');
  const [editStatus, setEditStatus] = useState<'pending' | 'approved' | 'rejected'>('approved');
  const [editIdCardNumber, setEditIdCardNumber] = useState('');
  const [editSuccessMsg, setEditSuccessMsg] = useState(false);

  // AdSense Form
  const [pubId, setPubId] = useState(adSenseConfig.publisherId);
  const [topSlot, setTopSlot] = useState(adSenseConfig.topBannerSlot);
  const [sideSlot, setSideSlot] = useState(adSenseConfig.sidebarSlot);
  const [adSenseEnabled, setAdSenseEnabled] = useState(adSenseConfig.enabled);
  const [adSenseSaved, setAdSenseSaved] = useState(false);

  // Notification Broadcast
  const [notifTitle, setNotifTitle] = useState('');
  const [notifSummary, setNotifSummary] = useState('');
  const [notifSent, setNotifSent] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const stored = getStoredAdminPassword();

    if (
      usernameInput.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() &&
      (passwordInput === stored || passwordInput === ADMIN_PASSWORD)
    ) {
      setIsAuthenticated(true);
      setActiveAdminPassword(stored);
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setAuthError('యూజర్ నేమ్ లేదా పాస్‌వర్డ్ తప్పుగా నమోదు చేయబడింది.');
    }
  };

  // Change Admin Password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess(false);

    const stored = getStoredAdminPassword();
    if (currentPwdInput !== stored && currentPwdInput !== ADMIN_PASSWORD) {
      setPwdError('ప్రస్తుత పాస్‌వర్డ్ తప్పుగా నమోదు చేయబడింది.');
      return;
    }

    if (newPwdInput.length < 6) {
      setPwdError('నూతన పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.');
      return;
    }

    if (newPwdInput !== confirmPwdInput) {
      setPwdError('నూతన పాస్‌వర్డ్ మరియు నిర్ధారణ పాస్‌వర్డ్ సరిపోలలేదు.');
      return;
    }

    saveStoredAdminPassword(newPwdInput);
    setActiveAdminPassword(newPwdInput);
    setPwdSuccess(true);
    setCurrentPwdInput('');
    setNewPwdInput('');
    setConfirmPwdInput('');
    setTimeout(() => {
      setPwdSuccess(false);
    }, 3500);
  };

  // Logo File Upload handler (converts to base64 data URL)
  const handleLogoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBrandLogoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetToOfficialLogo = () => {
    setBrandLogoUrl(DEFAULT_LOGO_URL);
  };

  // Save Branding changes
  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateBranding) return;
    const updated: PortalBranding = {
      logoUrl: brandLogoUrl.trim() || DEFAULT_LOGO_URL,
      siteName: brandSiteName.trim() || 'నేటి భారతం',
      tagline: brandTagline.trim() || 'ప్రజా గొంతుక - నిష్పక్షపాత సత్య వార్తలు',
      bannerUrl: branding?.bannerUrl || '',
    };
    onUpdateBranding(updated);
    setBrandSuccess(true);
    setTimeout(() => {
      setBrandSuccess(false);
    }, 2500);
  };

  // Article / Video Bulletins Edit Handlers
  const startEditArticle = (art: NewsArticle) => {
    setEditingArticle(art);
    setIsCreatingNewArticle(false);
    setArtTitleTe(art.title.te || '');
    setArtTitleEn(art.title.en || '');
    setArtTitleHi(art.title.hi || '');
    setArtSummaryTe(art.summary.te || '');
    setArtSummaryEn(art.summary.en || '');
    setArtSummaryHi(art.summary.hi || '');
    setArtContentTe(art.content.te || '');
    setArtContentEn(art.content.en || '');
    setArtCategory(art.category);
    setArtState(art.state || states[0] || 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)');
    setArtDistrict(art.district || '');
    setArtMandal(art.mandal || '');
    setArtImageUrl(art.imageUrl || '');
    setArtYoutubeUrl(art.youtubeUrl || '');
    setArtIsBreaking(Boolean(art.isBreaking));
    setArtStatus(art.status || 'published');
    setArtAuthorName(art.authorName || 'నేటి భారతం డెస్క్');
    setArtAuthorRole(art.authorRole || 'Admin Editor');
    setArticleSaveSuccess(false);
  };

  const startCreateArticle = (isVideo = false) => {
    setEditingArticle(null);
    setIsCreatingNewArticle(true);
    setArtTitleTe('');
    setArtTitleEn('');
    setArtTitleHi('');
    setArtSummaryTe('');
    setArtSummaryEn('');
    setArtSummaryHi('');
    setArtContentTe('');
    setArtContentEn('');
    setArtCategory(isVideo ? 'video' : 'mandal');
    const firstState = states[0] || 'ఆంధ్రప్రదేశ్ (Andhra Pradesh)';
    setArtState(firstState);
    const dList = getDistrictsForState(firstState);
    const firstDist = dList[0] || '';
    setArtDistrict(firstDist);
    const mList = getMandalsForDistrict(firstState, firstDist);
    setArtMandal(mList[0] || '');
    setArtImageUrl('');
    setArtYoutubeUrl('');
    setArtIsBreaking(false);
    setArtStatus('published');
    setArtAuthorName('నేటి భారతం డెస్క్');
    setArtAuthorRole('Admin Editor');
    setArticleSaveSuccess(false);
  };

  const handleArticleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setArtImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artTitleTe.trim()) return;

    let finalImageUrl = artImageUrl.trim();
    if (!finalImageUrl && artYoutubeUrl.trim()) {
      const vidId = extractYouTubeVideoId(artYoutubeUrl.trim());
      if (vidId) {
        finalImageUrl = `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`;
      }
    }
    if (!finalImageUrl) {
      finalImageUrl = 'https://picsum.photos/seed/news-default/800/500';
    }

    if (editingArticle && onUpdateArticle) {
      const updated: NewsArticle = {
        ...editingArticle,
        title: {
          te: artTitleTe.trim(),
          en: artTitleEn.trim() || artTitleTe.trim(),
          hi: artTitleHi.trim() || artTitleTe.trim(),
        },
        summary: {
          te: artSummaryTe.trim() || artTitleTe.trim().slice(0, 150),
          en: artSummaryEn.trim() || artTitleEn.trim() || artTitleTe.trim().slice(0, 150),
          hi: artSummaryHi.trim() || artTitleHi.trim() || artTitleTe.trim().slice(0, 150),
        },
        content: {
          te: artContentTe.trim() || artSummaryTe.trim(),
          en: artContentEn.trim() || artSummaryEn.trim() || artContentTe.trim(),
          hi: artSummaryHi.trim() || artContentTe.trim(),
        },
        category: artCategory,
        state: artState,
        district: artDistrict,
        mandal: artMandal,
        imageUrl: finalImageUrl,
        youtubeUrl: artYoutubeUrl.trim() || undefined,
        isBreaking: artIsBreaking,
        status: artStatus,
        authorName: artAuthorName.trim() || editingArticle.authorName,
        authorRole: (editingArticle.authorRole || 'Admin') as 'Admin' | 'Reporter',
      };
      onUpdateArticle(updated);
      setArticleSaveSuccess(true);
      setTimeout(() => {
        setArticleSaveSuccess(false);
        setEditingArticle(null);
      }, 1200);
    } else if (isCreatingNewArticle && onAddArticle) {
      const newArticle: NewsArticle = {
        id: `art-${Date.now()}`,
        title: {
          te: artTitleTe.trim(),
          en: artTitleEn.trim() || artTitleTe.trim(),
          hi: artTitleHi.trim() || artTitleTe.trim(),
        },
        summary: {
          te: artSummaryTe.trim() || artTitleTe.trim().slice(0, 150),
          en: artSummaryEn.trim() || artTitleEn.trim() || artTitleTe.trim().slice(0, 150),
          hi: artSummaryHi.trim() || artTitleHi.trim() || artTitleTe.trim().slice(0, 150),
        },
        content: {
          te: artContentTe.trim() || artSummaryTe.trim(),
          en: artContentEn.trim() || artSummaryEn.trim() || artContentTe.trim(),
          hi: artSummaryHi.trim() || artContentTe.trim(),
        },
        category: artCategory,
        state: artState,
        district: artDistrict,
        mandal: artMandal,
        imageUrl: finalImageUrl,
        youtubeUrl: artYoutubeUrl.trim() || undefined,
        isBreaking: artIsBreaking,
        status: artStatus,
        views: 1,
        publishedAt: new Date().toISOString(),
        authorName: artAuthorName.trim() || 'నేటి భారతం డెస్క్',
        authorRole: 'Admin' as const,
      };
      onAddArticle(newArticle);
      setArticleSaveSuccess(true);
      setTimeout(() => {
        setArticleSaveSuccess(false);
        setIsCreatingNewArticle(false);
      }, 1200);
    }
  };

  const handleEditPhotoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAadhaarFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setEditAadhaarDocUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const startEditReporter = (rep: Reporter) => {
    setEditingReporter(rep);
    setEditFullName(rep.fullName);
    setEditMobile(rep.mobile);
    setEditEmail(rep.email || '');
    setEditAddress(rep.address || '');
    setEditPincode(rep.pincode || '');
    setEditBloodGroup(rep.bloodGroup || 'O+');
    setEditDesignation(rep.designation || 'మండల ప్రతినిధి / Mandal Reporter');
    setEditEmergencyContact(rep.emergencyContact || '');
    setEditEducation(rep.education || '');
    setEditPhotoUrl(rep.photoUrl || '');
    setEditAadhaarDocUrl(rep.aadhaarDocUrl || '');
    setEditState(rep.state);
    setEditDistrict(rep.district);
    setEditMandal(rep.mandal);
    setEditStatus(rep.status);
    setEditIdCardNumber(rep.idCardNumber || '');
    setEditSuccessMsg(false);
  };

  const handleSaveReporterEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReporter || !onUpdateReporter) return;

    const updated: Reporter = {
      ...editingReporter,
      fullName: editFullName.trim(),
      mobile: editMobile.trim(),
      email: editEmail.trim(),
      address: editAddress.trim(),
      pincode: editPincode.trim(),
      bloodGroup: editBloodGroup,
      designation: editDesignation.trim(),
      emergencyContact: editEmergencyContact.trim(),
      education: editEducation.trim(),
      photoUrl: editPhotoUrl.trim() || editingReporter.photoUrl,
      aadhaarDocUrl: editAadhaarDocUrl.trim() || editingReporter.aadhaarDocUrl,
      state: editState,
      district: editDistrict,
      mandal: editMandal,
      status: editStatus,
      idCardNumber: editIdCardNumber.trim(),
      approvedAt: editStatus === 'approved' ? (editingReporter.approvedAt || new Date().toISOString()) : undefined,
    };

    onUpdateReporter(updated);
    if (selectedReporterForProfile && selectedReporterForProfile.id === updated.id) {
      setSelectedReporterForProfile(updated);
    }
    setEditSuccessMsg(true);
    setTimeout(() => {
      setEditSuccessMsg(false);
      setEditingReporter(null);
    }, 1200);
  };

  const handleSaveAdSense = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAdSense({
      enabled: adSenseEnabled,
      publisherId: pubId,
      topBannerSlot: topSlot,
      sidebarSlot: sideSlot,
      inFeedSlot: adSenseConfig.inFeedSlot,
    });
    setAdSenseSaved(true);
    setTimeout(() => setAdSenseSaved(false), 2000);
  };

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifTitle) return;

    onBroadcastNotification({
      id: `notif-${Date.now()}`,
      title: notifTitle,
      summary: notifSummary || notifTitle,
      timestamp: 'ఇప్పుడే',
      type: 'breaking',
      read: false,
    });

    setNotifSent(true);
    setTimeout(() => {
      setNotifSent(false);
      setNotifTitle('');
      setNotifSummary('');
    }, 2000);
  };

  const pendingReporters = reporters.filter((r) => r.status === 'pending');
  const pendingAds = ads.filter((a) => a.status === 'pending');

  const states = getAllStates();
  const editDistricts = editState ? getDistrictsForState(editState) : [];
  const editMandals = editState && editDistrict ? getMandalsForDistrict(editState, editDistrict) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700 rounded-lg text-white">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg font-serif tracking-wide text-amber-300">
                నేటి భారతం - ప్రధాన నిర్వాహక ప్యానెల్ (Super Admin Panel)
              </h3>
              <p className="text-xs text-slate-400">
                మండల రిపోర్టర్ల ఆమోదం & ప్రొఫైల్ సవరణ, ప్రకటనల నిర్వహణ, గూగుల్ యాడ్‌సెన్స్
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clean Login Box (NO credentials displayed!) */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-serif">
                అడ్మిన్ ప్రమాణీకరణ (Admin Login)
              </h4>
              <p className="text-xs text-slate-500">
                భద్రతా వ్యవస్థ ద్వారా సురక్షితం చేయబడింది
              </p>
            </div>

            {authError && (
              <div className="bg-red-50 text-red-800 border border-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  అడ్మిన్ యూజర్ నేమ్ (Admin Username)
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="యూజర్ నేమ్ నమోదు చేయండి"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  పాస్‌వర్డ్ (Admin Password)
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-black rounded-xl text-xs transition shadow-md cursor-pointer tracking-wider uppercase"
              >
                అడ్మిన్ లాగిన్ చేయండి
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Admin Nav Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setAdminTab('reporters')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'reporters'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>రిపోర్టర్ల నిర్వహణ</span>
                {pendingReporters.length > 0 && (
                  <span className="bg-amber-400 text-red-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                    {pendingReporters.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setAdminTab('articles')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'articles'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>వార్తల నిర్వహణ ({articles.length})</span>
              </button>

              <button
                onClick={() => setAdminTab('videos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'videos'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-red-500" />
                <span>వీడియో బులెటిన్లు ({articles.filter((a) => a.youtubeUrl).length})</span>
              </button>

              <button
                onClick={() => setAdminTab('branding')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'branding'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>లోగో & బ్రాండింగ్</span>
              </button>

              <button
                onClick={() => setAdminTab('security')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'security'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-purple-600" />
                <span>పాస్‌వర్డ్ మార్పు</span>
              </button>

              <button
                onClick={() => setAdminTab('ads')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'ads'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Megaphone className="w-3.5 h-3.5" />
                <span>ప్రకటనలు</span>
                {pendingAds.length > 0 && (
                  <span className="bg-amber-400 text-red-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                    {pendingAds.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setAdminTab('adsense')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'adsense'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>యాడ్‌సెన్స్</span>
              </button>

              <button
                onClick={() => setAdminTab('notifications')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'notifications'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>నోటిఫికేషన్లు</span>
              </button>

              <button
                onClick={() => setAdminTab('feedback')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  adminTab === 'feedback'
                    ? 'bg-red-700 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>ఫీడ్‌బ్యాక్ ({feedback.length})</span>
              </button>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="ml-auto text-xs text-red-700 font-bold hover:underline cursor-pointer px-2 py-1 shrink-0"
              >
                నిష్క్రమించు
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* 1. REPORTERS MANAGEMENT WITH FULL PROFILE & EDIT */}
              {adminTab === 'reporters' && (
                <div className="space-y-6">
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div>
                      <h4 className="text-base font-black text-slate-900 font-serif">
                        మండల రిపోర్టర్ల సమీక్ష & ప్రొఫైల్ నిర్వహణ (Reporters Directory & Profile Control)
                      </h4>
                      <p className="text-xs text-slate-500">
                        ఆధార్ కార్డు ఫోటో, కాంటాక్ట్ నంబర్, ఐడీ కార్డు పరిశీలించండి మరియు వివరాలను ఎప్పుడైనా సవరించండి.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-900 rounded-lg self-start sm:self-auto">
                      మొత్తం రిపోర్టర్లు: {reporters.length} (పెండింగ్: {pendingReporters.length})
                    </span>
                  </div>

                  {/* Pending Queue */}
                  {pendingReporters.length > 0 && (
                    <div className="space-y-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-700" />
                        <h5 className="font-extrabold text-sm text-amber-950">
                          ఆమోదం కోసం వేచి ఉన్న దరఖాస్తులు ({pendingReporters.length}):
                        </h5>
                      </div>

                      <div className="space-y-3">
                        {pendingReporters.map((rep) => (
                          <div
                            key={rep.id}
                            className="p-3.5 bg-white rounded-xl border border-amber-300 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                          >
                            <div className="flex items-center gap-3">
                              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                                {rep.photoUrl ? (
                                  <img
                                    src={rep.photoUrl}
                                    alt={rep.fullName}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">
                                    ఫోటో
                                  </div>
                                )}
                              </div>

                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2">
                                  <h6 className="font-extrabold text-sm text-slate-900">
                                    {rep.fullName}
                                  </h6>
                                  <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">
                                    {rep.idCardNumber || 'NEW REQ'}
                                  </span>
                                </div>
                                <p className="text-xs font-bold text-red-800">
                                  మండలం: <strong>{rep.mandal}</strong>, జిల్లా: {rep.district} ({rep.state})
                                </p>
                                <div className="flex items-center gap-3 text-[11px] text-slate-600">
                                  <span>ఫోన్: +91 {rep.mobile}</span>
                                  <span>ఆధార్: {rep.aadhaarNumber}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0 flex-wrap">
                              {/* View Full Profile & Aadhaar */}
                              <button
                                onClick={() => setSelectedReporterForProfile(rep)}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 text-blue-600" />
                                <span>పూర్తి ప్రొఫైల్ & ఆధార్</span>
                              </button>

                              {/* Edit details */}
                              <button
                                onClick={() => startEditReporter(rep)}
                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5 text-amber-600" />
                                <span>సవరించు</span>
                              </button>

                              {/* Approve */}
                              <button
                                onClick={() => onApproveReporter(rep.id)}
                                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-2xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>ఆమోదించండి</span>
                              </button>

                              {/* Reject */}
                              <button
                                onClick={() => onRejectReporter(rep.id)}
                                className="px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-xs font-bold transition cursor-pointer"
                              >
                                తిరస్కరించు
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* All Approved / Registered Reporters Table */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                      అధికారిక మండల రిపోర్టర్లు & పూర్తి రికార్డులు:
                    </h5>

                    <div className="space-y-2.5">
                      {reporters.map((rep) => (
                        <div
                          key={rep.id}
                          className="p-3 bg-white border border-slate-200 rounded-xl shadow-2xs hover:shadow-md transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-300 shrink-0">
                              {rep.photoUrl ? (
                                <img
                                  src={rep.photoUrl}
                                  alt={rep.fullName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-slate-500">
                                  {rep.fullName.charAt(0)}
                                </div>
                              )}
                            </div>

                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <h6 className="font-extrabold text-sm text-slate-900">
                                  {rep.fullName}
                                </h6>
                                <span
                                  className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${
                                    rep.status === 'approved'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : rep.status === 'pending'
                                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {rep.status === 'approved' ? '✓ Approved' : rep.status === 'pending' ? 'Pending' : 'Rejected'}
                                </span>
                              </div>
                              <p className="text-xs text-red-800 font-semibold">
                                మండలం: <strong>{rep.mandal}</strong>, జిల్లా: {rep.district}
                              </p>
                              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                                <span className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-emerald-600" />
                                  +91 {rep.mobile}
                                </span>
                                <span>ఐడీ: {rep.idCardNumber || 'NB-REP'}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            {/* View Full Profile & ID Card */}
                            <button
                              onClick={() => setSelectedReporterForProfile(rep)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-blue-200"
                            >
                              <IdCard className="w-3.5 h-3.5 text-blue-700" />
                              <span>పూర్తి ప్రొఫైల్ & ఐడీ కార్డు</span>
                            </button>

                            {/* Edit Details */}
                            <button
                              onClick={() => startEditReporter(rep)}
                              className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-amber-200"
                            >
                              <Edit className="w-3.5 h-3.5 text-amber-700" />
                              <span>వివరాలు సవరించండి</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 2. ARTICLES MANAGEMENT & FULL EDITING */}
              {adminTab === 'articles' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h4 className="text-base font-black text-slate-900 font-serif flex items-center gap-2">
                        <FileText className="w-5 h-5 text-red-700" />
                        <span>వార్తల సమీక్ష & సంపూర్ణ సవరణ (News Management & Full Editing)</span>
                      </h4>
                      <p className="text-xs text-slate-500">
                        వార్తా శీర్షిక, యూట్యూబ్ లింక్, ఫోటో, కథనం మరియు ప్రాంతీయ వివరాలను ఇక్కడ సవరించవచ్చు.
                      </p>
                    </div>

                    <button
                      onClick={() => startCreateArticle(false)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>నూతన వార్త రాయండి</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => setArticleFilter('all')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          articleFilter === 'all'
                            ? 'bg-white text-slate-900 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        అన్నీ ({articles.length})
                      </button>
                      <button
                        onClick={() => setArticleFilter('video')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                          articleFilter === 'video'
                            ? 'bg-red-700 text-white shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <Video className="w-3 h-3" />
                        <span>వీడియో బులెటిన్లు ({articles.filter((a) => a.youtubeUrl).length})</span>
                      </button>
                      <button
                        onClick={() => setArticleFilter('breaking')}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                          articleFilter === 'breaking'
                            ? 'bg-amber-400 text-red-950 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <span>★ బ్రేకింగ్ ({articles.filter((a) => a.isBreaking).length})</span>
                      </button>
                    </div>

                    <div className="relative flex-1 sm:max-w-xs">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={articleSearchQuery}
                        onChange={(e) => setArticleSearchQuery(e.target.value)}
                        placeholder="శీర్షిక లేదా మండలం శోధించండి..."
                        className="w-full text-xs pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
                      />
                    </div>
                  </div>

                  {/* Articles List */}
                  <div className="space-y-2.5">
                    {articles
                      .filter((art) => {
                        if (articleFilter === 'video') return Boolean(art.youtubeUrl);
                        if (articleFilter === 'breaking') return Boolean(art.isBreaking);
                        return true;
                      })
                      .filter((art) => {
                        if (!articleSearchQuery.trim()) return true;
                        const q = articleSearchQuery.toLowerCase();
                        return (
                          art.title.te.toLowerCase().includes(q) ||
                          (art.title.en && art.title.en.toLowerCase().includes(q)) ||
                          (art.mandal && art.mandal.toLowerCase().includes(q)) ||
                          (art.authorName && art.authorName.toLowerCase().includes(q))
                        );
                      })
                      .map((art) => (
                        <div
                          key={art.id}
                          className="p-3 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:shadow-md transition"
                        >
                          <div className="flex items-start gap-3">
                            <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                              {art.imageUrl ? (
                                <img
                                  src={art.imageUrl}
                                  alt={art.title.te}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400">
                                  <ImageIcon className="w-5 h-5" />
                                </div>
                              )}
                              {art.youtubeUrl && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <Play className="w-4 h-4 fill-white text-white drop-shadow" />
                                </div>
                              )}
                            </div>

                            <div className="space-y-1">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                  {art.mandal || art.district}
                                </span>
                                {art.youtubeUrl && (
                                  <span className="text-[10px] font-bold bg-red-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                                    <Video className="w-3 h-3" />
                                    <span>వీడియో</span>
                                  </span>
                                )}
                                {art.isBreaking && (
                                  <span className="text-[10px] font-black bg-amber-400 text-red-950 px-2 py-0.5 rounded">
                                    ★ BREAKING
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-500 font-medium">
                                  వర్గం: {art.category}
                                </span>
                              </div>

                              <h6 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 font-serif">
                                {art.title.te}
                              </h6>

                              <div className="flex items-center gap-3 text-[11px] text-slate-500">
                                <span>రిపోర్టర్: <strong>{art.authorName}</strong></span>
                                <span>వీక్షణలు: <strong>{formatViewCount(art.views)}</strong></span>
                                {art.youtubeUrl && (
                                  <a
                                    href={art.youtubeUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-red-600 hover:underline flex items-center gap-1 font-bold"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    <span>యూట్యూబ్ లింక్</span>
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto flex-wrap">
                            {/* Edit Article & Video Link */}
                            <button
                              onClick={() => startEditArticle(art)}
                              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer border border-blue-200"
                            >
                              <Edit className="w-3.5 h-3.5 text-blue-600" />
                              <span>వార్త / వీడియో సవరణ</span>
                            </button>

                            {/* Toggle Breaking */}
                            <button
                              onClick={() => onToggleBreaking(art.id)}
                              className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                                art.isBreaking
                                  ? 'bg-amber-400 text-red-950'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              }`}
                            >
                              {art.isBreaking ? '★ బ్రేకింగ్ ఆన్' : 'బ్రేకింగ్ చెయ్యి'}
                            </button>

                            {/* Delete Article */}
                            <button
                              onClick={() => onDeleteArticle(art.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                              title="వార్తను తొలగించు"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* 3. DEDICATED VIDEO NEWS BULLETINS & YOUTUBE LINKS */}
              {adminTab === 'videos' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-red-950 text-white p-4 sm:p-5 rounded-2xl border border-red-900 shadow-md">
                    <div>
                      <h4 className="text-base sm:text-lg font-black font-serif flex items-center gap-2 text-white">
                        <Video className="w-5 h-5 text-amber-400" />
                        <span>వీడియో న్యూస్ బులెటిన్లు & యూట్యూబ్ లింకులు (Video Bulletins Management)</span>
                      </h4>
                      <p className="text-xs text-red-200 mt-0.5">
                        హోమ్‌పేజీలోని వీడియో బులెటిన్ సెక్షన్‌లో ప్రసారమయ్యే యూట్యూబ్ వీడియో లింకులను నేరుగా సవరించండి.
                      </p>
                    </div>

                    <button
                      onClick={() => startCreateArticle(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-red-950 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer shrink-0 self-start sm:self-auto"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>+ నూతన వీడియో బులెటిన్ జోడించండి</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles
                      .filter((a) => a.youtubeUrl)
                      .map((art) => {
                        const vidId = extractYouTubeVideoId(art.youtubeUrl);
                        return (
                          <div
                            key={art.id}
                            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                          >
                            <div className="relative aspect-video w-full bg-slate-900">
                              {vidId ? (
                                <iframe
                                  src={`https://www.youtube.com/embed/${vidId}`}
                                  title={art.title.te}
                                  className="w-full h-full border-0"
                                  allowFullScreen
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                                  వీడియో ప్రివ్యూ అందుబాటులో లేదు
                                </div>
                              )}
                            </div>

                            <div className="p-3.5 space-y-2 flex-1">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] font-bold text-red-800 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                                  📍 {art.mandal || art.district}
                                </span>
                                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                                  <Eye className="w-3.5 h-3.5 text-amber-600" />
                                  {formatViewCount(art.views)} వ్యూస్
                                </span>
                              </div>

                              <h5 className="font-bold text-sm text-slate-900 line-clamp-2 font-serif">
                                {art.title.te}
                              </h5>

                              <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 break-all flex items-center justify-between gap-2">
                                <span className="truncate">{art.youtubeUrl}</span>
                                <a
                                  href={art.youtubeUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-red-700 hover:text-red-800 shrink-0"
                                  title="ఓపెన్ చేయండి"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            </div>

                            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                              <button
                                onClick={() => startEditArticle(art)}
                                className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>వీడియో లింక్ / వివరాలు సవరించండి</span>
                              </button>

                              <button
                                onClick={() => onDeleteArticle(art.id)}
                                className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition cursor-pointer"
                                title="వీడియోను తొలగించు"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}

              {/* 4. LOGO & BRANDING SETTINGS */}
              {adminTab === 'branding' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="bg-gradient-to-r from-red-800 via-red-900 to-amber-900 text-white p-5 rounded-2xl shadow-md border-2 border-amber-400/40">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/10 rounded-xl">
                        <Sparkles className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black font-serif text-white">
                          పోర్టల్ లోగో & బ్రాండింగ్ సెట్టింగ్స్ (Portal Logo & Branding)
                        </h4>
                        <p className="text-xs text-red-200">
                          పోర్టల్ లోగోను మార్చండి, సైట్ పేరు మరియు అధికారిక ట్యాగ్‌లైన్‌ను సులభంగా కాన్ఫిగర్ చేయండి.
                        </p>
                      </div>
                    </div>
                  </div>

                  {brandSuccess && (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2.5 text-emerald-900 text-xs font-bold animate-in fade-in">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>లోగో మరియు బ్రాండింగ్ వివరాలు విజయవంతంగా సేవ్ చేయబడ్డాయి! పోర్టల్ అంతటా తక్షణమే అమలులోకి వచ్చాయి.</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveBranding} className="space-y-6">
                    {/* Active Logo Previews */}
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                      <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">
                        ప్రస్తుత లోగో లైవ్ ప్రివ్యూ (Live Logo Previews):
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Light Background Preview */}
                        <div className="p-4 bg-white rounded-xl border border-slate-300 text-center space-y-2 shadow-2xs">
                          <span className="text-[11px] font-bold text-slate-500 block">లైట్ థీమ్ ప్రివ్యూ (Header View):</span>
                          <div className="h-28 flex items-center justify-center p-2">
                            <img
                              src={brandLogoUrl}
                              alt="Logo Light Preview"
                              className="max-h-full max-w-full object-contain rounded-full ring-2 ring-amber-400/80 shadow"
                            />
                          </div>
                          <span className="text-xs font-serif font-black text-red-900 block">{brandSiteName}</span>
                        </div>

                        {/* Dark Background Preview */}
                        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center space-y-2 shadow-2xs text-white">
                          <span className="text-[11px] font-bold text-slate-400 block">డార్క్ థీమ్ ప్రివ్యూ (Footer View):</span>
                          <div className="h-28 flex items-center justify-center p-2">
                            <img
                              src={brandLogoUrl}
                              alt="Logo Dark Preview"
                              className="max-h-full max-w-full object-contain rounded-full ring-2 ring-amber-400 shadow"
                            />
                          </div>
                          <span className="text-xs font-serif font-black text-amber-300 block">{brandSiteName}</span>
                        </div>
                      </div>
                    </div>

                    {/* Change Logo Options */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                        లోగో మార్పు ఎంపికలు (Change Portal Logo):
                      </label>

                      {/* File upload button */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs">
                          <Upload className="w-4 h-4 text-amber-300" />
                          <span>ఫోన్ / సిస్టమ్ నుండి కొత్త లోగోను అప్‌లోడ్ చేయండి</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoFileSelect}
                            className="hidden"
                          />
                        </label>

                        {/* Reset to official logo */}
                        <button
                          type="button"
                          onClick={handleResetToOfficialLogo}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold cursor-pointer transition border border-slate-300"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-red-600" />
                          <span>అధికారిక త్రివర్ణ లోగోను పునరుద్ధరించండి</span>
                        </button>
                      </div>

                      {/* Logo URL Input */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          లేదా లోగో ఇమేజ్ URL (Or Custom Logo Image URL):
                        </label>
                        <input
                          type="text"
                          value={brandLogoUrl}
                          onChange={(e) => setBrandLogoUrl(e.target.value)}
                          placeholder="https://... లేదా /assets/..."
                          className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Site Name & Tagline */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3.5 shadow-2xs">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          పోర్టల్ పేరు (Site Name) *
                        </label>
                        <input
                          type="text"
                          required
                          value={brandSiteName}
                          onChange={(e) => setBrandSiteName(e.target.value)}
                          className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          అధికారిక ట్యాగ్‌లైన్ (Tagline / Slogan) *
                        </label>
                        <input
                          type="text"
                          required
                          value={brandTagline}
                          onChange={(e) => setBrandTagline(e.target.value)}
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white rounded-xl text-xs font-bold transition shadow-md cursor-pointer"
                      >
                        బ్రాండింగ్ వివరాలను సేవ్ చేయండి (Save Branding)
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 5. ADMIN PASSWORD CHANGE & SECURITY */}
              {adminTab === 'security' && (
                <div className="space-y-6 max-w-xl mx-auto">
                  <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-md border-b-4 border-amber-400">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/10 rounded-xl">
                        <Key className="w-6 h-6 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-base font-black font-serif text-white">
                          అడ్మిన్ పాస్‌వర్డ్ మార్పు (Change Admin Password)
                        </h4>
                        <p className="text-xs text-slate-300">
                          మీ అడ్మిన్ ఖాతా భద్రత కోసం ఎప్పటికప్పుడు పాస్‌వర్డ్‌ను నవీకరించుకోండి.
                        </p>
                      </div>
                    </div>
                  </div>

                  {pwdError && (
                    <div className="p-3.5 bg-red-50 border border-red-300 rounded-xl text-red-800 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{pwdError}</span>
                    </div>
                  )}

                  {pwdSuccess && (
                    <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>అడ్మిన్ పాస్‌వర్డ్ విజయవంతంగా మార్చబడింది! భవిష్యత్తులో ఈ నూతన పాస్‌వర్డ్‌తో లాగిన్ అవ్వగలరు.</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 block mb-1">
                        అడ్మిన్ యూజర్ నేమ్ (Admin Username):
                      </span>
                      <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-bold text-slate-800 font-mono">
                        {ADMIN_USERNAME}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ప్రస్తుత పాస్‌వర్డ్ (Current Password) *
                      </label>
                      <div className="relative">
                        <input
                          type={showCurrentPwd ? 'text' : 'password'}
                          required
                          value={currentPwdInput}
                          onChange={(e) => setCurrentPwdInput(e.target.value)}
                          placeholder="ప్రస్తుత పాస్‌వర్డ్ నమోదు చేయండి"
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        నూతన పాస్‌వర్డ్ (New Password) *
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPwd ? 'text' : 'password'}
                          required
                          value={newPwdInput}
                          onChange={(e) => setNewPwdInput(e.target.value)}
                          placeholder="కనీసం 6 అక్షరాల నూతన పాస్‌వర్డ్"
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPwd(!showNewPwd)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        నూతన పాస్‌వర్డ్‌ను నిర్ధారించండి (Confirm New Password) *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPwdInput}
                        onChange={(e) => setConfirmPwdInput(e.target.value)}
                        placeholder="మరలా నూతన పాస్‌వర్డ్ నమోదు చేయండి"
                        className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold rounded-xl text-xs transition shadow-md cursor-pointer"
                      >
                        పాస్‌వర్డ్‌ను అప్‌డేట్ చేయండి (Update Password)
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 3. ADS APPROVAL */}
              {adminTab === 'ads' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-slate-900 font-serif">
                        ప్రైవేట్ వాణిజ్య ప్రకటనల ఆమోదం (Private Classifieds Approval)
                      </h4>
                      <p className="text-xs text-slate-500">
                        యూజర్లు సమర్పించిన ఫోటోలు మరియు యూట్యూబ్ వీడియో లింకులతో కూడిన ప్రకటనలను పరిశీలించి ఆమోదించండి.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg">
                      పెండింగ్ యాడ్స్: {pendingAds.length}
                    </span>
                  </div>

                  {ads.map((ad) => (
                    <div
                      key={ad.id}
                      className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        {ad.bannerUrl && (
                          <div className="relative w-20 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                            <img
                              src={ad.bannerUrl}
                              alt={ad.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-bold text-red-700">
                              📍 {ad.mandal} • {ad.district}
                            </span>
                            <span
                              className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                ad.status === 'approved'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {ad.status === 'approved' ? 'లైవ్ / ఆమోదించబడింది' : 'పెండింగ్'}
                            </span>
                            {ad.youtubeUrl && (
                              <span className="bg-red-50 text-red-700 text-[10px] font-bold px-1.5 py-0.2 rounded border border-red-200">
                                వీడియో ఉంది
                              </span>
                            )}
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 mt-0.5">
                            {ad.title}
                          </h5>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                            {ad.description}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-1">
                            ప్రకటనదారు: {ad.advertiserName} | ఫోన్: {ad.contactPhone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {ad.status === 'pending' ? (
                          <>
                            <button
                              onClick={() => onApproveAd(ad.id)}
                              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                            >
                              ఆమోదించండి
                            </button>
                            <button
                              onClick={() => onRejectAd(ad.id)}
                              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
                            >
                              తిరస్కరించు
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => onDeleteAd(ad.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 4. GOOGLE ADSENSE SETUP */}
              {adminTab === 'adsense' && (
                <div className="max-w-2xl space-y-5">
                  <div>
                    <h4 className="text-base font-black text-slate-900 font-serif">
                      గూగుల్ యాడ్‌సెన్స్ నిర్వహణ (Google AdSense Integration)
                    </h4>
                    <p className="text-xs text-slate-500">
                      వెబ్‌సైట్ మరియు మొబైల్ యాప్‌లో ప్రకటనల రెవెన్యూ కోసం AdSense పబ్లిషర్ ఐడీ మరియు స్లాట్లను కాన్ఫిగర్ చేయండి.
                    </p>
                  </div>

                  {adSenseSaved && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>గూగుల్ యాడ్‌సెన్స్ సెట్టింగ్స్ విజయవంతంగా సేవ్ చేయబడ్డాయి!</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveAdSense} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          యాడ్‌సెన్స్ ప్రకటనలను ప్రారంభించండి (Enable Google Ads)
                        </span>
                        <span className="text-[11px] text-slate-500">
                          హెడర్, ఆర్టికల్ మధ్యలో మరియు సైడ్‌బార్‌లో బ్యానర్లు ప్రదర్శించబడతాయి
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={adSenseEnabled}
                        onChange={(e) => setAdSenseEnabled(e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        AdSense Publisher ID (pub-xxxx)
                      </label>
                      <input
                        type="text"
                        required
                        value={pubId}
                        onChange={(e) => setPubId(e.target.value)}
                        placeholder="ca-pub-9848012345678901"
                        className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          టాప్ బ్యానర్ స్లాట్ ఐడీ (Leaderboard 728x90)
                        </label>
                        <input
                          type="text"
                          value={topSlot}
                          onChange={(e) => setTopSlot(e.target.value)}
                          placeholder="slot-banner-top-728x90"
                          className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ఆర్టికల్ సైడ్‌బార్ స్లాట్ ఐడీ (Square 300x250)
                        </label>
                        <input
                          type="text"
                          value={sideSlot}
                          onChange={(e) => setSideSlot(e.target.value)}
                          placeholder="slot-sidebar-300x250"
                          className="w-full text-xs font-mono px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                    >
                      యాడ్‌సెన్స్ వివరాలను సేవ్ చేయండి
                    </button>
                  </form>
                </div>
              )}

              {/* 5. BROADCAST PUSH NOTIFICATIONS */}
              {adminTab === 'notifications' && (
                <div className="max-w-2xl space-y-4">
                  <div>
                    <h4 className="text-base font-black text-slate-900 font-serif">
                      లైవ్ పుష్ నోటిఫికేషన్ ప్రసారం (Push Notification Broadcast)
                    </h4>
                    <p className="text-xs text-slate-500">
                      బ్రేకింగ్ వార్తలను యాప్ యూజర్లందరికీ తక్షణ నోటిఫికేషన్‌గా పంపండి.
                    </p>
                  </div>

                  {notifSent && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>నోటిఫికేషన్ సబ్‌స్క్రైబర్లందరికీ విజయవంతంగా ప్రసారం చేయబడింది!</span>
                    </div>
                  )}

                  <form onSubmit={handleSendNotification} className="space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        నోటిఫికేషన్ శీర్షిక (Title) *
                      </label>
                      <input
                        type="text"
                        required
                        value={notifTitle}
                        onChange={(e) => setNotifTitle(e.target.value)}
                        placeholder="ఉదా: బ్రేకింగ్ న్యూస్: విజయవాడలో భారీ ప్రకటన..."
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        సందేశం (Brief Message)
                      </label>
                      <input
                        type="text"
                        value={notifSummary}
                        onChange={(e) => setNotifSummary(e.target.value)}
                        placeholder="మరిన్ని వివరాల కోసం ఇక్కడ నొక్కండి..."
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>నోటిఫికేషన్ పంపండి (Broadcast Alert)</span>
                    </button>
                  </form>
                </div>
              )}

              {/* 6. USER FEEDBACK */}
              {adminTab === 'feedback' && (
                <div className="space-y-4">
                  <h4 className="text-base font-black text-slate-900 font-serif">
                    పాఠకుల ఫీడ్‌బ్యాక్ & సమీక్షలు (User Feedback)
                  </h4>
                  {feedback.length === 0 ? (
                    <p className="text-xs text-slate-500">ఇంకా ఎలాంటి ఫీడ్‌బ్యాక్ అందలేదు.</p>
                  ) : (
                    <div className="space-y-3">
                      {feedback.map((fb) => (
                        <div
                          key={fb.id}
                          className="p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-900">
                              {fb.userName} ({fb.userPhone || 'No Phone'})
                            </span>
                            <span className="text-amber-500 font-bold">
                              {'★'.repeat(fb.rating)} ({fb.rating}/5)
                            </span>
                          </div>
                          <p className="text-xs text-slate-700 mt-1">{fb.message}</p>
                          <span className="text-[10px] text-slate-400 block pt-1">
                            తేదీ: {new Date(fb.createdAt).toLocaleDateString('te-IN')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: FULL REPORTER PROFILE WITH AADHAAR PHOTO, CONTACT & ID CARD */}
      {selectedReporterForProfile && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-red-800 text-white px-5 py-4 flex items-center justify-between border-b border-red-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <FileBadge className="w-5 h-5 text-amber-300" />
                <div>
                  <h4 className="font-extrabold text-base font-serif">
                    రిపోర్టర్ పూర్తి ప్రొఫైల్ రికార్డు (Reporter Full Dossier)
                  </h4>
                  <p className="text-xs text-red-200">
                    ఆధార్ కార్డు పత్రం, ఫోటో, మొబైల్ మరియు అధికారిక ప్రెస్ గుర్తింపు కార్డు
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedReporterForProfile(null)}
                className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-red-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Content */}
            <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1">
              {/* Personal Info Box */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-200 border-2 border-red-700 shrink-0 shadow-md">
                  {selectedReporterForProfile.photoUrl ? (
                    <img
                      src={selectedReporterForProfile.photoUrl}
                      alt={selectedReporterForProfile.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-slate-400">
                      {selectedReporterForProfile.fullName.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-xl font-black text-slate-900 font-serif">
                      {selectedReporterForProfile.fullName}
                    </h3>
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                        selectedReporterForProfile.status === 'approved'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {selectedReporterForProfile.status === 'approved' ? '✓ ఆమోదించబడింది (Approved)' : '⏳ పరిశీలనలో ఉంది (Pending)'}
                    </span>
                    {selectedReporterForProfile.bloodGroup && (
                      <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold bg-rose-100 text-rose-800 border border-rose-300">
                        <Heart className="w-3 h-3 fill-rose-600 text-rose-600" />
                        గ్రూప్: {selectedReporterForProfile.bloodGroup}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-red-800">
                    హోదా: {selectedReporterForProfile.designation || 'మండల ప్రతినిధి / Mandal Reporter'}
                  </p>
                  <p className="text-xs font-semibold text-slate-600">
                    అధికారిక మండలం: <strong className="text-slate-900">{selectedReporterForProfile.mandal}</strong> • జిల్లా: <strong className="text-slate-900">{selectedReporterForProfile.district}</strong> • {selectedReporterForProfile.state}
                  </p>

                  {/* Complete Reporter Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>మొబైల్: <strong>+91 {selectedReporterForProfile.mobile}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>ఈమెయిల్: {selectedReporterForProfile.email ? (
                        <a href={`mailto:${selectedReporterForProfile.email}`} className="text-blue-700 underline font-semibold">
                          {selectedReporterForProfile.email}
                        </a>
                      ) : (
                        <span className="text-slate-400">నమోదు కాలేదు</span>
                      )}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>అత్యవసర సంప్రదింపు: {selectedReporterForProfile.emergencyContact ? (
                        <a href={`tel:${selectedReporterForProfile.emergencyContact}`} className="text-rose-700 font-bold">
                          +91 {selectedReporterForProfile.emergencyContact}
                        </a>
                      ) : (
                        <span className="text-slate-400">నమోదు కాలేదు</span>
                      )}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>విద్యార్హత: <strong>{selectedReporterForProfile.education || 'నమోదు కాలేదు'}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FileBadge className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>ఆధార్ నంబర్: <strong>{selectedReporterForProfile.aadhaarNumber}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <IdCard className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      <span>ప్రెస్ ఐడీ నంబర్: <strong>{selectedReporterForProfile.idCardNumber || 'NB-REP-001'}</strong></span>
                    </div>

                    <div className="sm:col-span-2 flex items-start gap-2 pt-1 border-t border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-slate-500">నివాస / ఆఫీస్ చిరునామా (Address): </span>
                        <strong className="text-slate-800">
                          {selectedReporterForProfile.address || 'చిరునామా నమోదు కాలేదు'}
                          {selectedReporterForProfile.pincode ? ` - పిన్‌కోడ్: ${selectedReporterForProfile.pincode}` : ''}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${selectedReporterForProfile.mobile}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>డైరెక్ట్ కాల్ చేయండి</span>
                    </a>
                    {selectedReporterForProfile.email && (
                      <a
                        href={`mailto:${selectedReporterForProfile.email}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-2xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>ఈమెయిల్ పంపండి</span>
                      </a>
                    )}
                    <button
                      onClick={() => {
                        startEditReporter(selectedReporterForProfile);
                        setSelectedReporterForProfile(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>వివరాలను సవరించండి</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Aadhaar Card Photo Preview Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                    <FileBadge className="w-4 h-4 text-red-700" />
                    <span>ఆధార్ కార్డు పత్రం / ఫోటో (Aadhaar Card Document Preview):</span>
                  </h5>
                  <span className="text-xs text-slate-500 font-mono">
                    {selectedReporterForProfile.aadhaarNumber}
                  </span>
                </div>

                <div className="relative aspect-video max-h-[300px] w-full rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-300 shadow-md flex items-center justify-center">
                  {selectedReporterForProfile.aadhaarDocUrl ? (
                    <img
                      src={selectedReporterForProfile.aadhaarDocUrl}
                      alt="ఆధార్ కార్డు ఫోటో"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-6 text-white space-y-1">
                      <FileBadge className="w-10 h-10 mx-auto text-amber-400 opacity-80" />
                      <p className="text-xs font-bold">ఆధార్ కార్డు పత్రం అప్‌లోడ్ చేయబడింది</p>
                      <span className="text-[11px] text-slate-400">వెరిఫికేషన్ నంబర్: {selectedReporterForProfile.aadhaarNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Digital Press ID Card Preview Section */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <h5 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
                  <IdCard className="w-4 h-4 text-blue-700" />
                  <span>డిజిటల్ ప్రెస్ ఐడీ కార్డు (Official Press ID Card):</span>
                </h5>

                <div className="max-w-md mx-auto bg-gradient-to-br from-red-800 via-red-900 to-slate-950 rounded-2xl p-5 text-white shadow-xl border-2 border-amber-400 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Image src="/icon.svg" alt="logo" width={32} height={32} className="rounded" referrerPolicy="no-referrer" />
                      <div>
                        <h6 className="font-black text-sm font-serif">నేటి భారతం న్యూస్</h6>
                        <span className="text-[9px] text-amber-300 font-bold uppercase tracking-widest block">
                          AUTHORIZED PRESS CARD
                        </span>
                      </div>
                    </div>
                    <span className="bg-amber-400 text-red-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      {selectedReporterForProfile.bloodGroup ? `BLOOD: ${selectedReporterForProfile.bloodGroup}` : 'PRESS'}
                    </span>
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="relative w-20 h-24 rounded-xl overflow-hidden bg-slate-800 border-2 border-amber-400 shrink-0">
                      {selectedReporterForProfile.photoUrl ? (
                        <img
                          src={selectedReporterForProfile.photoUrl}
                          alt={selectedReporterForProfile.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] text-amber-300 font-bold block">
                        CARD ID: {selectedReporterForProfile.idCardNumber || 'NB-REP-001'}
                      </span>
                      <h5 className="font-extrabold text-sm text-white">
                        {selectedReporterForProfile.fullName}
                      </h5>
                      <p className="text-[11px] text-amber-200 font-semibold">
                        {selectedReporterForProfile.designation || 'మండల ప్రతినిధి'}
                      </p>
                      <p className="text-[11px] text-slate-200">
                        మండలం: <strong>{selectedReporterForProfile.mandal}</strong>, జిల్లా: {selectedReporterForProfile.district}
                      </p>
                      <p className="text-[11px] text-slate-300">
                        ఫోన్: +91 {selectedReporterForProfile.mobile}
                      </p>
                      {selectedReporterForProfile.emergencyContact && (
                        <p className="text-[10px] text-rose-300">
                          అత్యవసర: +91 {selectedReporterForProfile.emergencyContact}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-white/20 flex items-center justify-between text-[10px] text-slate-300">
                    <div className="flex items-center gap-1">
                      <QrCode className="w-5 h-5 text-amber-300" />
                      <span className="text-[9px]">చీఫ్ ఎడిటర్ ఆమోదం పొందినది</span>
                    </div>
                    <span className="text-[9px] text-amber-300 font-mono">
                      VALID: 2026-2028
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                నేటి భారతం పాత్రికేయ ధ్రువీకరణ వ్యవస్థ
              </span>
              <button
                onClick={() => setSelectedReporterForProfile(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition cursor-pointer"
              >
                మూసివేయి (Close)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT REPORTER DETAILS (Full Profile & Photo Edit) */}
      {editingReporter && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-2">
                <Edit className="w-5 h-5 text-amber-300" />
                <div>
                  <h4 className="font-extrabold text-base font-serif">
                    రిపోర్టర్ వివరాల సవరణ (Edit Reporter Full Details)
                  </h4>
                  <p className="text-xs text-slate-400">
                    ఫోటో, పూర్తి చిరునామా, బ్లడ్ గ్రూప్, పరిధి మరియు హోదాను సవరించండి
                  </p>
                </div>
              </div>

              <button
                onClick={() => setEditingReporter(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Edit Form */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {editSuccessMsg ? (
                <div className="text-center py-8 space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-base text-slate-900">
                    రిపోర్టర్ వివరాలు విజయవంతంగా అప్‌డేట్ చేయబడ్డాయి!
                  </h5>
                  <p className="text-xs text-slate-500">
                    మార్పులు తక్షణమే అమలులోకి వచ్చాయి.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSaveReporterEdit} className="space-y-4">
                  {/* Photo Edit Section */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
                    <label className="block text-xs font-bold text-slate-800 mb-2">
                      రిపోర్టర్ ప్రొఫైల్ ఫోటో (Reporter Photo Upload / URL):
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-200 border-2 border-red-700 shrink-0 shadow-xs">
                        {editPhotoUrl ? (
                          <img
                            src={editPhotoUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Camera className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <label className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-2xs">
                          <Upload className="w-4 h-4 text-red-600" />
                          <span>ఫోన్ / సిస్టమ్ గ్యాలరీ నుండి ఫోటో ఎంచుకోండి</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleEditPhotoFile}
                            className="hidden"
                          />
                        </label>
                        <div>
                          <input
                            type="url"
                            value={editPhotoUrl}
                            onChange={(e) => setEditPhotoUrl(e.target.value)}
                            placeholder="లేదా ఫోటో URL పేస్ట్ చేయండి (https://...)"
                            className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        రిపోర్టర్ పూర్తి పేరు (Full Name) *
                      </label>
                      <input
                        type="text"
                        required
                        value={editFullName}
                        onChange={(e) => setEditFullName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        మొబైల్ నంబర్ (Mobile Number) *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={editMobile}
                        onChange={(e) => setEditMobile(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ఈమెయిల్ (Email)
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="reporter@example.com"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        బ్లడ్ గ్రూప్ (Blood Group)
                      </label>
                      <select
                        value={editBloodGroup}
                        onChange={(e) => setEditBloodGroup(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none font-bold"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        అత్యవసర నంబర్ (Emergency)
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={editEmergencyContact}
                        onChange={(e) => setEditEmergencyContact(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="కుటుంబ సభ్యుల నంబర్"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        హోదా (Designation / Role)
                      </label>
                      <input
                        type="text"
                        value={editDesignation}
                        onChange={(e) => setEditDesignation(e.target.value)}
                        placeholder="మండల ప్రతినిధి / మండల ఇన్చార్జ్"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        విద్యార్హత (Educational Qualification)
                      </label>
                      <input
                        type="text"
                        value={editEducation}
                        onChange={(e) => setEditEducation(e.target.value)}
                        placeholder="డిగ్రీ, పీజీ, జర్నలిజం"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        పూర్తి నివాస / ఆఫీస్ చిరునామా (Full Address)
                      </label>
                      <textarea
                        rows={2}
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="డోర్ నం, వీధి, గ్రామం/పట్టణం"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        పిన్‌కోడ్ (Pincode)
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={editPincode}
                        onChange={(e) => setEditPincode(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="500001"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Reassign Mandal / District / State */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2.5">
                    <span className="text-xs font-extrabold text-red-900 block">
                      📍 కేటాయించిన రిపోర్టింగ్ పరిధి (Reassign Jurisdiction):
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          రాష్ట్రం (State)
                        </label>
                        <select
                          value={editState}
                          onChange={(e) => {
                            setEditState(e.target.value);
                            const dList = getDistrictsForState(e.target.value);
                            setEditDistrict(dList[0] || '');
                            const mList = getMandalsForDistrict(e.target.value, dList[0] || '');
                            setEditMandal(mList[0] || '');
                          }}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        >
                          {states.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          జిల్లా (District)
                        </label>
                        <select
                          value={editDistrict}
                          onChange={(e) => {
                            setEditDistrict(e.target.value);
                            const mList = getMandalsForDistrict(editState, e.target.value);
                            setEditMandal(mList[0] || '');
                          }}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        >
                          {editDistricts.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          మండలం (Mandal)
                        </label>
                        <select
                          value={editMandal}
                          onChange={(e) => setEditMandal(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-red-300 font-bold text-red-900 rounded-lg focus:outline-none"
                        >
                          {editMandals.map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* ID Card & Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ఐడీ కార్డు నంబర్ (Press ID Card No)
                      </label>
                      <input
                        type="text"
                        value={editIdCardNumber}
                        onChange={(e) => setEditIdCardNumber(e.target.value)}
                        placeholder="NB-REP-001"
                        className="w-full text-xs font-mono px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        రిపోర్టర్ హోదా (Reporter Status) *
                      </label>
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value as 'pending' | 'approved' | 'rejected')}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                      >
                        <option value="approved">✓ ఆమోదించబడింది (Approved - Active Reporter)</option>
                        <option value="pending">⏳ పరిశీలనలో ఉంది (Pending Approval)</option>
                        <option value="rejected">✕ నిలిపివేయబడింది / తిరస్కరించబడింది (Rejected / Suspended)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEditingReporter(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      రద్దు
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                    >
                      మార్పులను సేవ్ చేయండి (Save Changes)
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT / CREATE NEWS ARTICLE & VIDEO BULLETIN */}
      {(editingArticle || isCreatingNewArticle) && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-red-800 text-white px-5 py-4 flex items-center justify-between border-b border-red-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-red-700 rounded-lg">
                  {artYoutubeUrl ? <Video className="w-5 h-5 text-amber-300" /> : <Edit className="w-5 h-5 text-amber-300" />}
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg font-serif">
                    {editingArticle ? 'వార్త / వీడియో బులెటిన్ సవరణ (Edit Article / Video Bulletin)' : 'నూతన వార్త లేదా వీడియో బులెటిన్ ప్రచురణ (Publish News / Video)'}
                  </h4>
                  <p className="text-xs text-red-200">
                    యూట్యూబ్ వీడియో లింక్, శీర్షిక, ఫోటో మరియు సమగ్ర వివరాలను సవరించండి
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setEditingArticle(null);
                  setIsCreatingNewArticle(false);
                }}
                className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-red-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-6 overflow-y-auto flex-1">
              {articleSaveSuccess ? (
                <div className="text-center py-10 space-y-2">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h5 className="font-bold text-base text-slate-900">
                    వార్త విజయవంతంగా సేవ్ చేయబడింది!
                  </h5>
                  <p className="text-xs text-slate-500">
                    పోర్టల్ అంతటా మార్పులు తక్షణమే నవీకరించబడ్డాయి.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSaveArticle} className="space-y-5">
                  {/* YouTube Video Link Box */}
                  <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3 border border-slate-800">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold flex items-center gap-2 text-amber-400">
                        <Video className="w-4 h-4 text-red-500" />
                        <span>యూట్యూబ్ వీడియో బులెటిన్ లింక్ (YouTube Video Link):</span>
                      </label>
                      <span className="text-[10px] text-slate-400">ఐచ్ఛికం (Optional for standard news)</span>
                    </div>

                    <input
                      type="url"
                      value={artYoutubeUrl}
                      onChange={(e) => setArtYoutubeUrl(e.target.value)}
                      placeholder="ఉదా: https://www.youtube.com/watch?v=... లేదా https://youtu.be/..."
                      className="w-full text-xs font-mono px-3.5 py-2.5 bg-slate-800 border border-slate-700 text-white rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none"
                    />

                    {artYoutubeUrl && (
                      <div className="pt-2">
                        {extractYouTubeVideoId(artYoutubeUrl) ? (
                          <div className="space-y-2">
                            <span className="text-[11px] text-emerald-400 font-bold block">
                              ✓ చెల్లుబాటు అయ్యే యూట్యూబ్ వీడియో ఐడీ గుర్తించబడింది (ID: {extractYouTubeVideoId(artYoutubeUrl)}):
                            </span>
                            <div className="relative aspect-video max-w-sm rounded-xl overflow-hidden border border-slate-700">
                              <iframe
                                src={`https://www.youtube.com/embed/${extractYouTubeVideoId(artYoutubeUrl)}`}
                                title="Video Preview"
                                className="w-full h-full border-0"
                                allowFullScreen
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="text-[11px] text-amber-400 block">
                            దయచేసి సరైన యూట్యూబ్ వీడియో లింక్‌ను నమోదు చేయండి.
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Title (Telugu - Mandatory, English, Hindi) */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        వార్తా శీర్షిక - తెలుగు (Title in Telugu) *
                      </label>
                      <input
                        type="text"
                        required
                        value={artTitleTe}
                        onChange={(e) => setArtTitleTe(e.target.value)}
                        placeholder="స్పష్టమైన మరియు ఆకర్షణీయమైన తెలుగు శీర్షిక"
                        className="w-full text-xs font-bold px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          శీర్షిక - English Title
                        </label>
                        <input
                          type="text"
                          value={artTitleEn}
                          onChange={(e) => setArtTitleEn(e.target.value)}
                          placeholder="News Headline in English"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          శీర్షిక - Hindi Title
                        </label>
                        <input
                          type="text"
                          value={artTitleHi}
                          onChange={(e) => setArtTitleHi(e.target.value)}
                          placeholder="समाचार शीर्षक (हिंदी)"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        వార్త ముఖ్యాంశం / సారాంశం (Summary in Telugu)
                      </label>
                      <textarea
                        rows={2}
                        value={artSummaryTe}
                        onChange={(e) => setArtSummaryTe(e.target.value)}
                        placeholder="వార్త సంక్షిప్త వివరణ (1-2 వాక్యాలు)"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Full Content */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      పూర్తి వార్తా కథనం (Full News Article Body)
                    </label>
                    <textarea
                      rows={5}
                      value={artContentTe}
                      onChange={(e) => setArtContentTe(e.target.value)}
                      placeholder="వార్త పూర్తి సమాచారం, ప్రసంగం లేదా ఘటన వివరాలు..."
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Category & Location */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                    <span className="text-xs font-bold text-red-900 block">
                      వర్గం మరియు ప్రాంతీయ పరిధి (Category & Geographic Scope):
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          వర్గం (Category) *
                        </label>
                        <select
                          value={artCategory}
                          onChange={(e) => setArtCategory(e.target.value as NewsCategory)}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none font-bold"
                        >
                          <option value="mandal">మండలం (Mandal)</option>
                          <option value="state">రాష్ట్రం (State)</option>
                          <option value="national">జాతీయ (National)</option>
                          <option value="politics">రాజకీయాలు (Politics)</option>
                          <option value="crime">క్రైమ్ (Crime)</option>
                          <option value="business">వాణిజ్యం (Business)</option>
                          <option value="sports">క్రీడలు (Sports)</option>
                          <option value="technology">టెక్నాలజీ (Tech)</option>
                          <option value="agriculture">వ్యవసాయం (Agriculture)</option>
                          <option value="cinema">సినిమా (Cinema)</option>
                          <option value="video">వీడియో బులెటిన్ (Video)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          రాష్ట్రం (State)
                        </label>
                        <select
                          value={artState}
                          onChange={(e) => {
                            setArtState(e.target.value);
                            const dList = getDistrictsForState(e.target.value);
                            setArtDistrict(dList[0] || '');
                            const mList = getMandalsForDistrict(e.target.value, dList[0] || '');
                            setArtMandal(mList[0] || '');
                          }}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        >
                          {states.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          జిల్లా (District)
                        </label>
                        <select
                          value={artDistrict}
                          onChange={(e) => {
                            setArtDistrict(e.target.value);
                            const mList = getMandalsForDistrict(artState, e.target.value);
                            setArtMandal(mList[0] || '');
                          }}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none"
                        >
                          {getDistrictsForState(artState).map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          మండలం (Mandal)
                        </label>
                        <select
                          value={artMandal}
                          onChange={(e) => setArtMandal(e.target.value)}
                          className="w-full text-xs px-2.5 py-1.5 bg-white border border-red-300 font-bold text-red-900 rounded-lg focus:outline-none"
                        >
                          {getMandalsForDistrict(artState, artDistrict).map((m) => (
                            <option key={m} value={m}>
                              {m}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Main News Image Upload / URL */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800">
                      ప్రధాన వార్తా చిత్రం / థంబ్‌నెయిల్ (Main Image / Thumbnail):
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-xs">
                        {artImageUrl ? (
                          <img
                            src={artImageUrl}
                            alt="News Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2 w-full">
                        <label className="inline-flex items-center gap-2 px-3 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 cursor-pointer shadow-2xs">
                          <Upload className="w-4 h-4 text-red-600" />
                          <span>సిస్టమ్ నుండి ఫోటో అప్‌లోడ్ చేయండి</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleArticleImageUpload}
                            className="hidden"
                          />
                        </label>

                        <input
                          type="url"
                          value={artImageUrl}
                          onChange={(e) => setArtImageUrl(e.target.value)}
                          placeholder="లేదా చిత్రం URL పేస్ట్ చేయండి (https://...)"
                          className="w-full text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status, Breaking & Reporter Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ప్రచురణ హోదా (Publication Status)
                      </label>
                      <select
                        value={artStatus}
                        onChange={(e) => setArtStatus(e.target.value as 'published' | 'pending' | 'rejected')}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold focus:outline-none"
                      >
                        <option value="published">✓ ప్రచురించబడింది (Published Live)</option>
                        <option value="pending">పరిశీలనలో (Pending Review)</option>
                        <option value="rejected">తిరస్కరించబడింది (Rejected)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        రిపోర్టర్ / రచయిత పేరు
                      </label>
                      <input
                        type="text"
                        value={artAuthorName}
                        onChange={(e) => setArtAuthorName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-red-900 bg-amber-50 p-2.5 rounded-xl border border-amber-300 w-full">
                        <input
                          type="checkbox"
                          checked={artIsBreaking}
                          onChange={(e) => setArtIsBreaking(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded cursor-pointer"
                        />
                        <span>★ బ్రేకింగ్ న్యూస్ టిక్కర్‌లో చూపించు</span>
                      </label>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingArticle(null);
                        setIsCreatingNewArticle(false);
                      }}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      రద్దు
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                    >
                      {editingArticle ? 'వార్త మార్పులను సేవ్ చేయండి' : 'వార్తను ప్రచురించండి'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
