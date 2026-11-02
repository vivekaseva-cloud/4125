'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  IdCard,
  LogOut,
  ImageIcon,
  Upload,
  Video,
  Flame,
  QrCode,
  Download,
  Printer,
  Check,
  User,
  Phone,
  Mail,
  MapPin,
  Heart,
  Briefcase,
  GraduationCap,
  Camera,
  Trash2,
  Edit3,
} from 'lucide-react';
import { Reporter, NewsArticle, NewsCategory, PortalBranding } from '@/lib/types';
import { formatViewCount } from '@/lib/newsLogic';

interface ReporterDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  reporters: Reporter[];
  currentReporter: Reporter | null;
  onLogin: (reporter: Reporter) => void;
  onLogout: () => void;
  onOpenRegister: () => void;
  onUpdateReporter?: (updated: Reporter) => void;
  articles: NewsArticle[];
  onCreateArticle: (article: NewsArticle) => void;
  branding?: PortalBranding;
}

export const ReporterDashboardModal: React.FC<ReporterDashboardModalProps> = ({
  isOpen,
  onClose,
  reporters,
  currentReporter,
  onLogin,
  onLogout,
  onOpenRegister,
  onUpdateReporter,
  articles,
  onCreateArticle,
  branding,
}) => {
  const [activeTab, setActiveTab] = useState<'articles' | 'create' | 'idcard' | 'profile'>('articles');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Create article form states
  const [titleTe, setTitleTe] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [summaryTe, setSummaryTe] = useState('');
  const [contentTe, setContentTe] = useState('');
  const [category, setCategory] = useState<NewsCategory>('mandal');
  const [imageUrl, setImageUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  // Profile Edit States
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
  const [profileSuccessMsg, setProfileSuccessMsg] = useState(false);

  // Sync profile edit state whenever currentReporter changes
  useEffect(() => {
    if (currentReporter) {
      setEditFullName(currentReporter.fullName || '');
      setEditMobile(currentReporter.mobile || '');
      setEditEmail(currentReporter.email || '');
      setEditAddress(currentReporter.address || '');
      setEditPincode(currentReporter.pincode || '');
      setEditBloodGroup(currentReporter.bloodGroup || 'O+');
      setEditDesignation(currentReporter.designation || 'మండల ప్రతినిధి (Mandal Reporter)');
      setEditEmergencyContact(currentReporter.emergencyContact || '');
      setEditEducation(currentReporter.education || '');
      setEditPhotoUrl(currentReporter.photoUrl || '');
    }
  }, [currentReporter]);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const found = reporters.find(
      (r) =>
        r.username.toLowerCase() === usernameInput.trim().toLowerCase()
    );

    if (!found) {
      setLoginError('యూజర్ నేమ్ కనుగొనబడలేదు. దయచేసి రిజిస్టర్ చేసుకోండి.');
      return;
    }

    if (found.password && passwordInput && found.password !== passwordInput) {
      setLoginError('పాస్‌వర్డ్ తప్పుగా నమోదు చేయబడింది. దయచేసి సరైన పాస్‌వర్డ్ ఇవ్వండి.');
      return;
    }

    onLogin(found);
  };

  // Handle Photo Upload from Gallery or System
  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Save Reporter Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReporter || !onUpdateReporter) return;

    const updated: Reporter = {
      ...currentReporter,
      fullName: editFullName.trim(),
      mobile: editMobile.trim(),
      email: editEmail.trim() || undefined,
      address: editAddress.trim() || undefined,
      pincode: editPincode.trim() || undefined,
      bloodGroup: editBloodGroup.trim() || undefined,
      designation: editDesignation.trim() || undefined,
      emergencyContact: editEmergencyContact.trim() || undefined,
      education: editEducation.trim() || undefined,
      photoUrl: editPhotoUrl.trim() || currentReporter.photoUrl,
    };

    onUpdateReporter(updated);
    setProfileSuccessMsg(true);
    setTimeout(() => {
      setProfileSuccessMsg(false);
    }, 2500);
  };

  const myArticles = currentReporter
    ? articles.filter((a) => a.reporterId === currentReporter.id || a.authorName === currentReporter.fullName)
    : [];

  const totalViews = myArticles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  const handleDownloadIdCard = () => {
    if (!currentReporter) return;
    setIsDownloading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 620;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setIsDownloading(false);
        return;
      }

      // 1. Background Rich Maroon/Burgundy Gradient
      const grad = ctx.createLinearGradient(0, 0, 1000, 620);
      grad.addColorStop(0, '#831843');
      grad.addColorStop(0.3, '#7f1d1d');
      grad.addColorStop(0.7, '#450a0a');
      grad.addColorStop(1, '#0f172a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1000, 620);

      // 2. Gold borders
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 10;
      ctx.strokeRect(16, 16, 968, 588);

      ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.lineWidth = 2;
      ctx.strokeRect(28, 28, 944, 564);

      // 3. Top Banner Header
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(28, 28, 944, 110);

      // Gold line below header
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(28, 138, 944, 4);

      // Title & Tagline
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText(branding?.siteName || 'నేటి భారతం న్యూస్', 120, 75);

      ctx.fillStyle = '#fde68a';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText('AUTHORIZED PRESS IDENTITY CARD • అధికారిక విలేఖరి గుర్తింపు పత్రం', 120, 105);

      // Reporter Badge top-right
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.roundRect(780, 52, 170, 44, 10);
      ctx.fill();

      ctx.fillStyle = '#450a0a';
      ctx.font = '900 16px sans-serif';
      ctx.fillText('PRESS REPORTER', 795, 80);

      // Photo frame
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(60, 175, 200, 250);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 4;
      ctx.strokeRect(60, 175, 200, 250);

      // Load and draw reporter photo
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        try {
          ctx.drawImage(img, 60, 175, 200, 250);
        } catch {
          // ignore CORS
        }
        finishCardRendering();
      };
      img.onerror = () => {
        finishCardRendering();
      };
      img.src = currentReporter.photoUrl || '/icon.svg';

      function finishCardRendering() {
        if (!ctx || !currentReporter) return;

        // Details Section
        ctx.fillStyle = '#fde68a';
        ctx.font = 'bold 16px monospace';
        ctx.fillText(`PRESS ID: ${currentReporter.idCardNumber || 'NB-REP-001'}`, 300, 195);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(currentReporter.fullName, 300, 235);

        ctx.fillStyle = '#fca5a5';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`హోదా: ${currentReporter.designation || 'మండల విలేఖరి (Mandal Correspondent)'}`, 300, 270);

        ctx.fillStyle = '#e2e8f0';
        ctx.font = '16px sans-serif';
        ctx.fillText(`అధికారిక మండలం: ${currentReporter.mandal}`, 300, 305);
        ctx.fillText(`జిల్లా: ${currentReporter.district} (${currentReporter.state || 'AP / TS'})`, 300, 335);
        ctx.fillText(`మొబైల్: +91 ${currentReporter.mobile}`, 300, 365);
        if (currentReporter.bloodGroup) {
          ctx.fillText(`రక్త వర్గం (Blood Group): ${currentReporter.bloodGroup} | ఎమర్జెన్సీ: ${currentReporter.emergencyContact || 'N/A'}`, 300, 395);
        }
        if (currentReporter.address) {
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '14px sans-serif';
          ctx.fillText(`చిరునామా: ${currentReporter.address} - ${currentReporter.pincode || ''}`, 300, 425);
        }

        // Bottom Strip
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.fillRect(28, 480, 944, 112);

        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(28, 480, 944, 2);

        ctx.fillStyle = '#ffffff';
        ctx.font = '14px sans-serif';
        ctx.fillText('చీఫ్ ఎడిటర్ ఆమోదం పొందినది • STATE HEAD OFFICE VERIFIED', 60, 520);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '13px sans-serif';
        ctx.fillText('పోలీస్ & పరిపాలనా అధికారులకు విజ్ఞప్తి: విధి నిర్వహణలో ఉన్న విలేఖరికి సహకరించగలరు.', 60, 550);

        ctx.fillStyle = '#f59e0b';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('VALIDITY: 2026 - 2028', 750, 535);

        // Download canvas
        const link = document.createElement('a');
        link.download = `Press_ID_${currentReporter.idCardNumber || 'Reporter'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        setIsDownloading(false);
      }
    } catch {
      setIsDownloading(false);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentReporter || !titleTe || !contentTe) return;

    const newArt: NewsArticle = {
      id: `art-${Date.now()}`,
      title: {
        te: titleTe,
        en: titleEn || titleTe,
        hi: titleTe,
      },
      summary: {
        te: summaryTe || titleTe,
        en: summaryTe || titleTe,
        hi: summaryTe || titleTe,
      },
      content: {
        te: contentTe,
        en: contentTe,
        hi: contentTe,
      },
      category,
      state: currentReporter.state,
      district: currentReporter.district,
      mandal: currentReporter.mandal,
      imageUrl: imageUrl || 'https://picsum.photos/seed/news-rep/800/450',
      youtubeUrl: youtubeUrl.trim() || undefined,
      views: 1,
      publishedAt: new Date().toISOString(),
      authorName: currentReporter.fullName,
      authorRole: 'Reporter',
      authorMandal: currentReporter.mandal,
      reporterId: currentReporter.id,
      isBreaking,
      status: 'published',
    };

    onCreateArticle(newArt);
    setPostSuccess(true);
    setTimeout(() => {
      setPostSuccess(false);
      setTitleTe('');
      setTitleEn('');
      setSummaryTe('');
      setContentTe('');
      setImageUrl('');
      setYoutubeUrl('');
      setIsBreaking(false);
      setActiveTab('articles');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700 rounded-lg text-amber-300">
              <IdCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg font-serif tracking-wide text-amber-300">
                నేటి భారతం - విలేఖరుల పోర్టల్ (Reporter Portal)
              </h3>
              <p className="text-xs text-red-200">
                క్షేత్రస్థాయి మండల వార్తల ప్రచురణ & డిజిటల్ ప్రెస్ గుర్తింపు కార్డు
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {!currentReporter ? (
          /* Login Screen */
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <IdCard className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-serif">
                రిపోర్టర్ లాగిన్ (Reporter Login)
              </h4>
              <p className="text-xs text-slate-500">
                మీ రిపోర్టర్ ఖాతా వివరాలతో లాగిన్ అవ్వండి
              </p>
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-800 border border-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  యూజర్ నేమ్ (Username)
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
                  పాస్‌వర్డ్ (Password)
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer"
              >
                లాగిన్ చేయండి
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-600">
                ఇంకా రిపోర్టర్‌గా రిజిస్టర్ కాలేదా?{' '}
                <button
                  onClick={onOpenRegister}
                  className="text-red-700 font-bold hover:underline cursor-pointer"
                >
                  ఇప్పుడే దరఖాస్తు చేసుకోండి
                </button>
              </p>
            </div>
          </div>
        ) : currentReporter.status === 'pending' ? (
          /* Pending Approval State */
          <div className="p-6 sm:p-10 max-w-lg mx-auto text-center space-y-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900 font-serif">
              మీ రిజిస్ట్రేషన్ దరఖాస్తు అడ్మిన్ పరిశీలనలో ఉంది!
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              నమస్కారం <strong>{currentReporter.fullName}</strong> గారూ. మీరు సమర్పించిన ఆధార్ పత్రం మరియు మండల వివరాలు ప్రధాన సంపాదక విభాగం (Admin) ద్వారా పరిశీలించబడుతున్నాయి. ఆమోదం లభించిన వెంటనే మీ ప్రెస్ కార్డు జారీ చేయబడుతుంది.
            </p>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 text-left space-y-1">
              <div>దరఖాస్తు సంఖ్య: <strong className="font-mono">{currentReporter.idCardNumber}</strong></div>
              <div>కేటాయించిన మండలం: <strong>{currentReporter.mandal}</strong> ({currentReporter.district})</div>
              <div>హోదా: <span className="text-amber-800 font-bold bg-amber-100 px-1.5 py-0.2 rounded">పరిశీలనలో ఉంది (Pending)</span></div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              లాగౌట్ అవ్వండి
            </button>
          </div>
        ) : (
          /* Logged In & Approved Reporter Dashboard */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Reporter Profile Ribbon & Nav Tabs */}
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200 border-2 border-red-700">
                  <img
                    src={currentReporter.photoUrl || '/icon.svg'}
                    alt={currentReporter.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900">
                    {currentReporter.fullName}
                  </h4>
                  <span className="text-[11px] text-red-700 font-bold block">
                    అధికారిక మండలం: {currentReporter.mandal} ({currentReporter.district})
                  </span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setActiveTab('articles')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'articles'
                      ? 'bg-red-700 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>నా వార్తలు ({myArticles.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('create')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'create'
                      ? 'bg-red-700 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>వార్త రాయండి</span>
                </button>

                <button
                  onClick={() => setActiveTab('idcard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'idcard'
                      ? 'bg-red-700 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <IdCard className="w-3.5 h-3.5" />
                  <span>ప్రెస్ ఐడీ కార్డు</span>
                </button>

                {/* Edit Profile Tab */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'profile'
                      ? 'bg-red-700 text-white shadow-2xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>నా ప్రొఫైల్ సవరణ</span>
                </button>

                <button
                  onClick={onLogout}
                  className="p-1.5 text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition cursor-pointer ml-1"
                  title="లాగౌట్"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tab 1: My Articles */}
            {activeTab === 'articles' && (
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="bg-red-50 border border-red-200 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-red-800 block">మొత్తం ప్రచురించిన వార్తలు</span>
                    <span className="text-xl font-black text-red-900 font-serif">{myArticles.length}</span>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
                    <span className="text-[11px] font-bold text-amber-800 block">మొత్తం వీక్షణలు (Total Views)</span>
                    <span className="text-xl font-black text-amber-950 font-serif">{formatViewCount(totalViews)}</span>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl col-span-2 sm:col-span-1">
                    <span className="text-[11px] font-bold text-emerald-800 block">రిపోర్టింగ్ హోదా</span>
                    <span className="text-sm font-bold text-emerald-900">వెరిఫైడ్ రిపోర్టర్</span>
                  </div>
                </div>

                {/* Articles List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="font-extrabold text-sm text-slate-800">
                      మీరు ప్రచురించిన తాజా వార్తలు:
                    </h5>
                    <button
                      onClick={() => setActiveTab('create')}
                      className="text-xs text-red-700 font-bold hover:underline cursor-pointer"
                    >
                      + కొత్త వార్త రాయండి
                    </button>
                  </div>

                  {myArticles.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-xs text-slate-600 font-bold">
                        మీరు ఇంకా ఎలాంటి వార్తలు ప్రచురించలేదు.
                      </p>
                      <button
                        onClick={() => setActiveTab('create')}
                        className="mt-3 px-4 py-1.5 bg-red-700 text-white rounded-lg text-xs font-bold hover:bg-red-800"
                      >
                        ఇప్పుడే మొదటి వార్త రాయండి
                      </button>
                    </div>
                  ) : (
                    myArticles.map((art) => (
                      <div
                        key={art.id}
                        className="p-3.5 bg-white border border-slate-200 rounded-xl flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                            {art.imageUrl && (
                              <img
                                src={art.imageUrl}
                                alt={art.title.te}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <span className="text-[10px] bg-red-100 text-red-800 font-bold px-1.5 py-0.2 rounded">
                              {art.mandal || currentReporter.mandal}
                            </span>
                            <h6 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mt-0.5">
                              {art.title.te}
                            </h6>
                            <span className="text-[11px] text-slate-500">
                              తేదీ: {new Date(art.publishedAt).toLocaleDateString('te-IN')} • వీక్షణలు: {formatViewCount(art.views)}
                            </span>
                          </div>
                        </div>

                        <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 shrink-0">
                          ✓ లైవ్
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Create Article */}
            {activeTab === 'create' && (
              <div className="p-5 sm:p-6 overflow-y-auto flex-1">
                {postSuccess ? (
                  <div className="p-8 text-center space-y-3">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <h5 className="text-lg font-bold text-slate-900 font-serif">
                      వార్త విజయవంతంగా ప్రచురించబడింది!
                    </h5>
                    <p className="text-xs text-slate-600">
                      మీ మండలం & జిల్లా పేజీలలో మీ వార్త తక్షణమే పాఠకులకు అందుబాటులోకి వచ్చింది.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCreateSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        వార్తా శీర్షిక (తెలుగులో) *
                      </label>
                      <input
                        type="text"
                        required
                        value={titleTe}
                        onChange={(e) => setTitleTe(e.target.value)}
                        placeholder="ఉదా: మండలంలో భారీ వర్షాలు - చెరువుల పరిశీలన..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          న్యూస్ కేటగిరీ (Category) *
                        </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value as NewsCategory)}
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        >
                          <option value="mandal">మండల వార్తలు (Mandal Focus)</option>
                          <option value="district">జిల్లా వార్తలు</option>
                          <option value="politics">రాజకీయాలు</option>
                          <option value="agriculture">వ్యవసాయం & రైతులు</option>
                          <option value="crime">క్రైమ్ & పోలీస్</option>
                          <option value="video">వీడియో న్యూస్</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          ఇంగ్లీష్ టైటిల్ (English Title - Optional)
                        </label>
                        <input
                          type="text"
                          value={titleEn}
                          onChange={(e) => setTitleEn(e.target.value)}
                          placeholder="Brief title in English..."
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        వార్తా ముఖ్యాంశం / సారాంశం (Summary)
                      </label>
                      <input
                        type="text"
                        value={summaryTe}
                        onChange={(e) => setSummaryTe(e.target.value)}
                        placeholder="రెండు వాక్యాలలో వార్త యొక్క సారాంశం..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        పూర్తి వార్తా కథనం (Detailed News Story) *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={contentTe}
                        onChange={(e) => setContentTe(e.target.value)}
                        placeholder="పూర్తి వివరాలు, ప్రదేశం, అధికారులు, ప్రజా ప్రతినిధుల స్పందన..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-red-600" />
                          <span>వార్త చిత్రం లింక్ (Image URL)</span>
                        </label>
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          placeholder="https://... లేదా డమ్మీ చిత్రం ఎంచుకోండి"
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                          <Video className="w-3.5 h-3.5 text-red-600" />
                          <span>యూట్యూబ్ వీడియో లింక్ (YouTube URL)</span>
                        </label>
                        <input
                          type="text"
                          value={youtubeUrl}
                          onChange={(e) => setYoutubeUrl(e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <input
                        type="checkbox"
                        id="breakingCheck"
                        checked={isBreaking}
                        onChange={(e) => setIsBreaking(e.target.checked)}
                        className="cursor-pointer"
                      />
                      <label htmlFor="breakingCheck" className="text-xs font-bold text-amber-950 flex items-center gap-1 cursor-pointer">
                        <Flame className="w-4 h-4 text-red-600 fill-red-600" />
                        <span>తాజా ముఖ్యాంశం (Breaking News) గా టిక్కర్‌లో చూపించు</span>
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setActiveTab('articles')}
                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                      >
                        రద్దు చేయండి
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                      >
                        తక్షణమే ప్రచురించండి (Publish Now)
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Tab 3: Digital Press ID Card */}
            {activeTab === 'idcard' && (
              <div className="p-4 sm:p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center space-y-5">
                {/* Status Notice */}
                <div className="w-full max-w-md bg-emerald-50 border border-emerald-300 text-emerald-900 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    అడ్మిన్ ద్వారా ఆమోదించబడిన అధికారిక విలేఖరి
                  </span>
                  <span className="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-black">
                    ACTIVE & APPROVED
                  </span>
                </div>

                {/* ID Card Display */}
                <div className="w-full max-w-md bg-gradient-to-br from-red-800 via-red-900 to-slate-900 rounded-2xl p-5 text-white shadow-2xl border-2 border-amber-400 relative overflow-hidden">
                  {/* Watermark Logo */}
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
                    <Image
                      src={branding?.logoUrl || '/icon.svg'}
                      alt="watermark"
                      width={160}
                      height={160}
                      referrerPolicy="no-referrer"
                      unoptimized
                    />
                  </div>

                  {/* ID Card Header */}
                  <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white/10 p-0.5 border border-amber-300/40 shrink-0">
                        <Image
                          src={branding?.logoUrl || '/icon.svg'}
                          alt="logo"
                          fill
                          sizes="36px"
                          className="object-contain"
                          referrerPolicy="no-referrer"
                          unoptimized
                        />
                      </div>
                      <div>
                        <h6 className="font-black text-sm font-serif text-white tracking-wide">
                          {branding?.siteName || 'నేటి భారతం న్యూస్'}
                        </h6>
                        <span className="text-[9px] text-amber-300 font-bold uppercase tracking-widest block">
                          AUTHORIZED PRESS CARD
                        </span>
                      </div>
                    </div>
                    <span className="bg-amber-400 text-red-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      REPORTER
                    </span>
                  </div>

                  {/* ID Card Content */}
                  <div className="flex gap-4 items-center">
                    <div className="relative w-22 h-28 rounded-xl overflow-hidden bg-slate-800 border-2 border-amber-400 shrink-0">
                      <img
                        src={currentReporter.photoUrl || '/icon.svg'}
                        alt={currentReporter.fullName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] text-amber-300 font-bold block font-mono">
                        ID: {currentReporter.idCardNumber || 'NB-REP-001'}
                      </span>
                      <h5 className="font-extrabold text-sm text-white">
                        {currentReporter.fullName}
                      </h5>
                      <p className="text-[10px] text-amber-200 font-semibold">
                        {currentReporter.designation || 'మండల విలేఖరి'}
                      </p>
                      <p className="text-[11px] text-slate-200">
                        మండలం: <strong className="text-amber-300">{currentReporter.mandal}</strong>
                      </p>
                      <p className="text-[11px] text-slate-300">
                        జిల్లా: {currentReporter.district} ({currentReporter.state || 'AP / TS'})
                      </p>
                      <p className="text-[11px] text-slate-300">
                        ఫోన్: +91 {currentReporter.mobile}
                      </p>
                      {currentReporter.bloodGroup && (
                        <p className="text-[10px] text-red-300 font-bold">
                          రక్త వర్గం: {currentReporter.bloodGroup}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ID Card Footer */}
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <QrCode className="w-5 h-5 text-amber-300" />
                      <span className="text-[9px] text-slate-200">గవర్నమెంట్ గుర్తింపు</span>
                    </div>
                    <span className="text-[9px] text-amber-300 font-mono font-bold">
                      VALID: 2026-2028
                    </span>
                  </div>
                </div>

                {/* ID Card Action Buttons: Download & Print */}
                <div className="flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
                  <button
                    onClick={handleDownloadIdCard}
                    disabled={isDownloading}
                    className="flex-1 py-2.5 px-4 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-300" />
                    <span>
                      {isDownloading ? 'డౌన్‌లోడ్ అవుతోంది...' : 'ఐడీ కార్డు డౌన్‌లోడ్ (Download ID)'}
                    </span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>ప్రింట్ (Print)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 4: Reporter Profile Edit (Photo Upload, Address, Details) */}
            {activeTab === 'profile' && (
              <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h4 className="text-base font-black text-slate-900 font-serif">
                    నా ప్రొఫైల్ వివరాల సవరణ (Edit My Profile & Details)
                  </h4>
                  <p className="text-xs text-slate-500">
                    మీ ఫోటో, చిరునామా, సంప్రదింపు నంబర్ మరియు వ్యక్తిగత వివరాలను ఇక్కడ అప్‌డేట్ చేసుకోండి. ఈ వివరాలు అడ్మిన్‌కు కనిపిస్తాయి.
                  </p>
                </div>

                {profileSuccessMsg && (
                  <div className="p-3.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>మీ ప్రొఫైల్ వివరాలు మరియు ఫోటో విజయవంతంగా అప్‌డేట్ చేయబడ్డాయి! అడ్మిన్ మరియు ఐడీ కార్డులో తక్షణమే ప్రతిబింబిస్తాయి.</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-5">
                  {/* Photo Upload Section */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Camera className="w-4 h-4 text-red-700" />
                        <span>రిపోర్టర్ ఫోటో (Profile Photo Upload from Gallery or PC):</span>
                      </label>
                      <span className="text-[11px] text-slate-500">గ్యాలరీ లేదా ఫైల్స్</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Photo Preview Avatar */}
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-200 border-2 border-red-700 shrink-0 shadow-sm">
                        {editPhotoUrl ? (
                          <>
                            <img
                              src={editPhotoUrl}
                              alt="రిపోర్టర్ ఫోటో"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setEditPhotoUrl('')}
                              className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full cursor-pointer transition"
                              title="ఫోటో తీసివేయి"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                            <User className="w-8 h-8 opacity-50" />
                            <span className="text-[10px] mt-1">ఫోటో లేదు</span>
                          </div>
                        )}
                      </div>

                      {/* Photo Upload Buttons */}
                      <div className="flex-1 w-full space-y-2">
                        <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-red-800 border-2 border-dashed border-red-300 hover:border-red-600 rounded-xl text-xs font-bold cursor-pointer transition shadow-2xs">
                          <Upload className="w-4 h-4 text-red-700" />
                          <span>ఫోన్ గ్యాలరీ లేదా సిస్టమ్ నుండి కొత్త ఫోటో ఎంచుకోండి</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoFileChange}
                            className="hidden"
                          />
                        </label>

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-400 font-bold shrink-0">లేదా ఇమేజ్ URL:</span>
                          <input
                            type="text"
                            value={editPhotoUrl.startsWith('data:') ? '' : editPhotoUrl}
                            onChange={(e) => setEditPhotoUrl(e.target.value)}
                            placeholder="https://... ఇమేజ్ లింక్"
                            className="w-full text-[11px] px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        పూర్తి పేరు (Full Name) *
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

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ఈమెయిల్ చిరునామా (Email Address)
                      </label>
                      <input
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder="reporter@example.com"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        రక్త వర్గం (Blood Group)
                      </label>
                      <select
                        value={editBloodGroup}
                        onChange={(e) => setEditBloodGroup(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold text-red-900"
                      >
                        <option value="A+">A+ (పాజిటివ్)</option>
                        <option value="A-">A- (నెగటివ్)</option>
                        <option value="B+">B+ (పాజిటివ్)</option>
                        <option value="B-">B- (నెగటివ్)</option>
                        <option value="O+">O+ (పాజిటివ్)</option>
                        <option value="O-">O- (నెగటివ్)</option>
                        <option value="AB+">AB+ (పాజిటివ్)</option>
                        <option value="AB-">AB- (నెగటివ్)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        హోదా / పదవి (Designation)
                      </label>
                      <input
                        type="text"
                        value={editDesignation}
                        onChange={(e) => setEditDesignation(e.target.value)}
                        placeholder="ఉదా: మండల ప్రతినిధి, సీనియర్ కరస్పాండెంట్"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        అత్యవసర సంప్రదింపు నంబర్ (Emergency Contact)
                      </label>
                      <input
                        type="tel"
                        maxLength={10}
                        value={editEmergencyContact}
                        onChange={(e) => setEditEmergencyContact(e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="కుటుంబ సభ్యుల నంబర్"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        విద్యార్హత (Educational Qualification)
                      </label>
                      <input
                        type="text"
                        value={editEducation}
                        onChange={(e) => setEditEducation(e.target.value)}
                        placeholder="ఉదా: ఎం.ఏ జర్నలిజం, డిగ్రీ, డిప్లొమా..."
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Full Address Details */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                    <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-700" />
                      <span>పూర్తి నివాస / ఆఫీస్ చిరునామా (Full Residential / Office Address):</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          ఇంటి నెం., వీధి, గ్రామం/ప్రాంతం (Door No, Street, Locality)
                        </label>
                        <input
                          type="text"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                          placeholder="ఉదా: డోర్ నం. 4-12, గాంధీ బొమ్మ సెంటర్, మంగళగిరి"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          పిన్‌కోడ్ (Pincode)
                        </label>
                        <input
                          type="text"
                          maxLength={6}
                          value={editPincode}
                          onChange={(e) => setEditPincode(e.target.value.replace(/[^0-9]/g, ''))}
                          placeholder="520010"
                          className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Official Jurisdiction (Readonly) */}
                    <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap gap-4">
                      <span>అధికారిక మండలం: <strong className="text-red-800">{currentReporter.mandal}</strong></span>
                      <span>జిల్లా: <strong>{currentReporter.district}</strong></span>
                      <span>రాష్ట్రం: <strong>{currentReporter.state}</strong></span>
                      <span className="text-slate-400 text-[10px] block w-full">
                        (గమనిక: రిపోర్టింగ్ మండల పరిధి మార్పులు అడ్మిన్ ప్యానెల్ ద్వారా మాత్రమే నిర్వహించబడతాయి)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setActiveTab('articles')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                    >
                      రద్దు
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>ప్రొఫైల్ వివరాలను సేవ్ చేయండి (Save Profile)</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
