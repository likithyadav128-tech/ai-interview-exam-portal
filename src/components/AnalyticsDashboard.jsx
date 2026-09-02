import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Building2, 
  DollarSign,
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { SALARY_TIERS, COMPANIES_2026 } from '../data/roadmapData';

export default function AnalyticsDashboard({ examHistory, globalScore, onNavigateToExams }) {
  const [glossarySearch, setGlossarySearch] = useState('');

  const GLOSSARY_TERMS = [
    { term: "Agent (AI Agent)", def: "An LLM-powered system that loops, uses external tools, plans multi-step actions, and recovers from errors autonomously." },
    { term: "RAG (Retrieval-Augmented Generation)", def: "A pattern where, instead of fine-tuning, relevant context is retrieved from private vector databases at query time and injected into the LLM prompt." },
    { term: "Structured Outputs", def: "Enforcing LLMs to emit strict JSON or schema formats reliably using constrained grammar masks or function calling." },
    { term: "LoRA / PEFT", def: "Low-Rank Adaptation; fine-tuning technique that freezes base model weights and trains lightweight rank decomposition matrices." },
    { term: "MCP (Model Context Protocol)", def: "Anthropic's 2025 protocol for standardizing connections between AI agents, data repositories, and tools." },
    { term: "Backpropagation", def: "The calculus chain-rule algorithm computing gradients of the loss with respect to neural network weights." },
    { term: "Vector Database", def: "A specialized store indexing dense vector embeddings for fast approximate nearest-neighbor similarity search (e.g. ChromaDB, Pinecone)." }
  ];

  const filteredGlossary = GLOSSARY_TERMS.filter(g => 
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
    g.def.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // Compute stats from exam history
  const testsAttempted = examHistory.length;
  const avgScore = testsAttempted > 0 
    ? Math.round(examHistory.reduce((acc, curr) => acc + curr.scorePercentage, 0) / testsAttempted)
    : globalScore;

  let currentTier = SALARY_TIERS[0];
  if (avgScore >= 90) currentTier = SALARY_TIERS[6]; // Top Product
  else if (avgScore >= 85) currentTier = SALARY_TIERS[4]; // Elite AI Tier
  else if (avgScore >= 75) currentTier = SALARY_TIERS[3]; // Product Entry
  else if (avgScore >= 65) currentTier = SALARY_TIERS[1]; // IT Services AI-Tier (TCS Prime)
  else if (avgScore >= 50) currentTier = SALARY_TIERS[2]; // Mid-size IT & GCCs

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            2026 Placement Diagnostic & CTC Engine
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Placement Readiness & <span className="text-orange-500">CTC Tier Projection</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Real-time evaluation of your technical readiness across the 4 skill layers, company match ratings, and estimated compensation brackets.
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Predicted CTC Band Card */}
        <div className="bg-gradient-to-br from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Projected Placement Tier</span>
            <DollarSign className="w-5 h-5 text-orange-400" />
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">{currentTier.band}</div>
            <div className="text-xs font-bold text-orange-300 mt-1">{currentTier.tier}</div>
            <div className="text-xs text-slate-400 mt-0.5">{currentTier.roles}</div>
          </div>

          <p className="text-xs text-slate-300 border-t border-slate-800/80 pt-3">
            <strong className="text-white">Required Bar:</strong> {currentTier.screen}
          </p>
        </div>

        {/* Diagnostic Score Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Average Exam Mastery</span>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">{avgScore}%</div>
            <div className="text-xs font-bold text-slate-200 mt-1">
              {testsAttempted} Technical Round{testsAttempted === 1 ? '' : 's'} Completed
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              {avgScore >= 65 ? 'Qualified for AI-Tier Premium Tracks' : 'Take more layer exams to increase score'}
            </div>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div 
              className="bg-gradient-to-r from-orange-500 to-emerald-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, avgScore)}%` }}
            />
          </div>
        </div>

        {/* 2026 Key Takeaway Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">The 2026 Differentiator</span>
            <h3 className="text-base font-bold text-white mt-1">1 Deployed Project = 2-3x Starting Salary</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              TCS Prime, Infosys Power Programmer, and Wipro CoE candidates earn 2x to 3x their peers from the same college batch with the same degree, differentiated by one deployed AI portfolio app.
            </p>
          </div>

          <button
            onClick={onNavigateToExams}
            className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
          >
            Attempt Technical Tests
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 2026 Salary Hierarchy Table (Section 1.3) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="space-y-1 border-b border-slate-800 pb-4">
          <h3 className="text-xl font-bold text-white">Realistic 2026 Fresher AI Salary Landscape</h3>
          <p className="text-xs text-slate-400">All bands verified from public 2026 hiring statements (Section 1.3 of roadmap).</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Company Tier</th>
                <th className="py-3 px-4">Roles Included</th>
                <th className="py-3 px-4">Fresher CTC Band</th>
                <th className="py-3 px-4">Screening Criteria</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {SALARY_TIERS.map((tier, idx) => {
                const isUnlocked = avgScore >= tier.minScore;
                return (
                  <tr key={idx} className={`hover:bg-slate-950/40 transition-colors ${isUnlocked ? 'text-white' : 'text-slate-400'}`}>
                    <td className="py-3.5 px-4 font-bold">{tier.tier}</td>
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{tier.roles}</td>
                    <td className="py-3.5 px-4 font-black text-orange-400">{tier.band}</td>
                    <td className="py-3.5 px-4 text-xs">{tier.screen}</td>
                    <td className="py-3.5 px-4 text-right">
                      {isUnlocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800">
                          Needs {tier.minScore}% Score
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2026 AI Glossary Reference (Appendix A.1) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Appendix A.1</span>
            <h3 className="text-xl font-bold text-white mt-0.5">2026 AI Placement Glossary</h3>
            <p className="text-xs text-slate-400">Core technical terms screened during placement interviews.</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search glossary terms..."
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((g, idx) => (
            <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-2xl space-y-1.5">
              <div className="text-xs font-bold text-orange-400 font-mono">{g.term}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{g.def}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
