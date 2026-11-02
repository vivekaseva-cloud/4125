'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  X,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  Upload,
  Camera,
  Video,
  Image as ImageIcon,
  Trash2,
} from 'lucide-react';
import {
  getAllStates,
  getDistrictsForState,
  getMandalsForDistrict,
  DEFAULT_STATE,
  DEFAULT_DISTRICT,
} from '@/lib/indiaData';
import { PrivateAd, AdCategory } from '@/lib/types';
import { validatePrivateAd, extractYouTubeVideoId } from '@/lib/newsLogic';

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAd: (ad: PrivateAd) => void;
}

export const PostAdModal: React.FC<PostAdModalProps> = ({
  isOpen,
  onClose,
  onSubmitAd,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<AdCategory>('real_estate');
  const [state, setState] = useState(DEFAULT_STATE);
  const [district, setDistrict] = useState(DEFAULT_DISTRICT);
  const [mandal, setMandal] = useState('All');
  const [advertiserName, setAdvertiserName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactWhatsApp, setContactWhatsApp] = useState('');
  const [description, setDescription] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const states = getAllStates();
  const districts = getDistrictsForState(state);
  const mandals = getMandalsForDistrict(state, district);

  // File picker handler for Phone Gallery / Local System files
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBannerUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const previewYoutubeId = extractYouTubeVideoId(youtubeUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validatePrivateAd({
      title,
      advertiserName,
      contactPhone,
      state,
      district,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newAd: PrivateAd = {
      id: `ad-${Date.now()}`,
      title,
      category,
      state,
      district,
      mandal: mandal === 'All' ? 'అన్ని మండలాలు' : mandal,
      bannerUrl: bannerUrl || 'https://picsum.photos/seed/ad-custom/700/350',
      youtubeUrl: youtubeUrl.trim() || undefined,
      advertiserName,
      contactPhone,
      contactWhatsApp: contactWhatsApp || contactPhone,
      description,
      validTill: '2026-12-31',
      status: 'pending', // Mandatory Admin approval as requested!
      submittedAt: new Date().toISOString(),
    };

    onSubmitAd(newAd);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-300" />
            <h4 className="font-extrabold text-base font-serif">
              వాణిజ్య ప్రకటనను సమర్పించండి (Post Classified Ad)
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-red-200 hover:text-white rounded-lg hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h5 className="text-lg font-black text-slate-900 font-serif">
                ప్రకటన అడ్మిన్ ఆమోదం కోసం సమర్పించబడింది!
              </h5>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                మీ ప్రకటన వివరాలు <strong>అడ్మిన్ పరిశీలనలో</strong> ఉన్నాయి. ఆమోదం లభించిన వెంటనే ఎంచుకున్న మండల/జిల్లా పేజీలో ప్రదర్శించబడుతుంది.
              </p>
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="mt-3 px-5 py-2 bg-red-700 text-white rounded-xl text-xs font-bold hover:bg-red-800 transition"
              >
                పూర్తయింది
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Notice */}
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-950">
                <span className="font-bold">ముఖ్య గమనిక:</span> ప్రతి ప్రకటన <strong>అడ్మిన్ ఆమోదం పొందిన తర్వాత మాత్రమే</strong> లైవ్‌లో కనిపిస్తుంది.
              </div>

              {errors.length > 0 && (
                <div className="bg-red-50 text-red-800 p-2.5 rounded-lg text-xs">
                  {errors.join(', ')}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ప్రకటన శీర్షిక (Ad Headline) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ఉదా: విజయవాడలో 2 BHK ఫ్లాట్ అమ్మబడును..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    వర్గం (Category) *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as AdCategory)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  >
                    <option value="real_estate">రియల్ ఎస్టేట్</option>
                    <option value="jobs">ఉద్యోగావకాశాలు</option>
                    <option value="business">వ్యాపారం & షాపులు</option>
                    <option value="education">విద్య & కోచింగ్</option>
                    <option value="matrimony">శుభకార్యాలు</option>
                    <option value="events">కార్యక్రమాలు</option>
                    <option value="other">ఇతరములు</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ప్రకటనదారు పేరు (Advertiser Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={advertiserName}
                    onChange={(e) => setAdvertiserName(e.target.value)}
                    placeholder="మీ పేరు లేదా సంస్థ పేరు"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Geographic Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    రాష్ట్రం *
                  </label>
                  <select
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      const dList = getDistrictsForState(e.target.value);
                      setDistrict(dList[0] || '');
                    }}
                    className="w-full text-xs px-2 py-1.5 bg-white border border-slate-300 rounded-lg"
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
                    జిల్లా *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 bg-white border border-slate-300 rounded-lg"
                  >
                    {districts.map((d) => (
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
                    value={mandal}
                    onChange={(e) => setMandal(e.target.value)}
                    className="w-full text-xs px-2 py-1.5 bg-white border border-slate-300 rounded-lg font-bold text-red-900"
                  >
                    <option value="All">అన్ని మండలాలు (All Mandals)</option>
                    {mandals.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload from Phone Gallery or Computer */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-red-700" />
                    <span>ప్రకటన ఫోటో / బ్యానర్ (Image Upload from Gallery or System):</span>
                  </label>
                  <span className="text-[11px] text-slate-500">గ్యాలరీ లేదా ఫైల్స్</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3">
                  {/* Image Preview Box */}
                  <div className="relative w-full sm:w-36 h-24 rounded-xl border border-dashed border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                    {bannerUrl ? (
                      <>
                        <img
                          src={bannerUrl}
                          alt="ప్రకటన చిత్రం"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setBannerUrl('')}
                          className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full cursor-pointer transition"
                          title="ఫోటో తొలగించు"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <div className="text-center p-2 text-slate-400">
                        <Camera className="w-6 h-6 mx-auto mb-1 opacity-60" />
                        <span className="text-[10px] block">ఫోటో లేదు</span>
                      </div>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 w-full space-y-2">
                    <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 text-red-800 border-2 border-dashed border-red-300 hover:border-red-600 rounded-xl text-xs font-bold cursor-pointer transition shadow-2xs">
                      <Upload className="w-4 h-4 text-red-700" />
                      <span>ఫోన్ గ్యాలరీ లేదా సిస్టమ్ నుండి ఫోటో ఎంచుకోండి</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-400 font-bold shrink-0">లేదా URL:</span>
                      <input
                        type="text"
                        value={bannerUrl.startsWith('data:') ? '' : bannerUrl}
                        onChange={(e) => setBannerUrl(e.target.value)}
                        placeholder="https://... ఇమేజ్ లింక్ నమోదు చేయండి"
                        className="w-full text-[11px] px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* YouTube Video Link Input & Preview */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-red-600" />
                  <span>యూట్యూబ్ వీడియో లింక్ (YouTube Video Link - Optional):</span>
                </label>
                <input
                  type="text"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... లేదా https://youtu.be/..."
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />

                {previewYoutubeId && (
                  <div className="mt-2 p-2 bg-white rounded-xl border border-slate-200 flex items-center gap-2.5">
                    <div className="relative w-20 h-12 bg-black rounded-lg overflow-hidden shrink-0">
                      <img
                        src={`https://img.youtube.com/vi/${previewYoutubeId}/hqdefault.jpg`}
                        alt="వీడియో ప్రివ్యూ"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700">
                      ✓ చెల్లుబాటు అయ్యే యూట్యూబ్ వీడియో లింక్ కనుగొనబడింది
                    </span>
                  </div>
                )}
              </div>

              {/* Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    కాల్ సంప్రదింపు నంబర్ *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="10 అంకెల మొబైల్"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp నంబర్
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={contactWhatsApp}
                    onChange={(e) => setContactWhatsApp(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="వాట్సాప్ నంబర్"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  ప్రకటన పూర్తి వివరాలు (Description)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="వస్తువు/సేవ వివరాలు, ధర, చిరునామా మొదలైనవి..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  రద్దు
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                >
                  అడ్మిన్ ఆమోదం కోసం పంపండి
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
