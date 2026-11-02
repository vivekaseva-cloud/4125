'use client';

import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCircle,
  Volume2,
  MapPin,
  Flame,
  Video,
  Shield,
} from 'lucide-react';
import { NotificationItem } from '@/lib/types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onSelectNotification: (item: NotificationItem) => void;
  onClearAll: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onSelectNotification,
  onClearAll,
}) => {
  const [breakingEnabled, setBreakingEnabled] = useState(true);
  const [mandalEnabled, setMandalEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [permissionRequested, setPermissionRequested] = useState(false);

  if (!isOpen) return null;

  const requestBrowserPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      const perm = await Notification.requestPermission();
      setPermissionRequested(true);
      if (perm === 'granted') {
        new Notification('నేటి భారతం న్యూస్', {
          body: 'పుష్ నోటిఫికేషన్లు విజయవంతంగా ప్రారంభించబడ్డాయి!',
          icon: '/icon.svg',
        });
      }
    } else {
      alert('ఈ బ్రౌజర్‌లో పుష్ నోటిఫికేషన్లు ప్రారంభించబడ్డాయి.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-red-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-300" />
            <h4 className="font-extrabold text-base font-serif">
              నోటిఫికేషన్ కేంద్రం & సెట్టింగ్స్
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
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Push Permission Prompt */}
          <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 font-black text-xs text-amber-950">
              <Shield className="w-4 h-4 text-amber-600" />
              <span>రియల్ టైమ్ బ్రేకింగ్ న్యూస్ అలర్ట్స్</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              మీ పరికరానికి తక్షణ హెచ్చరికలను అందుకోవడానికి బ్రౌజర్ పుష్ నోటిఫికేషన్లను అనుమతించండి.
            </p>
            <button
              onClick={requestBrowserPermission}
              className="mt-1 px-4 py-1.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-2xs cursor-pointer"
            >
              {permissionRequested ? '✓ పుష్ నోటిఫికేషన్లు యాక్టివ్' : 'నోటిఫికేషన్లు ఆన్ చేయండి'}
            </button>
          </div>

          {/* Settings Toggles */}
          <div className="space-y-2.5">
            <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              నోటిఫికేషన్ ప్రాధాన్యతలు (Preferences):
            </h5>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-600" />
                <span className="font-bold text-slate-800">తాజా ముఖ్యాంశాలు (Breaking News)</span>
              </div>
              <input
                type="checkbox"
                checked={breakingEnabled}
                onChange={(e) => setBreakingEnabled(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600" />
                <span className="font-bold text-slate-800">స్థానిక మండల వార్తలు (Local Mandal Alerts)</span>
              </div>
              <input
                type="checkbox"
                checked={mandalEnabled}
                onChange={(e) => setMandalEnabled(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-red-600" />
                <span className="font-bold text-slate-800">యూట్యూబ్ వీడియో బులెటిన్లు (Video Updates)</span>
              </div>
              <input
                type="checkbox"
                checked={videoEnabled}
                onChange={(e) => setVideoEnabled(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-red-600" />
                <span className="font-bold text-slate-800">నోటిఫికేషన్ శబ్దం (Alert Sound)</span>
              </div>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="w-4 h-4 text-red-600 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Recent Notifications List */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                తాజా నోటిఫికేషన్లు ({notifications.length}):
              </h5>
              <button
                onClick={onClearAll}
                className="text-[11px] text-red-700 font-bold hover:underline cursor-pointer"
              >
                అన్నీ క్లియర్ చేయండి
              </button>
            </div>

            <div className="space-y-2">
              {notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectNotification(item);
                    onClose();
                  }}
                  className="p-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition cursor-pointer space-y-1 shadow-2xs"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 line-clamp-1">{item.title}</span>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2">{item.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
