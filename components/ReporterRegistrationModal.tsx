'use client';

import React, { useState } from 'react';
import {
  X,
  UserCheck,
  Upload,
  Camera,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import {
  getAllStates,
  getDistrictsForState,
  getMandalsForDistrict,
  DEFAULT_STATE,
  DEFAULT_DISTRICT,
  DEFAULT_MANDAL,
} from '@/lib/indiaData';
import { Reporter } from '@/lib/types';
import { validateReporterRegistration } from '@/lib/newsLogic';

interface ReporterRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reporter: Reporter) => void;
  onSwitchToLogin: () => void;
}

export const ReporterRegistrationModal: React.FC<ReporterRegistrationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onSwitchToLogin,
}) => {
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [education, setEducation] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState(DEFAULT_STATE);
  const [district, setDistrict] = useState(DEFAULT_DISTRICT);
  const [mandal, setMandal] = useState(DEFAULT_MANDAL);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [aadhaarDocUrl, setAadhaarDocUrl] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const states = getAllStates();
  const districts = getDistrictsForState(state);
  const mandals = getMandalsForDistrict(state, district);

  const handleStateChange = (newSt: string) => {
    setState(newSt);
    const dList = getDistrictsForState(newSt);
    const firstD = dList[0] || '';
    setDistrict(firstD);
    const mList = getMandalsForDistrict(newSt, firstD);
    setMandal(mList[0] || '');
  };

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const mList = getMandalsForDistrict(state, newDist);
    setMandal(mList[0] || '');
  };

  // Convert uploaded photo to persistent base64 data URL
  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotoUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Convert uploaded Aadhaar to persistent base64 data URL
  const handleAadhaarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAadhaarDocUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);

    const validation = validateReporterRegistration({
      fullName,
      mobile,
      username,
      password,
      state,
      district,
      mandal,
      aadhaarNumber,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    const newReporter: Reporter = {
      id: `rep-${Date.now()}`,
      fullName,
      username,
      password,
      mobile,
      email: email.trim(),
      bloodGroup,
      emergencyContact: emergencyContact.trim(),
      education: education.trim(),
      address: address.trim(),
      pincode: pincode.trim(),
      designation: 'మండల ప్రతినిధి / Mandal Reporter',
      state,
      district,
      mandal,
      photoUrl: photoUrl || 'https://picsum.photos/seed/reporter-new/200/200',
      aadhaarNumber: `XXXX-XXXX-${aadhaarNumber.slice(-4)}`,
      aadhaarDocUrl: aadhaarDocUrl || 'https://picsum.photos/seed/aadhaar-new/400/250',
      status: 'pending',
      registeredAt: new Date().toISOString(),
      idCardNumber: `NB-REP-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onSubmit(newReporter);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-red-800 text-white px-5 py-4 flex items-center justify-between border-b border-red-900 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-700 rounded-lg">
              <UserCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg font-serif">
                నేటి భారతం రిపోర్టర్ రిజిస్ట్రేషన్
              </h3>
              <p className="text-xs text-red-200">
                మీ మండల అధికారిక రిపోర్టర్‌గా దరఖాస్తు చేసుకోండి
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

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-black text-slate-900 font-serif">
                రిపోర్టర్ దరఖాస్తు విజయవంతంగా సమర్పించబడింది!
              </h4>
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-left text-xs sm:text-sm text-slate-700 space-y-2">
                <p className="font-bold text-amber-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  అడ్మిన్ పరిశీలన ప్రక్రియ (Admin Approval Process):
                </p>
                <p>
                  మీరు ఎంచుకున్న మండలం <strong>{mandal}</strong> పరిధిలోని మీ ఆధార్ కార్డు వివరాలు మరియు దరఖాస్తును నేటి భారతం చీఫ్ ఎడిటర్ పరిశీలిస్తారు.
                </p>
                <p>
                  అడ్మిన్ ఆమోదం (Approval) లభించిన వెంటనే మీ యూజర్ నేమ్ మరియు పాస్‌వర్డ్‌తో లాగిన్ అయి వార్తలను నేరుగా ప్రచురించవచ్చు.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    setSuccess(false);
                    onSwitchToLogin();
                  }}
                  className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer"
                >
                  లాగిన్ పేజీకి వెళ్లండి
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  మూసివేయి
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Errors notice */}
              {errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <AlertCircle className="w-4 h-4 text-red-700" />
                    <span>దయచేసి క్రింది వివరాలను సరిదిద్దండి:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 pl-1">
                    {errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    పూర్తి పేరు (Full Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ఉదా: రామకృష్ణ శర్మ"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10 అంకెల మొబైల్ నంబర్"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    యూజర్ నేమ్ (Login Username) *
                  </label>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().trim())}
                    placeholder="ఉదా: ramu_vja"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    పాస్‌వర్డ్ (Password) *
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="కనీసం 6 అక్షరాలు"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Personal & Emergency Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ఈమెయిల్ (Email ID)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="reporter@example.com"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    బ్లడ్ గ్రూప్ (Blood Group) *
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none font-bold"
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
                    అత్యవసర సంప్రదింపు (Emergency No)
                  </label>
                  <input
                    type="tel"
                    maxLength={10}
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="కుటుంబ సభ్యుల ఫోన్"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    నివాస / ఆఫీస్ చిరునామా (Full Address)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="డోర్ నం, వీధి, గ్రామం/పట్టణం"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    పిన్‌కోడ్ (Pincode)
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="500001"
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Geographic Scope (State -> District -> Mandal) */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
                <span className="text-xs font-black text-red-900 block">
                  📍 మీ పరిధిని ఎంచుకోండి (మీరు రిపోర్ట్ చేసే మండలం):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      రాష్ట్రం (State) *
                    </label>
                    <select
                      value={state}
                      onChange={(e) => handleStateChange(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                      జిల్లా (District) *
                    </label>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
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
                      మండలం (Mandal) *
                    </label>
                    <select
                      value={mandal}
                      onChange={(e) => setMandal(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 bg-white border border-red-300 font-bold text-red-900 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                    >
                      {mandals.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Verification & Uploads Grid (Aadhaar & Photo) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Aadhaar Number & Doc */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    ఆధార్ కార్డు నంబర్ (Aadhaar Number) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={12}
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="12 అంకెల ఆధార్ నంబర్"
                    className="w-full text-xs px-3 py-1.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:outline-none"
                  />

                  <div className="pt-1">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      ఆధార్ కార్డు ఫోటో అప్‌లోడ్ (Front/Back)
                    </label>
                    <div className="flex items-center gap-2">
                      <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-dashed border-slate-300 hover:border-red-600 rounded-lg text-xs font-semibold cursor-pointer text-slate-700">
                        <Upload className="w-3.5 h-3.5 text-red-600" />
                        <span>డాక్యుమెంట్ ఎంచుకోండి</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleAadhaarSelect}
                          className="hidden"
                        />
                      </label>
                      {aadhaarDocUrl && (
                        <span className="text-[11px] text-emerald-600 font-bold">
                          ✓ ఫైల్ జోడించబడింది
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Photo */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    రిపోర్టర్ పాస్‌పోర్ట్ సైజు ఫోటో *
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl border border-slate-300 bg-white flex items-center justify-center overflow-hidden shrink-0">
                      {photoUrl ? (
                        <img
                          src={photoUrl}
                          alt="ప్రివ్యూ"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-dashed border-slate-300 hover:border-red-600 rounded-lg text-xs font-semibold cursor-pointer text-slate-700">
                      <Upload className="w-3.5 h-3.5 text-red-600" />
                      <span>ఫోటో అప్‌లోడ్</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    ఈ ఫోటో మీ డిజిటల్ ప్రెస్ గుర్తింపు కార్డుపై ముద్రించబడుతుంది.
                  </p>
                </div>
              </div>

              {/* Ethics Agreement */}
              <div className="text-[11px] text-slate-600 bg-amber-50/70 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                <input type="checkbox" required id="ethics" className="mt-0.5 cursor-pointer" />
                <label htmlFor="ethics" className="cursor-pointer">
                  నేటి భారతం పాత్రికేయ ప్రమాణాలకు మరియు నిష్పక్షపాత వార్తా ప్రసారానికి కట్టుబడి ఉంటానని, సరైన ఆధారం లేని తప్పుడు వార్తలను అందించబోనని ప్రమాణం చేస్తున్నాను.
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-xs text-red-700 font-bold hover:underline cursor-pointer"
                >
                  ఇప్పటికే అకౌంట్ ఉందా? లాగిన్ అవ్వండి
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
                  >
                    రద్దు
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-bold rounded-xl transition shadow-sm cursor-pointer"
                  >
                    దరఖాస్తును సమర్పించండి
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
