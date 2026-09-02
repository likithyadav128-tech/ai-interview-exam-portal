import React from 'react';
import { 
  GraduationCap, 
  FileText, 
  Building2, 
  Bot, 
  Code2, 
  Map, 
  FolderKanban, 
  BarChart3, 
  Sparkles,
  Flame
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  userStage, 
  setUserStage, 
  globalScore,
  totalTestsAttempted 
}) {
  const navItems = [
    { id: 'exams', label: 'Layer Exams', icon: FileText, badge: '4 Layers' },
    { id: 'companies', label: 'Company Tracks', icon: Building2, badge: '14 MNCs' },
    { id: 'interview', label: 'AI Interview Panel', icon: Bot, badge: '5 Core Qs' },
    { id: 'coding', label: 'Coding Bench', icon: Code2, badge: 'Live Runner' },
    { id: 'roadmap', label: '9-Month Roadmap', icon: Map, badge: '2026 Pacing' },
    { id: 'projects', label: '5 Portfolio Builds', icon: FolderKanban, badge: 'Recruiter-Proof' },
    { id: 'analytics', label: 'CTC Predictor', icon: BarChart3, badge: 'Tier Calc' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 text-white text-xs font-medium py-1 px-4 text-center flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>2026 Placement Shift: 60% of Fresher Hiring now screens for AI & Deployed Projects (TCS Prime ₹7-11 LPA, HCL ₹18-22 LPA)</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('exams')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-orange-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  AI Career <span className="text-orange-500">2026</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  FACE Prep Spec
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Placement Exam & Technical Interview Simulator
              </p>
            </div>
          </div>

          {/* Target Stage Switcher */}
          <div className="hidden lg:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <span className="text-slate-400 px-2 font-medium">Your Stage:</span>
            {[
              { id: 'sem5', label: 'Sem ≤ 5 (Foundations)' },
              { id: 'sem7', label: 'Sem 7 (Final-Year)' },
              { id: 'graduate', label: 'Graduate (Fast-Track)' },
            ].map((stage) => (
              <button
                key={stage.id}
                onClick={() => setUserStage(stage.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  userStage === stage.id
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </div>

          {/* Placement Readiness Badge */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-left">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                  Predicted CTC
                </div>
                <div className="text-xs font-bold text-orange-400">
                  {totalTestsAttempted > 0 ? (
                    globalScore >= 80 ? '₹18 - 22 LPA (Elite AI)' :
                    globalScore >= 60 ? '₹6.5 - 11 LPA (AI-Tier)' :
                    '₹3.5 - 4.5 LPA (Baseline)'
                  ) : 'Take Exam to Predict'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/60 pt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-orange-500/30 text-orange-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
