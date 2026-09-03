import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Clock, 
  Calendar, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Sparkles, 
  ArrowRight, 
  Check, 
  BookOpen, 
  Layers, 
  Building2, 
  ShieldAlert,
  Target
} from 'lucide-react';
import { STAGE_CONFIGS, FIVE_PROJECTS, FREE_RESOURCES } from '../data/roadmapData';

export default function StageExperienceHub({ userStage, setUserStage, onLaunchExam, onNavigateTab }) {
  const currentStage = STAGE_CONFIGS[userStage] || STAGE_CONFIGS.sem7;

  // Persistent checked tasks per stage
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(`ai_stage_tasks_${userStage}`);
      if (saved) {
        setCheckedTasks(JSON.parse(saved));
      } else {
        setCheckedTasks({});
      }
    } catch (e) {
      console.error("Error loading stage tasks", e);
    }
  }, [userStage]);

  const toggleTask = (taskIdx) => {
    const updated = {
      ...checkedTasks,
      [taskIdx]: !checkedTasks[taskIdx]
    };
    setCheckedTasks(updated);
    try {
      localStorage.setItem(`ai_stage_tasks_${userStage}`, JSON.stringify(updated));
    } catch (e) {
      console.error("Error saving task state", e);
    }
  };

  const completedCount = Object.values(checkedTasks).filter(Boolean).length;
  const totalTasks = currentStage.mustDoList.length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      
      {/* Top Stage Switcher Pill Bar (Matching the Exact UI from Image) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400">Current Academic Stage</span>
            <h3 className="text-sm sm:text-base font-bold text-white">{currentStage.title}</h3>
          </div>
        </div>

        {/* The 3 Stage Switcher Buttons */}
        <div className="flex items-center bg-slate-950 border border-slate-800/90 rounded-2xl p-1.5 shadow-inner">
          <span className="text-xs font-bold text-slate-400 px-3 hidden md:inline">Select Stage:</span>
          {[
            { id: 'sem5', label: 'Sem ≤ 5 (Foundations)', shortLabel: 'Sem ≤ 5' },
            { id: 'sem7', label: 'Sem 7 (Final-Year)', shortLabel: 'Sem 7' },
            { id: 'graduate', label: 'Graduate (Fast-Track)', shortLabel: 'Graduate' },
          ].map((st) => {
            const isSelected = userStage === st.id;
            return (
              <button
                key={st.id}
                onClick={() => setUserStage(st.id)}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25 ring-1 ring-orange-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <span className="sm:inline hidden">{st.label}</span>
                <span className="sm:hidden inline">{st.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stage Snapshot Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            2026 Stage-Calibrated Placement Track (Part 7 of Roadmap)
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {currentStage.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {currentStage.tagline}
          </p>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-800/80">
          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-orange-400" /> Placement Runway
            </div>
            <div className="text-sm sm:text-base font-bold text-white mt-1">{currentStage.runway}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" /> Weekly Pacing
            </div>
            <div className="text-sm sm:text-base font-bold text-white mt-1">{currentStage.weeklyHours}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Target Package
            </div>
            <div className="text-sm sm:text-base font-bold text-emerald-400 mt-1">{currentStage.targetCTC}</div>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl">
            <div className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-400" /> Primary Goal
            </div>
            <div className="text-xs font-medium text-purple-300 mt-1 line-clamp-2">{currentStage.primaryGoal}</div>
          </div>
        </div>
      </div>

      {/* Main 2-Column Workflow: Left = Priority Exams & Actions | Right = Projects & Pitfalls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ================= LEFT COLUMN: STAGE EXAMS & ACTION CHECKLIST (7 cols) ================= */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Priority Exams for THIS Stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Priority Screening Exams</span>
                <h3 className="text-lg font-bold text-white mt-0.5">What You Should Attempt Right Now</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">{currentStage.priorityExams.length} Recommended Tests</span>
            </div>

            <div className="space-y-3">
              {currentStage.priorityExams.map((exam, idx) => (
                <div 
                  key={exam.id}
                  className="bg-slate-950/70 border border-slate-800 hover:border-orange-500/50 p-4 rounded-2xl flex items-center justify-between gap-4 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                        {exam.name}
                      </div>
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                        {exam.badge}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onLaunchExam(exam.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 shrink-0 transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Attempt Test</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Weekly Action Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Interactive Action Plan</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Your Checklist for this Stage</h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-orange-400">{completedCount} of {totalTasks} Completed ({progressPercent}%)</span>
                <div className="w-32 bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800 mt-1">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {currentStage.mustDoList.map((item, idx) => {
                const isDone = !!checkedTasks[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-300'
                        : 'bg-slate-950/70 border-slate-800 text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                      isDone ? 'bg-emerald-500 text-white' : 'border border-slate-700 bg-slate-900'
                    }`}>
                      {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: STAGE PROJECTS, TRAPS & ADVICE (5 cols) ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Stage Failure Trap Warning */}
          <div className="bg-red-950/30 border border-red-500/30 rounded-3xl p-6 space-y-2 shadow-xl">
            <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-red-400" />
              Common Failure Pattern to Avoid:
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{currentStage.failureTrap}"
            </p>
          </div>

          {/* What to SKIP (Avoid distraction) */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              What to SKIP at this Stage (Do NOT Waste Time):
            </div>
            <div className="space-y-2">
              {currentStage.mustSkipList.map((skip, sIdx) => (
                <div key={sIdx} className="bg-slate-950/70 border border-slate-800/90 p-3 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-amber-400 font-bold">✕</span>
                  <span>{skip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Target Output Summary */}
          <div className="bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-900 border border-purple-500/30 rounded-3xl p-6 space-y-2.5 shadow-xl">
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Target Deliverable for this Stage:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {currentStage.targetOutput}
            </p>
          </div>

          {/* Target Companies for this Stage */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-3 shadow-xl">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-orange-400" /> Target 2026 Companies for this Stage:
            </div>
            <div className="flex flex-wrap gap-2">
              {currentStage.targetCompanies.map((comp, cIdx) => (
                <span key={cIdx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-200">
                  {comp}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
