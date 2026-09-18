import React, { useState } from 'react';
import { User, UserRole } from '../types/database';
import { SEED_USERS, MockDatabaseService } from '../services/mockDatabase';
import {
  ShieldCheck,
  Building2,
  Sparkles,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: User, destinationTab: 'founder' | 'reviewer' | 'official') => void;
  onContinueAsGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onContinueAsGuest,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('FOUNDER');
  const [userId, setUserId] = useState('founder@krishi-drones.in');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [destinationModule, setDestinationModule] = useState('DEFAULT');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    const targetUser = SEED_USERS.find((u) => u.role === role);
    if (targetUser) {
      setUserId(targetUser.email);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user =
      SEED_USERS.find((u) => u.role === selectedRole && u.email.toLowerCase() === userId.toLowerCase()) ||
      SEED_USERS.find((u) => u.role === selectedRole) ||
      SEED_USERS[0];

    MockDatabaseService.setCurrentUser(user);

    let destination: 'founder' | 'reviewer' | 'official' = 'founder';
    if (selectedRole === 'REVIEWER') destination = 'reviewer';
    if (selectedRole === 'OFFICIAL') destination = 'official';

    onLoginSuccess(user, destination);
  };

  const handleQuickLogin = (role: UserRole) => {
    const user = SEED_USERS.find((u) => u.role === role)!;
    MockDatabaseService.setCurrentUser(user);
    const dest = role === 'REVIEWER' ? 'reviewer' : role === 'OFFICIAL' ? 'official' : 'founder';
    onLoginSuccess(user, dest);
  };

  const roleMeta = {
    FOUNDER: {
      title: 'Startup Founder Body',
      desc: 'DPIIT Registered Innovators & Citizen Founders',
      accentColor: 'border-blue-600 bg-blue-50/40 text-blue-900',
      btnColor: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30',
      icon: Sparkles,
      modules: ['Application Status Tracker', 'AI Clarifying Chat', 'Submission Form', 'Patent Novelty Card'],
    },
    REVIEWER: {
      title: 'Reviewer Analyst Body',
      desc: 'National Assessment Directorate (Human-in-the-Loop)',
      accentColor: 'border-amber-500 bg-amber-50/40 text-amber-900',
      btnColor: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30',
      icon: ShieldCheck,
      modules: ['Parameter Audit Queue', 'Score Override Console', 'Founder Interview Transcripts', 'Public Audit Trail'],
    },
    OFFICIAL: {
      title: 'Government Official Body',
      desc: 'Ministry Heads, Department Leaders & Discovery Cells',
      accentColor: 'border-emerald-600 bg-emerald-50/40 text-emerald-900',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30',
      icon: Building2,
      modules: ['Pre-Vetted Startup Shortlists', 'Problem Statement Creator', 'Sector Analytics Hub', 'Pilot Approvals'],
    },
  }[selectedRole];

  const RoleIcon = roleMeta.icon;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between selection:bg-blue-100">
      <div className="bg-slate-950 text-slate-300 text-xs px-6 py-2 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="font-semibold tracking-wider">
            GOVERNMENT OF INDIA • NATIONAL STARTUP & INNOVATION DISCOVERY PORTAL
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <span className="text-slate-400">GIGW 3.0 Certified</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-mono">Single Sign-On (SSO) Active</span>
        </div>
      </div>

      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
          
          <div className="lg:col-span-6 bg-gradient-to-b from-amber-50/70 via-slate-50 to-orange-50/40 p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-200 relative">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center font-black text-2xl border border-slate-700 shadow-sm">
                  GSP
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase text-amber-900 tracking-widest">
                    GLOBAL INNOVATION INDEX 2026
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Department for Promotion of Industry and Internal Trade (DPIIT)
                  </div>
                </div>
              </div>

              <div className="pt-6 text-center space-y-4">
                <div className="inline-block bg-gradient-to-r from-red-800 via-red-700 to-red-900 text-white font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                  ★ National Innovation Accolade ★
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  INDIA RANKS{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                    #3 GLOBALLY
                  </span>
                </h1>

                <div className="my-6 relative flex justify-center items-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-amber-200/50 via-orange-100/40 to-transparent flex flex-col items-center justify-center border border-amber-300/40 shadow-inner">
                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-500 via-amber-600 to-amber-800 drop-shadow-md">
                      3<sup>rd</sup>
                    </span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-1">
                      IN THE WORLD
                    </span>
                  </div>
                </div>

                <div className="inline-block bg-blue-900 text-blue-100 text-xs font-semibold px-5 py-2 rounded-full shadow-sm">
                  amongst 130+ Global Startup Ecosystems & Deep-Tech Economies
                </div>

                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed pt-2">
                  Over <strong>1,20,000+ Recognized Startups</strong> driving solutions across Agriculture,
                  CleanTech, Defense, and Rural Healthcare with direct central ministry grants.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-white/80 rounded-xl border border-slate-200">
                <span className="block text-base font-extrabold text-slate-900">₹42.5 Cr</span>
                <span className="text-[10px] text-slate-500 font-medium">Seed Grants</span>
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-slate-200">
                <span className="block text-base font-extrabold text-emerald-700">100%</span>
                <span className="text-[10px] text-slate-500 font-medium">Human Audited</span>
              </div>
              <div className="p-2.5 bg-white/80 rounded-xl border border-slate-200">
                <span className="block text-base font-extrabold text-blue-700">18</span>
                <span className="text-[10px] text-slate-500 font-medium">Ministries</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between bg-white">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Portal Authentication
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select your designated government body to access corresponding tools.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">SECURE GATEWAY</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center justify-end space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>TLS 1.3</span>
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Designatory Body:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { role: 'FOUNDER' as UserRole, label: 'Founder', icon: Sparkles, color: 'text-blue-600' },
                    { role: 'REVIEWER' as UserRole, label: 'Reviewer', icon: ShieldCheck, color: 'text-amber-600' },
                    { role: 'OFFICIAL' as UserRole, label: 'Official', icon: Building2, color: 'text-emerald-600' },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedRole === item.role;
                    return (
                      <button
                        type="button"
                        key={item.role}
                        onClick={() => handleRoleChange(item.role)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-900 text-white shadow-md ring-2 ring-slate-900/20'
                            : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-300' : item.color}`} />
                          <span className="font-bold text-xs">{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className={`mt-2.5 p-3 rounded-xl border text-xs flex items-center space-x-2.5 ${roleMeta.accentColor}`}>
                  <RoleIcon className="w-4 h-4 shrink-0" />
                  <div>
                    <span className="font-bold block">{roleMeta.title}</span>
                    <span className="text-[11px] opacity-80">{roleMeta.desc}</span>
                  </div>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Official Registered ID / Email
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="e.g. founder@krishi-drones.in"
                      className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-medium text-slate-800"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Password / OTP Authentication Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-10 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-medium text-slate-800"
                    />
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Primary Destination Module
                  </label>
                  <div className="relative">
                    <select
                      value={destinationModule}
                      onChange={(e) => setDestinationModule(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-none font-medium text-slate-800 appearance-none bg-white cursor-pointer"
                    >
                      <option value="DEFAULT">Default Dashboard Overview</option>
                      {roleMeta.modules.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-3 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      ✓
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">
                        National Civic Guard: Verified
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Zero automated bot vulnerability detected
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                    Gov-Turnstile
                  </span>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer ${roleMeta.btnColor}`}
                >
                  <span>Sign In as {selectedRole}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Quick 1-Click Persona Demo:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => handleQuickLogin('FOUNDER')}
                    className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-[11px] font-bold border border-blue-200 cursor-pointer"
                  >
                    Founder
                  </button>
                  <button
                    onClick={() => handleQuickLogin('REVIEWER')}
                    className="px-2.5 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded text-[11px] font-bold border border-amber-300 cursor-pointer"
                  >
                    Reviewer
                  </button>
                  <button
                    onClick={() => handleQuickLogin('OFFICIAL')}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded text-[11px] font-bold border border-emerald-300 cursor-pointer"
                  >
                    Official
                  </button>
                </div>
              </div>

              <div className="text-center pt-1">
                <button
                  onClick={onContinueAsGuest}
                  className="text-xs text-slate-500 hover:text-slate-900 font-medium hover:underline cursor-pointer"
                >
                  Or explore public open problem statements without signing in →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200">
        Department for Promotion of Industry and Internal Trade (DPIIT) • Ministry of Commerce & Industry
      </footer>
    </div>
  );
};
