import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  ChevronRight, 
  Volume2, 
  RefreshCw, 
  BookOpen, 
  ArrowRight,
  TrendingUp,
  HelpCircle
} from 'lucide-react';
import { UNIVERSAL_INTERVIEW_QUESTIONS, BUSINESS_TRANSLATOR_CHALLENGES } from '../data/examQuestions';

export default function AIInterviewSimulator() {
  const [activeTab, setActiveTab] = useState('universal'); // 'universal' or 'translator'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Business translator state
  const [translatorIdx, setTranslatorIdx] = useState(0);
  const [translatorAnswer, setTranslatorAnswer] = useState('');
  const [translatorFeedback, setTranslatorFeedback] = useState(null);

  const currentQ = UNIVERSAL_INTERVIEW_QUESTIONS[currentQIndex];
  const currentTrans = BUSINESS_TRANSLATOR_CHALLENGES[translatorIdx];

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    setIsEvaluating(true);
    setTimeout(() => {
      const lower = userAnswer.toLowerCase();
      let matchedKeywords = [];
      currentQ.keywordsToInclude.forEach(kw => {
        if (lower.includes(kw.toLowerCase())) {
          matchedKeywords.push(kw);
        }
      });

      const wordCount = userAnswer.trim().split(/\s+/).length;
      let score = 0;
      let strengths = [];
      let improvements = [];

      // Keyword match score
      const keywordRatio = matchedKeywords.length / currentQ.keywordsToInclude.length;
      score += Math.round(keywordRatio * 40);

      // Structure and length heuristics
      if (wordCount >= 40 && wordCount <= 140) {
        score += 35;
        strengths.push("Excellent timing: Answer falls within the ideal 60-90 second verbal length.");
      } else if (wordCount < 40) {
        score += 15;
        improvements.push("Too brief. Elaborate on the engineering trade-offs and concrete metrics.");
      } else {
        score += 20;
        improvements.push("A bit verbose. Keep to 90 seconds to avoid losing panel engagement.");
      }

      // Check for metrics / numbers
      const hasNumbers = /\d+/.test(userAnswer);
      if (hasNumbers) {
        score += 25;
        strengths.push("Used concrete quantitative metrics (e.g., numbers/benchmarks).");
      } else {
        improvements.push("Missing quantitative numbers (e.g. latency in ms, chunk count, user size, or accuracy % delta).");
      }

      // Question specific checks
      if (currentQ.questionNumber === 4) {
        if (lower.includes("nothing") || lower.includes("perfect")) {
          score = Math.min(score, 40);
          improvements.push("Red Flag Trap: Claimed the project has no flaws. Senior panels look for trade-off awareness.");
        } else {
          strengths.push("Demonstrated genuine engineering self-awareness.");
        }
      }

      setFeedback({
        score: Math.min(100, Math.max(35, score)),
        strengths,
        improvements,
        matchedKeywords,
        modelAnswer: currentQ.sampleGoodAnswer
      });
      setIsEvaluating(false);
    }, 600);
  };

  const handleEvaluateTranslator = () => {
    if (!translatorAnswer.trim()) return;
    
    const lower = translatorAnswer.toLowerCase();
    const hasNumbers = /\d+/.test(translatorAnswer);
    const hasUsersOrTime = lower.includes("user") || lower.includes("second") || lower.includes("accuracy") || lower.includes("cost") || lower.includes("percent") || lower.includes("%");

    let score = 50;
    let comments = [];

    if (hasNumbers) score += 25;
    if (hasUsersOrTime) score += 25;

    if (score >= 80) {
      comments.push("Outstanding translation! Directly converted technical tools into business outcomes (speed, scale, users).");
    } else {
      comments.push("Try to explicitly state the business metric (e.g., 80 active users, 1.5s latency, or 41% to 79% accuracy gain).");
    }

    setTranslatorFeedback({
      score,
      comments,
      goodModel: currentTrans.goodBusinessAnswer,
      keyLesson: currentTrans.keyLesson
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            Interactive AI Technical Panel Simulator
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The 5 Questions <span className="text-orange-500">Every Panel Asks in 2026</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Rehearse and test your responses against the exact rubrics used by senior interviewers across TCS Prime, Infosys Power Programmer, HCLTech Elite, and AI Startups.
          </p>
        </div>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-slate-800 space-x-6">
        <button
          onClick={() => { setActiveTab('universal'); setFeedback(null); }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'universal'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award className="w-4 h-4" />
          5 Universal Placement Questions
        </button>

        <button
          onClick={() => { setActiveTab('translator'); setTranslatorFeedback(null); }}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            activeTab === 'translator'
              ? 'border-orange-500 text-orange-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Business Outcome Translator Challenge (Sec 5.2)
        </button>
      </div>

      {/* ================= TAB 1: 5 UNIVERSAL QUESTIONS ================= */}
      {activeTab === 'universal' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Question Selector Sidebar (1 col) */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Select Question to Rehearse</h3>
            <div className="space-y-2">
              {UNIVERSAL_INTERVIEW_QUESTIONS.map((q, idx) => {
                const isSelected = currentQIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQIndex(idx);
                      setUserAnswer('');
                      setFeedback(null);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'bg-orange-500/15 border-orange-500/80 text-white ring-1 ring-orange-500/40 shadow-lg shadow-orange-500/10'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      Q{q.questionNumber}
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">{q.title.replace(`Question ${q.questionNumber}: `, '')}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-1">{q.context}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practice Room & Live Evaluator (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Question Header */}
              <div className="space-y-2 border-b border-slate-800 pb-5">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Interview Panel Simulator</span>
                <h2 className="text-xl sm:text-2xl font-black text-white">{currentQ.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300">{currentQ.context}</p>
              </div>

              {/* Expected 90s Structure Guide */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Recommended 90-Second Structure Rubric:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {currentQ.recommendedStructure.map((step, sIdx) => (
                    <div key={sIdx} className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 flex items-start gap-2">
                      <span className="text-orange-400 font-bold">•</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Candidate Response Input Area */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">Your Spoken / Written Response:</label>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {userAnswer.trim().split(/\s+/).filter(Boolean).length} words (~{Math.round(userAnswer.trim().split(/\s+/).filter(Boolean).length / 2.2)}s speech)
                  </span>
                </div>
                <textarea
                  rows={5}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Draft your answer here (incorporating problem, tooling, technical trade-off, and honest metrics)..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 leading-relaxed font-sans"
                />
              </div>

              {/* Evaluation Trigger Button */}
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setUserAnswer(currentQ.sampleGoodAnswer)}
                  className="text-xs text-slate-400 hover:text-orange-400 font-medium flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Load Sample 90s Script
                </button>

                <button
                  disabled={isEvaluating || !userAnswer.trim()}
                  onClick={handleEvaluateAnswer}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
                >
                  {isEvaluating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Grading against Panel Rubric...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      Evaluate My Answer
                    </>
                  )}
                </button>
              </div>

              {/* Evaluation Feedback Section */}
              {feedback && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-5 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg ${
                        feedback.score >= 75 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      }`}>
                        {feedback.score}/100
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Interview Readiness Score</h4>
                        <p className="text-xs text-slate-400">
                          {feedback.score >= 75 ? 'Strong Answer! Ready for Tier-1 / Elite Panels' : 'Good Foundation - Refine with numbers & structure'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Strengths & Improvements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Strengths Identified:
                      </div>
                      {feedback.strengths.map((str, i) => (
                        <div key={i} className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          {str}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-amber-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Recommended Tweaks:
                      </div>
                      {feedback.improvements.map((imp, i) => (
                        <div key={i} className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          {imp}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ideal Model Answer */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="text-xs font-bold text-orange-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      FACE Prep Benchmark 90-Second Answer:
                    </div>
                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans italic">
                      "{feedback.modelAnswer}"
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: BUSINESS OUTCOME TRANSLATOR ================= */}
      {activeTab === 'translator' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-2 border-b border-slate-800 pb-5">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">IT-Services Translation Challenge (Sec 5.2)</span>
              <h2 className="text-2xl font-black text-white">Translate AI Jargon to Business Outcomes</h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Traditional IT-services interviewers often have Java or enterprise backgrounds. Talking about LangChain or weights without business context can misfire. Practice translating technical work into business impact (latency, users, cost, uptime).
              </p>
            </div>

            {/* Current Jargon Card */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Raw Technical Statement:</div>
              <p className="text-base font-bold text-orange-400 font-mono">
                "{currentTrans.techJargon}"
              </p>
            </div>

            {/* User Translation Input */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300">
                How would you explain this to an IT-services interviewer?
              </label>
              <textarea
                rows={4}
                value={translatorAnswer}
                onChange={(e) => setTranslatorAnswer(e.target.value)}
                placeholder="Focus on user numbers, response time in seconds, document count, and business reliability..."
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-orange-500 leading-relaxed font-sans"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {BUSINESS_TRANSLATOR_CHALLENGES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setTranslatorIdx(idx);
                      setTranslatorAnswer('');
                      setTranslatorFeedback(null);
                    }}
                    className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all ${
                      translatorIdx === idx
                        ? 'bg-orange-500 text-white border-orange-500'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={handleEvaluateTranslator}
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Check My Business Translation
              </button>
            </div>

            {/* Translation Evaluation Feedback */}
            {translatorFeedback && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-orange-400" />
                    Translation Score: {translatorFeedback.score}/100
                  </h4>
                  <span className="text-xs text-orange-400 font-semibold">{translatorFeedback.keyLesson}</span>
                </div>

                <div className="space-y-2">
                  <div className="text-xs text-slate-300">
                    {translatorFeedback.comments.map((c, i) => (
                      <p key={i} className="leading-relaxed">{c}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-emerald-300/90 leading-relaxed font-sans">
                  <div className="font-bold text-emerald-400 text-xs mb-1">Recommended Business Talking Point:</div>
                  "{translatorFeedback.goodModel}"
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
