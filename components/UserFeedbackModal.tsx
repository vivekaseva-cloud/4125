'use client';

import React, { useState } from 'react';
import { X, MessageSquare, Star, CheckCircle2 } from 'lucide-react';
import { UserFeedback } from '@/lib/types';

interface UserFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitFeedback: (fb: UserFeedback) => void;
}

export const UserFeedbackModal: React.FC<UserFeedbackModalProps> = ({
  isOpen,
  onClose,
  onSubmitFeedback,
}) => {
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [rating, setRating] = useState(5);
  const [type, setType] = useState<UserFeedback['type']>('content_quality');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !message) return;

    const newFb: UserFeedback = {
      id: `fb-${Date.now()}`,
      userName,
      userPhone,
      rating,
      type,
      message,
      createdAt: new Date().toISOString(),
    };

    onSubmitFeedback(newFb);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setMessage('');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-800 text-white px-5 py-3.5 flex items-center justify-between border-b border-red-900">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-300" />
            <h4 className="font-extrabold text-base font-serif">
              పాఠకుల అభిప్రాయం (User Feedback)
            </h4>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-red-200 hover:text-white rounded-lg hover:bg-red-900 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h5 className="font-bold text-base text-slate-900">
                మీ అమూల్యమైన అభిప్రాయానికి ధన్యవాదాలు!
              </h5>
              <p className="text-xs text-slate-500">
                నేటి భారతం వార్తా నాణ్యతను మరింత మెరుగుపరచడానికి మీ సూచనలు ఎంతగానో ఉపయోగపడతాయి.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating */}
              <div className="text-center space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  నేటి భారతం పోర్టల్‌కు మీ రేటింగ్:
                </label>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    మీ పేరు *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="మీ పేరు"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ఫోన్ నంబర్
                  </label>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="ఐచ్ఛికం"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  అభిప్రాయ విభాగం *
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as UserFeedback['type'])}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                >
                  <option value="content_quality">వార్తల నాణ్యత & సత్యత</option>
                  <option value="suggestion">నూతన ఫీచర్ల సూచన</option>
                  <option value="bug_report">సాంకేతిక సమస్య లేదా లోపం</option>
                  <option value="ad_inquiry">ప్రకటనల విచారణ</option>
                  <option value="other">ఇతరములు</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  మీ అభిప్రాయం లేదా సూచనలు *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="మీ ఆలోచనలను ఇక్కడ పంచుకోండి..."
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
                  సమర్పించండి
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
