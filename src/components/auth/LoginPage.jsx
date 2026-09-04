import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Layers, 
  Bot, 
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';
import MicrosoftLoginButton from './MicrosoftLoginButton';
import AuthError from './AuthError';
import TermsPrivacyModal from './TermsPrivacyModal';
import { useAuth } from '../../auth/AuthContext';

export default function LoginPage() {
  const { 
    loginWithMicrosoft, 
    loginWithCredentials, 
    isLoading, 
    authError, 
    clearError, 
    isMsalConfigured 
  } = useAuth();

  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [stage, setStage] = useState('sem7');
  const [targetCompany, setTargetCompany] = useState('TCS Prime (₹7-11.5 LPA)');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Terms & Privacy Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('terms');

  const handleOpenModal = (tab) => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    clearError();
    await loginWithCredentials({
      email,
      password,
      name: fullName,
      stage,
      targetCompany,
      isRegistering: authMode === 'register'
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row select-none selection:bg-blue-600 selection:text-white">
      
      {/* ================= LEFT SECTION: BRANDING & OVERVIEW (~45% Desktop) ================= */}
      <div className="lg:w-[45%] bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border-b lg:border-b-0 lg:border-r border-slate-800/80 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top Branding Header */}
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-blue-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">
                  AI Career <span className="text-blue-500">2026</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  University Edition
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                Enterprise Placement & Technical Interview Portal
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Your institutional career roadmap, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">simplified.</span>
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              Securely access your account to practice 14+ company technical mock rounds, layer assessments, and real-time AI interview simulations.
            </p>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="space-y-4 my-8 lg:my-0 relative z-10">
          {[
            { 
              icon: Building2, 
              title: "14+ Company Mock Simulators", 
              desc: "TCS Prime (₹7-11 LPA), HCLTech Elite (₹18-22 LPA), Infosys & DE Shaw" 
            },
            { 
              icon: Layers, 
              title: "80 Verified Layer Questions", 
              desc: "Comprehensive 4-layer skill stack testing with real-time scoring" 
            },
            { 
              icon: Bot, 
              title: "AI Interview & Business Translator", 
              desc: "Rehearse placement rubrics and quantify engineering outcomes" 
            },
            { 
              icon: ShieldCheck, 
              title: "Single Sign-On Security", 
              desc: "Protected via Microsoft Entra ID OAuth 2.0 / OpenID Connect" 
            }
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 bg-slate-900/40 border border-slate-800/60 p-3.5 rounded-2xl backdrop-blur-sm">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-200">{feat.title}</h2>
                  <p className="text-[11px] text-slate-400 leading-normal">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className="pt-6 border-t border-slate-800/60 text-xs text-slate-500 flex items-center justify-between relative z-10">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            2026 Placement Guidelines Active
          </span>
          <span>Based on FACE Prep Standards</span>
        </div>
      </div>

      {/* ================= RIGHT SECTION: AUTHENTICATION CARD (~55% Desktop) ================= */}
      <div className="lg:w-[55%] flex items-center justify-center p-6 sm:p-12 lg:p-16 relative">
        
        <div className="w-full max-w-[440px] space-y-6">
          
          {/* Top Card Header */}
          <div className="space-y-2 text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-400 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Campus Single Sign-On</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {authMode === 'signin' 
                ? 'Sign in securely with your Microsoft account to continue.' 
                : 'Register your student profile for personalized placement tracking.'}
            </p>
          </div>

          {/* Error Banner */}
          {authError && (
            <AuthError 
              message={authError} 
              onDismiss={clearError}
              onRetry={loginWithMicrosoft}
            />
          )}

          {/* PRIMARY AUTH METHOD: Official Microsoft Login Button */}
          <div className="space-y-2">
            <MicrosoftLoginButton 
              onClick={loginWithMicrosoft}
              isLoading={isLoading}
              text="Continue with Microsoft"
            />

            {!isMsalConfigured && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/30 border border-blue-500/20 text-[11px] text-blue-300">
                <Info className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Development SSO mode active. One-click instant login enabled.</span>
              </div>
            )}
          </div>

          {/* Clean Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className="h-[1px] bg-slate-800 flex-1" />
            <span className="text-[11px] font-semibold uppercase text-slate-500 tracking-wider">
              or use university credentials
            </span>
            <div className="h-[1px] bg-slate-800 flex-1" />
          </div>

          {/* Form Mode Toggle */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); clearError(); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'signin' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); clearError(); }}
              className={`flex-1 py-2 rounded-lg transition-all ${
                authMode === 'register' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              New Student
            </button>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleCredentialsSubmit} className="space-y-4">
            
            {/* Full Name (Only on Registration) */}
            {authMode === 'register' && (
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Likith Yadav"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
            )}

            {/* Email / Username */}
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                University Email or Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="student@university.edu.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Password
                </label>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link will be sent to your university email.")}
                    className="text-[11px] font-medium text-blue-400 hover:text-blue-300"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Additional Registration Fields */}
            {authMode === 'register' && (
              <div className="grid grid-cols-2 gap-3 pt-1 text-left">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Your Stage</label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="sem5">Sem ≤ 5 (Foundations)</option>
                    <option value="sem7">Sem 7 (Final-Year)</option>
                    <option value="graduate">Graduated (Fast-Track)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Target Track</label>
                  <select
                    value={targetCompany}
                    onChange={(e) => setTargetCompany(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 text-xs text-white rounded-xl px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="TCS Prime (₹7-11.5 LPA)">TCS Prime</option>
                    <option value="HCLTech Elite (₹18-22 LPA)">HCLTech Elite</option>
                    <option value="Infosys Power Programmer">Infosys Power Prog</option>
                    <option value="DE Shaw GAI Team">DE Shaw GAI Team</option>
                  </select>
                </div>
              </div>
            )}

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 text-left">
              <input
                type="checkbox"
                id="rememberMeCheckbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded bg-slate-900 border-slate-800 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
              />
              <label htmlFor="rememberMeCheckbox" className="text-xs text-slate-400 font-medium cursor-pointer">
                Remember me on this browser
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{authMode === 'signin' ? 'Sign In to Dashboard' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Legal / Terms and Privacy Footer */}
          <p className="text-[11px] text-slate-500 leading-relaxed text-center pt-2">
            By continuing, you agree to our{' '}
            <button 
              type="button"
              onClick={() => handleOpenModal('terms')}
              className="text-slate-400 hover:text-white underline underline-offset-2"
            >
              Terms of Service
            </button>{' '}
            and{' '}
            <button 
              type="button"
              onClick={() => handleOpenModal('privacy')}
              className="text-slate-400 hover:text-white underline underline-offset-2"
            >
              Privacy Policy
            </button>.
          </p>
        </div>
      </div>

      {/* Terms & Privacy Modal */}
      <TermsPrivacyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialTab={modalTab}
      />
    </div>
  );
}
