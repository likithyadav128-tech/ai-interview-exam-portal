import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Timer, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  Sparkles, 
  BarChart, 
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EXAM_PAPERS } from '../data/examQuestions';
import { FOUR_LAYERS } from '../data/roadmapData';

export default function ExamEngine({ activeExamId, setActiveExamId, onExamCompleted }) {
  const [selectedExamKey, setSelectedExamKey] = useState(activeExamId || 'layer-3');
  const [examState, setExamState] = useState('lobby'); // 'lobby', 'in_progress', 'result'
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qId]: optionIndex }
  const [flagged, setFlagged] = useState({}); // { [qId]: boolean }
  const [timeLeft, setTimeLeft] = useState(0);
  const [examResult, setExamResult] = useState(null);

  const activePaper = EXAM_PAPERS[selectedExamKey] || EXAM_PAPERS['layer-1'];

  // Sync external exam selection
  useEffect(() => {
    if (activeExamId && EXAM_PAPERS[activeExamId]) {
      setSelectedExamKey(activeExamId);
      setExamState('lobby');
    }
  }, [activeExamId]);

  // Timer countdown
  useEffect(() => {
    let timerInterval = null;
    if (examState === 'in_progress' && timeLeft > 0) {
      timerInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [examState, timeLeft]);

  const handleStartExam = (paperId = selectedExamKey) => {
    const paper = EXAM_PAPERS[paperId];
    setSelectedExamKey(paperId);
    setAnswers({});
    setFlagged({});
    setCurrentQuestionIdx(0);
    setTimeLeft(paper.durationMinutes * 60);
    setExamResult(null);
    setExamState('in_progress');
  };

  const handleSelectOption = (questionId, optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const toggleFlagQuestion = (questionId) => {
    setFlagged((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleSubmitExam = () => {
    const questions = activePaper.questions;
    let correctCount = 0;
    const details = questions.map((q) => {
      const userSelected = answers[q.id];
      const isCorrect = userSelected === q.correctIndex;
      if (isCorrect) correctCount += 1;
      return {
        ...q,
        userSelected,
        isCorrect
      };
    });

    const totalQuestions = questions.length;
    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= Math.round((activePaper.passingMarks / activePaper.totalMarks) * 100);

    let unlockedBand = "₹3.5 - 4.5 LPA (IT Services Baseline)";
    if (scorePercentage >= 85) {
      unlockedBand = "₹18 - 22 LPA (Elite AI & Top Product)";
    } else if (scorePercentage >= 65) {
      unlockedBand = "₹6.5 - 11 LPA (TCS Prime / Infosys Power Programmer AI-Tier)";
    } else if (scorePercentage >= 50) {
      unlockedBand = "₹5 - 9 LPA (Mid-Size IT & GCCs)";
    }

    const resultData = {
      paperId: selectedExamKey,
      paperTitle: activePaper.title,
      totalQuestions,
      correctCount,
      scorePercentage,
      passed,
      unlockedBand,
      details,
      timestamp: new Date().toISOString()
    };

    setExamResult(resultData);
    setExamState('result');

    if (onExamCompleted) {
      onExamCompleted(resultData);
    }

    if (scorePercentage >= 65) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ================= LOBBY VIEW =================
  if (examState === 'lobby') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              2026 Technical Round Simulator
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Attempt Placement & <span className="text-orange-500">AI Technical Rounds</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              Test your competence against the 4 core layers and company-specific technical screening patterns. Instant evaluation, code breakdown, and placement CTC prediction.
            </p>
          </div>
        </div>

        {/* 4-Layer Skill Stack Quick Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">4-Layer Skill Stack Technical Exams</h2>
              <p className="text-xs sm:text-sm text-slate-400">Master each layer sequentially to unlock high-bracket placement tiers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FOUR_LAYERS.map((layer) => {
              const examKey = `layer-${layer.layer}`;
              const isSelected = selectedExamKey === examKey;
              const paper = EXAM_PAPERS[examKey];
              return (
                <div 
                  key={layer.layer}
                  onClick={() => setSelectedExamKey(examKey)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-slate-900/90 border-orange-500 shadow-lg shadow-orange-500/10 ring-1 ring-orange-500' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-orange-400'
                      }`}>
                        L{layer.layer}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base group-hover:text-orange-400 transition-colors">
                          {layer.title.replace(`Layer ${layer.layer}: `, '')}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">{layer.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {paper ? `${paper.durationMinutes} mins` : '30 mins'}
                    </span>
                  </div>

                  <p className="mt-3 text-xs text-slate-300 line-clamp-2">
                    {layer.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-orange-400 font-medium">
                      🎯 Milestone: {layer.timeBudget}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartExam(examKey);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Start Exam
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Exam Detailed Overview */}
        {activePaper && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 mb-1">
                  <span>{activePaper.category}</span>
                  <span>•</span>
                  <span>Tier: {activePaper.tier}</span>
                </div>
                <h3 className="text-2xl font-black text-white">{activePaper.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">{activePaper.description}</p>
              </div>
              <button
                onClick={() => handleStartExam(selectedExamKey)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-orange-500/25 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                Launch Mock Exam ({activePaper.durationMinutes} Mins)
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs">Total Questions</div>
                <div className="text-xl font-bold text-white mt-1">{activePaper.questions.length} Qs</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs">Duration</div>
                <div className="text-xl font-bold text-white mt-1">{activePaper.durationMinutes} Minutes</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs">Passing Threshold</div>
                <div className="text-xl font-bold text-emerald-400 mt-1">{activePaper.passingMarks}/{activePaper.totalMarks} Marks</div>
              </div>
              <div className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl">
                <div className="text-slate-400 text-xs">Evaluation Pattern</div>
                <div className="text-xl font-bold text-orange-400 mt-1">Instant + Rubric</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ================= LIVE EXAM IN PROGRESS =================
  if (examState === 'in_progress') {
    const currentQ = activePaper.questions[currentQuestionIdx];
    const totalQ = activePaper.questions.length;
    const isAnswered = answers[currentQ.id] !== undefined;
    const isFlagged = flagged[currentQ.id];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Control Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-400">{activePaper.title}</span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Question {currentQuestionIdx + 1} of {totalQ}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Countdown Timer */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono text-sm font-bold ${
              timeLeft < 300 
                ? 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse' 
                : 'bg-slate-950 text-orange-400 border-slate-800'
            }`}>
              <Timer className="w-4 h-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={() => toggleFlagQuestion(currentQ.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                isFlagged
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-400' : ''}`} />
              <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
            </button>

            <button
              onClick={handleSubmitExam}
              className="px-4 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 transition-all"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Body (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              {/* Question Text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">Question {currentQuestionIdx + 1}</span>
                  <span>Single Choice</span>
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-slate-100 leading-relaxed">
                  {currentQ.question}
                </h3>
              </div>

              {/* Code Snippet if present */}
              {currentQ.code && (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 overflow-x-auto">
                  <pre className="font-mono text-xs sm:text-sm text-amber-300/90 leading-relaxed">
                    <code>{currentQ.code}</code>
                  </pre>
                </div>
              )}

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((optionText, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(currentQ.id, idx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3 transition-all ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500/80 text-white shadow-md shadow-orange-500/10 ring-1 ring-orange-500/50'
                          : 'bg-slate-950/60 border-slate-800/90 text-slate-300 hover:bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm leading-relaxed">{optionText}</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Nav Controls */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  disabled={currentQuestionIdx === 0}
                  onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                  className="px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>

                {currentQuestionIdx < totalQ - 1 ? (
                  <button
                    onClick={() => setCurrentQuestionIdx((p) => Math.min(totalQ - 1, p + 1))}
                    className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                  >
                    Next Question
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitExam}
                    className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    Finish & Submit
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question Palette Sidebar (1 col) */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
              <h4 className="font-bold text-sm text-white flex items-center justify-between">
                <span>Question Palette</span>
                <span className="text-xs text-slate-400 font-normal">
                  {Object.keys(answers).length}/{totalQ} Answered
                </span>
              </h4>

              <div className="grid grid-cols-5 gap-2">
                {activePaper.questions.map((q, idx) => {
                  const answered = answers[q.id] !== undefined;
                  const isCurrent = currentQuestionIdx === idx;
                  const isFlag = flagged[q.id];

                  let btnBg = 'bg-slate-950 border-slate-800 text-slate-400';
                  if (answered) btnBg = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400';
                  if (isFlag) btnBg = 'bg-amber-500/20 border-amber-500/50 text-amber-400';
                  if (isCurrent) btnBg = 'bg-orange-500 text-white font-bold ring-2 ring-orange-400';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`h-9 rounded-xl border text-xs font-medium flex items-center justify-center transition-all ${btnBg}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/50" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/50" />
                  <span>Flagged for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-950 border border-slate-800" />
                  <span>Unattempted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= RESULT & REVIEW VIEW =================
  if (examState === 'result' && examResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Scorecard Hero */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold mb-2">
                <Award className="w-3.5 h-3.5" />
                2026 Technical Round Scorecard
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{examResult.paperTitle}</h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">Completed on {new Date(examResult.timestamp).toLocaleDateString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleStartExam(selectedExamKey)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Exam
              </button>
              <button
                onClick={() => setExamState('lobby')}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-lg shadow-orange-500/20"
              >
                Explore Other Exams
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl ${
                examResult.scorePercentage >= 65 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              }`}>
                {examResult.scorePercentage}%
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Your Score</div>
                <div className="text-lg font-bold text-white mt-0.5">
                  {examResult.correctCount} / {examResult.totalQuestions} Correct
                </div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Predicted Placement Tier</div>
                <div className="text-sm font-bold text-orange-300 mt-0.5">{examResult.unlockedBand}</div>
              </div>
            </div>

            <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                examResult.passed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {examResult.passed ? <CheckCircle2 className="w-7 h-7" /> : <AlertCircle className="w-7 h-7" />}
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Screening Status</div>
                <div className={`text-sm font-bold mt-0.5 ${examResult.passed ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {examResult.passed ? 'Cleared Technical Cutoff' : 'Needs Practice (Review Answers)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg sm:text-xl font-bold text-white">Question-by-Question Technical Review</h3>
            <span className="text-xs text-slate-400">Verified against 2026 hiring standards</span>
          </div>

          <div className="space-y-4">
            {examResult.details.map((q, idx) => (
              <div 
                key={q.id}
                className={`p-6 rounded-2xl border space-y-4 ${
                  q.isCorrect 
                    ? 'bg-slate-900/60 border-emerald-500/30' 
                    : 'bg-slate-900/60 border-red-500/30'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      q.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-base leading-relaxed">{q.question}</h4>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    q.isCorrect 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                      : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}>
                    {q.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>

                {q.code && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-xs text-amber-300">
                    <pre><code>{q.code}</code></pre>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isCorrectOpt = optIdx === q.correctIndex;
                    const isUserChoice = optIdx === q.userSelected;

                    let optStyle = 'bg-slate-950/40 border-slate-800/80 text-slate-400';
                    if (isCorrectOpt) {
                      optStyle = 'bg-emerald-500/15 border-emerald-500/80 text-emerald-200 font-medium';
                    } else if (isUserChoice && !isCorrectOpt) {
                      optStyle = 'bg-red-500/15 border-red-500/80 text-red-300 font-medium';
                    }

                    return (
                      <div key={optIdx} className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-3 ${optStyle}`}>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                        {isCorrectOpt && <span className="text-[10px] uppercase font-bold text-emerald-400 shrink-0">Correct Answer</span>}
                        {isUserChoice && !isCorrectOpt && <span className="text-[10px] uppercase font-bold text-red-400 shrink-0">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-orange-400 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Engineering Deep Dive & Explanation:
                  </div>
                  <p className="leading-relaxed text-slate-300">{q.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
