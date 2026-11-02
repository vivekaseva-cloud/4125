'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  Download,
  Smartphone,
  CheckCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  WifiOff,
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert('మీ బ్రౌజర్ మెనూ నుండి "Add to Home Screen" లేదా "Install App" నొక్కండి.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-amber-300" />
            <h4 className="font-extrabold text-base font-serif">
              నేటి భారతం మొబైల్ యాప్ (App & Play Store)
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white rounded-lg hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-center">
          <div className="w-20 h-20 bg-red-50 p-2 rounded-2xl mx-auto shadow-md border-2 border-red-700">
            <Image
              src="/icon.svg"
              alt="యాప్ ఐకాన్"
              width={72}
              height={72}
              className="rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h3 className="text-xl font-black text-slate-900 font-serif">
              నేటి భారతం న్యూస్ మొబైల్ యాప్
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              అన్ని ఆండ్రాయిడ్, ఐఓఎస్ పరికరాలు మరియు ప్లేస్టోర్ అనుకూలమైన PWA యాప్
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-2 text-left pt-2">
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <Zap className="w-4 h-4 text-amber-500 mb-1" />
              <span className="font-bold text-slate-800 block">అత్యంత వేగవంతం</span>
              <span className="text-[10px] text-slate-500">తక్కువ డేటా ఖర్చు</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <WifiOff className="w-4 h-4 text-emerald-600 mb-1" />
              <span className="font-bold text-slate-800 block">ఆఫ్‌లైన్ రీడింగ్</span>
              <span className="text-[10px] text-slate-500">నెట్ లేకున్నా వార్తలు చదవండి</span>
            </div>
          </div>

          {/* Install Button */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleInstallClick}
              className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-extrabold rounded-xl text-sm transition shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>యాప్‌ను ఇన్‌స్టాల్ చేసుకోండి (Install Now)</span>
            </button>

            {/* PlayStore Badge info */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 font-medium text-left space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>గూగుల్ ప్లే స్టోర్ (Google Play Store Ready):</span>
              </div>
              <p className="text-[11px] text-slate-700">
                ఈ యాప్ PWA స్టాండర్డ్స్ మరియు వెబ్ ఏపికె (WebAPK / TWA) ప్రమాణాలకు అనుగుణంగా రూపొందించబడింది. ప్లేస్టోర్‌లో ప్రచురించడానికి అవసరమైన అన్ని సాంకేతిక పారామితులు (Manifest, Service Worker, 512px Icons) అమలు చేయబడ్డాయి.
              </p>
            </div>
          </div>

          {/* iOS Safari Guide */}
          <div className="text-left bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">iPhone / iPad యూజర్లు:</span>
            <p>1. సఫారీ బ్రౌజర్ క్రింద ఉన్న <strong>Share</strong> బటన్ నొక్కండి.</p>
            <p>2. క్రిందికి స్క్రోల్ చేసి <strong>&apos;Add to Home Screen&apos;</strong> ఎంచుకోండి.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
