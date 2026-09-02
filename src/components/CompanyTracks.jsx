import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Briefcase, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Search, 
  TrendingUp, 
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { COMPANIES_2026, SALARY_TIERS } from '../data/roadmapData';

export default function CompanyTracks({ onLaunchCompanyExam }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotes, setExpandedNotes] = useState({});

  const toggleNote = (id) => {
    setExpandedNotes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const categories = [
    { id: 'all', label: 'All 14 Companies' },
    { id: 'IT Services AI-Tier', label: 'IT Services AI-Tier (₹6.5 - 11 LPA)' },
    { id: 'Elite AI-Tier', label: 'Elite AI Program (₹18 - 22 LPA)' },
    { id: 'Top Product / Quant', label: 'Top Product & Quant' },
    { id: 'Analytics & AI', label: 'Analytics & AI' },
  ];

  const filteredCompanies = COMPANIES_2026.filter((c) => {
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.trackName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.whatsNew.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Building2 className="w-3.5 h-3.5" />
            2026 Verified Hiring Data & Strategy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            14 Companies <span className="text-orange-500">You Must Track in 2026</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            IT services firms aren't hiring fewer freshers in absolute terms; they're hiring fewer traditional freshers and more AI-capable engineers for high-paying premium tracks.
          </p>
        </div>
      </div>

      {/* Salary Tiers Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SALARY_TIERS.slice(0, 4).map((tier, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl space-y-1">
            <div className="text-[11px] text-slate-400 font-medium">{tier.tier}</div>
            <div className="text-base font-black text-orange-400">{tier.band}</div>
            <div className="text-[11px] text-slate-500 truncate">{tier.roles}</div>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search company or track..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Company Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => {
          const isExpanded = expandedNotes[company.id];
          return (
            <div 
              key={company.id}
              className="bg-slate-900/70 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-5 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-black text-white">{company.name}</h3>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        {company.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">{company.trackName}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-400 block">{company.packageRange}</span>
                    <span className="text-[10px] text-slate-500 font-medium uppercase">{company.category}</span>
                  </div>
                </div>

                {/* What's New in 2026 */}
                <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-3.5 space-y-1">
                  <div className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    What Changed in 2026 Hiring:
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{company.whatsNew}</p>
                </div>

                {/* What They Screen For */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Fresher Screening Criteria:
                  </div>
                  <p className="text-xs text-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{company.whatTheyWant}</span>
                  </p>
                </div>

                {/* Company-specific interview tips toggle */}
                {isExpanded && (
                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-xs text-orange-200/90 space-y-1.5 animate-fadeIn">
                    <div className="font-bold text-orange-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Placement Interview Strategy (Sec 5.3):
                    </div>
                    <p className="leading-relaxed text-slate-300">{company.interviewTips}</p>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleNote(company.id)}
                  className="text-xs text-slate-400 hover:text-orange-400 font-medium flex items-center gap-1 transition-colors"
                >
                  <span>{isExpanded ? 'Hide Prep Notes' : 'View Interview Notes'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onLaunchCompanyExam(company.examId || 'tcs-prime')}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Attempt Mock Test
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
