import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Building2, 
  Code2, 
  Layers, 
  Check,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function AuthLanding({ onLoginSuccess }) {
  // Stages: 'landing' (Stage 1), 'orb_expand' (Stage 2), 'card' (Stage 3 & 4), 'success' (Stage 5)
  const [stage, setStage] = useState('landing');
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('student@example.com');
  const [password, setPassword] = useState('password123');
  const [targetStage, setTargetStage] = useState('sem7');
  const [targetCompany, setTargetCompany] = useState('TCS Prime (₹7.0 - 11.5 LPA)');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const [loadingText, setLoadingText] = useState('Authenticating credentials...');
  const [errorMsg, setErrorMsg] = useState('');

  // Handle clicking "Explore Platform" or orb
  const handleStartAuth = () => {
    setStage('orb_expand');
    setTimeout(() => {
      setStage('card');
    }, 450);
  };

  // Submit Sign In / Sign Up
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter email and password');
      return;
    }

    if (authMode === 'signup' && !name) {
      setErrorMsg('Please enter your full name');
      return;
    }

    // Retrieve existing users from localStorage
    const savedUsersStr = localStorage.getItem('ai_portal_users');
    let users = savedUsersStr ? JSON.parse(savedUsersStr) : [];

    let activeUser = null;

    if (authMode === 'signup') {
      // Check if user already exists
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existing) {
        setErrorMsg('An account with this email already exists. Please Sign In.');
        return;
      }
      activeUser = {
        id: 'usr_' + Date.now(),
        name: name,
        email: email,
        stage: targetStage,
        targetCompany: targetCompany,
        examHistory: [],
        createdAt: new Date().toISOString()
      };
      users.push(activeUser);
      localStorage.setItem('ai_portal_users', JSON.stringify(users));
    } else {
      // Sign In
      activeUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!activeUser) {
        // Create default profile for seamless experience
        activeUser = {
          id: 'usr_' + Date.now(),
          name: email.split('@')[0].toUpperCase() || 'Candidate',
          email: email,
          stage: 'sem7',
          targetCompany: 'TCS Prime (₹7.0 - 11.5 LPA)',
          examHistory: [
            {
              paperId: 'layer-1',
              paperTitle: 'Layer 1: Programming Fundamentals & Python',
              totalQuestions: 5,
              correctCount: 4,
              scorePercentage: 80,
              passed: true,
              unlockedBand: '₹6.5 - 11 LPA (TCS Prime AI-Tier)',
              timestamp: new Date().toISOString()
            }
          ],
          createdAt: new Date().toISOString()
        };
        users.push(activeUser);
        localStorage.setItem('ai_portal_users', JSON.stringify(users));
      }
    }

    // Stage 5: Success & Loading Animation
    setStage('success');
    setLoadingText(`Welcome ${activeUser.name}! Preparing your 2026 AI Dashboard...`);

    localStorage.setItem('ai_portal_current_user', JSON.stringify(activeUser));

    setTimeout(() => {
      onLoginSuccess(activeUser);
    }, 1200);
  };

  // Quick Demo Login
  const handleQuickDemo = () => {
    setEmail('student@example.com');
    setPassword('password123');
    setName('Likith Yadav');
    setAuthMode('signin');
    setStage('card');
  };

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* ================= LEFT COLUMN: HERO VALUE PROP ================= */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Brand Badge */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/25 ring-1 ring-white/20">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white">AI Placement Portal</span>
              <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase">
                2026 Edition
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
              Your Dream <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Tech Career
              </span> <br />
              Starts Here
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium">
              Practice. Improve. Get Placed.
            </p>
          </div>

          {/* 4 Feature Checkpoints */}
          <div className="space-y-2.5 pt-2">
            {[
              { text: "14+ Company Mock Tests (TCS Prime, HCLTech ₹18-22 LPA)", icon: Building2 },
              { text: "AI Technical Interview Simulator (5 Universal Questions)", icon: Sparkles },
              { text: "4-Layer Skill Stack Coding Assessments", icon: Code2 },
              { text: "Personalized 9-Month Roadmap & CTC Predictor", icon: Layers }
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span>{feat.text}</span>
                </div>
              );
            })}
          </div>

          {/* Action on Left for Landing Stage */}
          {stage === 'landing' && (
            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={handleStartAuth}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center gap-2 group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleQuickDemo}
                className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all"
              >
                Quick Demo Login
              </button>
            </div>
          )}
        </div>

        {/* ================= RIGHT COLUMN: INTERACTIVE ANIMATED FLOW ================= */}
        <div className="lg:col-span-7 flex items-center justify-center min-h-[440px]">

          {/* ================= STAGE 1: INITIAL 3D HOLOGRAPHIC AI CUBE ================= */}
          {stage === 'landing' && (
            <div 
              onClick={handleStartAuth}
              className="relative cursor-pointer group flex flex-col items-center justify-center p-8 transition-transform duration-500 hover:scale-105"
            >
              {/* Outer Orbit Rings */}
              <div className="absolute w-72 h-72 rounded-full border border-purple-500/20 animate-spin" style={{ animationDuration: '24s' }} />
              <div className="absolute w-96 h-96 rounded-full border border-blue-500/10 animate-spin" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />

              {/* Orbital Nodes */}
              <div className="absolute -top-4 w-9 h-9 rounded-xl bg-slate-900 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-lg shadow-purple-500/30">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-4 w-9 h-9 rounded-xl bg-slate-900 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-500/30">
                <Building2 className="w-4 h-4" />
              </div>
              <div className="absolute -left-6 w-9 h-9 rounded-xl bg-slate-900 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="absolute -right-6 w-9 h-9 rounded-xl bg-slate-900 border border-pink-500/40 flex items-center justify-center text-pink-400 shadow-lg shadow-pink-500/30">
                <Layers className="w-4 h-4" />
              </div>

              {/* 3D Glowing AI Glass Cube */}
              <div className="relative w-48 h-48 rounded-3xl bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-blue-600/30 backdrop-blur-xl border border-purple-400/40 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(168,85,247,0.35)] group-hover:shadow-[0_0_80px_rgba(168,85,247,0.55)] transition-all">
                <div className="text-4xl font-black tracking-widest bg-gradient-to-br from-white via-purple-100 to-purple-400 bg-clip-text text-transparent">
                  AI
                </div>
                <div className="text-[10px] tracking-widest font-mono text-purple-300/80 uppercase mt-1">
                  2026 Core
                </div>
                <div className="absolute inset-0 rounded-3xl bg-purple-500/10 animate-pulse pointer-events-none" />
              </div>

              {/* Click Callout */}
              <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-500/30 px-4 py-2 rounded-full shadow-lg">
                <Sparkles className="w-3.5 h-3.5 animate-bounce" />
                <span>Click anywhere to start Sign In / Register</span>
              </div>
            </div>
          )}

          {/* ================= STAGE 2: EXPANDING ORB TRANSITION ================= */}
          {stage === 'orb_expand' && (
            <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-500 to-blue-500 p-1 flex items-center justify-center shadow-[0_0_100px_rgba(147,51,234,0.6)] animate-ping" style={{ animationDuration: '0.6s' }}>
              <div className="w-full h-full rounded-full bg-[#0b0f19] flex flex-col items-center justify-center text-center p-6">
                <h3 className="text-xl font-bold text-white">Welcome Back! 👋</h3>
                <p className="text-xs text-purple-300 mt-1">Expanding secure portal...</p>
              </div>
            </div>
          )}

          {/* ================= STAGE 3 & 4: GLASSMORPHISM AUTH CARD ================= */}
          {stage === 'card' && (
            <div className="w-full max-w-md bg-[#0f1424]/90 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(147,51,234,0.25)] space-y-5 animate-fadeIn relative">
              
              {/* Card Header & Tab Switcher */}
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  {authMode === 'signin' ? 'Welcome Back! 👋' : 'Create Student Account 🚀'}
                </h2>
                <p className="text-xs text-slate-400">
                  {authMode === 'signin' ? 'Sign in to continue your placement journey' : 'Join thousands preparing for 2026 AI rounds'}
                </p>
              </div>

              {/* Tab Selector */}
              <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-bold">
                <button
                  onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    authMode === 'signin'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
                  className={`py-1.5 rounded-lg transition-all ${
                    authMode === 'signup'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message if any */}
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs font-medium text-center">
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Full Name for Sign Up */}
                {authMode === 'signup' && (
                  <div className="space-y-1 text-left">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Likith Yadav"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950/90 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Email / Username */}
                <div className="space-y-1 text-left">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Username or Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Password</label>
                    {authMode === 'signin' && (
                      <span className="text-[11px] text-purple-400 hover:text-purple-300 cursor-pointer">
                        Forgot Password?
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-950/90 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Extra fields for sign up */}
                {authMode === 'signup' && (
                  <div className="grid grid-cols-2 gap-2 text-left pt-1">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400">Current Stage</label>
                      <select
                        value={targetStage}
                        onChange={(e) => setTargetStage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="sem5">Sem ≤ 5 (Foundations)</option>
                        <option value="sem7">Sem 7 (Final-Year)</option>
                        <option value="graduate">Graduated</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold text-slate-400">Target Track</label>
                      <select
                        value={targetCompany}
                        onChange={(e) => setTargetCompany(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                      >
                        <option value="TCS Prime (₹7.0 - 11.5 LPA)">TCS Prime (₹7-11 LPA)</option>
                        <option value="HCLTech Elite (₹18 - 22 LPA)">HCLTech Elite (₹18-22 LPA)</option>
                        <option value="Infosys Power Programmer">Infosys Power Prog</option>
                        <option value="DE Shaw GAI Team">DE Shaw GAI Team</option>
                        <option value="AI Startup / Product">AI Startup / Product</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1 text-left">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
                  />
                  <label htmlFor="remember" className="text-xs text-slate-400 font-medium cursor-pointer">
                    Remember me on this browser
                  </label>
                </div>

                {/* Main Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>{authMode === 'signin' ? 'Sign In' : 'Complete Registration'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Social Login Separator */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] bg-slate-800 flex-1" />
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">or continue with</span>
                  <div className="h-[1px] bg-slate-800 flex-1" />
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button 
                    type="button"
                    onClick={handleQuickDemo}
                    className="py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-xs font-medium text-slate-300 hover:text-white transition-all gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"/>
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.1s.7 5.4 1.9 7.8l3.7-2.9z"/>
                      <path fill="#34A853" d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"/>
                    </svg>
                    <span>Google</span>
                  </button>

                  <button 
                    type="button"
                    onClick={handleQuickDemo}
                    className="py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-xs font-medium text-slate-300 hover:text-white transition-all gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </button>

                  <button 
                    type="button"
                    onClick={handleQuickDemo}
                    className="py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 flex items-center justify-center text-xs font-medium text-slate-300 hover:text-white transition-all gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ================= STAGE 5: SUCCESS / REDIRECT ANIMATION ================= */}
          {stage === 'success' && (
            <div className="w-full max-w-sm bg-[#0f1424]/90 backdrop-blur-2xl border border-purple-500/40 rounded-3xl p-8 shadow-[0_0_80px_rgba(147,51,234,0.35)] space-y-6 text-center animate-fadeIn">
              
              {/* Glowing Pulse Ring with Checkmark */}
              <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/40 animate-ping" />
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-black text-white">Authentication Verified!</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {loadingText}
                </p>
              </div>

              {/* Animated Progress Bar */}
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-full rounded-full animate-pulse w-full" />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
