import React, { useState } from 'react';
import { 
  FolderKanban, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Calendar, 
  Cpu, 
  ArrowRight, 
  Award,
  Layers,
  FileCheck
} from 'lucide-react';
import { FIVE_PROJECTS } from '../data/roadmapData';

export default function ProjectPortfolioHub() {
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);
  const [copiedLine, setCopiedLine] = useState(false);

  // Resume formulator dynamic generator state
  const [projectName, setProjectName] = useState('Document Q&A Bot');
  const [targetDomain, setTargetDomain] = useState("academic & placement documents");
  const [tooling, setTooling] = useState("ChromaDB, OpenAI API, FastAPI backend, Render deploy");
  const [metricCount, setMetricCount] = useState("12,000+ chunks");
  const [userCount, setUserCount] = useState("80+ active student users");

  const project = FIVE_PROJECTS[selectedProjectIdx];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLine(true);
    setTimeout(() => setCopiedLine(false), 2000);
  };

  const generatedResumeLine = `Built and deployed ${projectName} for ${targetDomain} (${metricCount}, ${tooling}). Used by ${userCount} with 1.4s avg latency.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <FolderKanban className="w-3.5 h-3.5" />
            Recruiter-Proof Portfolio Blueprints
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            5 Projects that <span className="text-orange-500">Change a Recruiter's Mind</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Most resumes show generic ML sentiment analysis models that recruiters skip in 4 seconds. Build 1 or 2 of these deployed projects with real users and concrete metrics.
          </p>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {FIVE_PROJECTS.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setSelectedProjectIdx(idx)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedProjectIdx === idx
                ? 'bg-orange-500/15 border-orange-500 text-white ring-1 ring-orange-500 shadow-lg shadow-orange-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900'
            }`}
          >
            <div>
              <div className="text-xs font-black text-orange-400">PROJECT {idx + 1}</div>
              <div className="text-xs font-bold text-white mt-1 line-clamp-2">{p.title.replace(`${idx + 1}. `, '')}</div>
            </div>
            <div className="text-[10px] text-slate-500 mt-2 font-mono">{p.techStack[0]}</div>
          </button>
        ))}
      </div>

      {/* Selected Project Full Architecture & 4-Week Plan */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
              <span>4-Week Build Schedule</span>
              <span>•</span>
              <span>10 Hours/Week</span>
            </div>
            <h2 className="text-2xl font-black text-white">{project.title}</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">{project.description}</p>
          </div>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 sm:max-w-xs">
            {project.techStack.map((tech, tIdx) => (
              <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-orange-400">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Why Recruiters Click */}
        <div className="bg-gradient-to-r from-orange-950/30 to-slate-950 border border-orange-500/20 rounded-2xl p-4 space-y-1">
          <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Why Recruiters & Panels Click on This Project:
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{project.whyRecruitersClick}</p>
        </div>

        {/* 4-Week Build Plan Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> 4-Week Execution Breakdown (10 hrs/week)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.weeks.map((w) => (
              <div key={w.week} className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10">
                      WEEK {w.week}
                    </span>
                    <span className="text-[10px] text-slate-500">10 Hours</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2">{w.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">{w.task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gold Standard Resume Line */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-orange-400" />
              Verified 2026 Resume-Line Template:
            </span>
            <button
              onClick={() => handleCopy(project.resumeLine)}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 font-medium transition-colors"
            >
              {copiedLine ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLine ? 'Copied to Clipboard' : 'Copy Template'}</span>
            </button>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-emerald-300/90 leading-relaxed">
            "{project.resumeLine}"
          </div>
        </div>
      </div>

      {/* Section 4.6: Interactive Resume Line Formulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-400 uppercase tracking-wider">
            <FileCheck className="w-4 h-4" />
            Rule 4.6: "Every Resume Line Ends with a Number & Tool"
          </div>
          <h3 className="text-xl font-black text-white">Dynamic 2026 Resume Line Generator</h3>
          <p className="text-xs text-slate-400">
            AI projects without numbers read as academic homework. With verified metrics and real tools, they read as professional engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold">Project Title / Type</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold">Domain / Data Target</label>
            <input
              type="text"
              value={targetDomain}
              onChange={(e) => setTargetDomain(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold">Specific Tooling Used</label>
            <input
              type="text"
              value={tooling}
              onChange={(e) => setTooling(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold">Volume / Chunks / Accuracy Metric</label>
            <input
              type="text"
              value={metricCount}
              onChange={(e) => setMetricCount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400 font-semibold">Live User / Traffic Count</label>
            <input
              type="text"
              value={userCount}
              onChange={(e) => setUserCount(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="space-y-2 pt-3">
          <div className="text-xs font-bold text-slate-300">Generated Resume Bullet:</div>
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl font-mono text-xs sm:text-sm text-amber-300 flex items-center justify-between gap-4">
            <span>"{generatedResumeLine}"</span>
            <button
              onClick={() => handleCopy(generatedResumeLine)}
              className="px-3 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs shrink-0 flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              Copy Bullet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
