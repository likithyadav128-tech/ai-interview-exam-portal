import React, { useState } from 'react';
import { 
  Map, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  Check, 
  ChevronRight,
  Layers
} from 'lucide-react';
import { FOUR_LAYERS, FREE_RESOURCES, STAGE_ACTIONS } from '../data/roadmapData';

export default function RoadmapView({ userStage, setUserStage }) {
  const [activeLayerIdx, setActiveLayerIdx] = useState(0);
  const currentLayer = FOUR_LAYERS[activeLayerIdx];
  const stageData = STAGE_ACTIONS[userStage] || STAGE_ACTIONS.sem7;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Map className="w-3.5 h-3.5" />
            9-Month Placement Curriculum & Pacing
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The 9-Month Roadmap <span className="text-orange-500">at 10 Hours/Week</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            360 hours of focused work sequenced into 4 distinct layers. The single most important rule: finish each phase before moving on to avoid superficial understanding.
          </p>
        </div>
      </div>

      {/* Stage-Calibrated Weekly Action Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Calibrated Action Plan (Part 7)</span>
            <h2 className="text-xl font-bold text-white mt-0.5">{stageData.title}</h2>
            <p className="text-xs text-slate-400">{stageData.tagline}</p>
          </div>

          <div className="flex space-x-2">
            {[
              { id: 'sem5', label: 'Sem ≤ 5' },
              { id: 'sem7', label: 'Sem 7' },
              { id: 'graduate', label: 'Graduated' },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setUserStage(st.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  userStage === st.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Action Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stageData.actions.map((act) => (
            <div key={act.step} className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                {act.step}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white">{act.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer-by-Layer Curriculum Navigator */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">4 Skill Layers Deep Dive</h2>
          <span className="text-xs text-slate-400">Layer 1 → Layer 2 → Layer 3 → Layer 4</span>
        </div>

        {/* Layer Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FOUR_LAYERS.map((layer, idx) => (
            <button
              key={layer.layer}
              onClick={() => setActiveLayerIdx(idx)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                activeLayerIdx === idx
                  ? 'bg-orange-500/15 border-orange-500 text-white ring-1 ring-orange-500 shadow-lg shadow-orange-500/10'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
              }`}
            >
              <div className="text-xs font-black text-orange-400">LAYER {layer.layer}</div>
              <div className="text-xs font-bold text-white mt-1 truncate">{layer.subtitle}</div>
              <div className="text-[10px] text-slate-500 mt-1">{layer.timeBudget}</div>
            </button>
          ))}
        </div>

        {/* Active Layer Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">{currentLayer.timeBudget}</span>
              <h3 className="text-2xl font-black text-white mt-0.5">{currentLayer.title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{currentLayer.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Skills You Need */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Skills You Actually Need:
              </div>
              <div className="space-y-2">
                {currentLayer.skillsNeeded.map((skill, sIdx) => (
                  <div key={sIdx} className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-xs text-slate-200 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills You Don't Need Yet */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> What You Do NOT Need Yet (Skip & Avoid Distraction):
              </div>
              <div className="space-y-2">
                {currentLayer.skillsNotNeeded.map((notNeed, nIdx) => (
                  <div key={nIdx} className="bg-slate-950/70 border border-slate-800 p-3 rounded-xl text-xs text-slate-400 flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✕</span>
                    <span>{notNeed}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* End-of-Layer Milestone Test */}
          <div className="bg-gradient-to-r from-orange-950/40 via-slate-950 to-slate-950 border border-orange-500/30 rounded-2xl p-5 space-y-2">
            <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              End-of-Layer Readiness Test:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              "{currentLayer.milestoneTest}"
            </p>
          </div>
        </div>
      </div>

      {/* Recommended Free Resources Hub (Part 6.1) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Recommended Free Resources (Zero Paid Bootcamps Needed)</h3>
            <p className="text-xs text-slate-400">Tested and verified by 6 million students. The work is the gate, not the ₹40,000 course.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FREE_RESOURCES.map((res, idx) => (
            <a
              key={idx}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900/60 border border-slate-800 hover:border-orange-500/50 p-5 rounded-2xl space-y-3 transition-all hover:bg-slate-900 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                    {res.layer}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400">{res.cost}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span>{res.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-orange-400 shrink-0" />
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{res.notes}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
