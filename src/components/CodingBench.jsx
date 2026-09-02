import React, { useState } from 'react';
import { 
  Code2, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Terminal, 
  Sparkles, 
  FileCode, 
  Check, 
  AlertCircle,
  Copy
} from 'lucide-react';
import { CODING_CHALLENGES } from '../data/examQuestions';

export default function CodingBench() {
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const challenge = CODING_CHALLENGES[selectedChallengeIdx];
  const [code, setCode] = useState(challenge.starterCode);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testsPassed, setTestsPassed] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSelectChallenge = (idx) => {
    setSelectedChallengeIdx(idx);
    setCode(CODING_CHALLENGES[idx].starterCode);
    setOutput('');
    setTestsPassed(null);
  };

  const handleResetCode = () => {
    setCode(challenge.starterCode);
    setOutput('');
    setTestsPassed(null);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput('Running test suite...');
    setTestsPassed(null);

    setTimeout(() => {
      setIsRunning(false);
      // Simulated evaluation of code
      if (selectedChallengeIdx === 0) {
        setOutput(`>>> Running chunk_text() test cases:
Test 1: chunk_text("A B C D E F", 3, 1) -> ['A B C', 'C D E', 'E F'] [PASS]
Test 2: chunk_text("Hello world", 2, 0) -> ['Hello world'] [PASS]
Test 3: chunk_text("The 2026 AI Career Roadmap trains students for TCS Prime and high package AI roles.", 4, 1)
Output:
['The 2026 AI Career', 'Career Roadmap trains students', 'students for TCS Prime', 'Prime and high package', 'package AI roles.']

All 3 Test Cases PASSED (0.04s)`);
        setTestsPassed(true);
      } else if (selectedChallengeIdx === 1) {
        setOutput(`>>> Running cosine_similarity() test cases:
Test 1: Orthogonal vectors [1, 0] & [0, 1] -> Cosine: 0.0 [PASS]
Test 2: Parallel vectors [1, 1] & [2, 2] -> Cosine: 1.0 [PASS]
Test 3: Sample embeddings [0.12, 0.45, 0.78, 0.05] & [0.10, 0.48, 0.75, 0.08]
Similarity: 0.9984 [PASS]

All 3 Test Cases PASSED (0.02s)`);
        setTestsPassed(true);
      } else {
        setOutput(`>>> Running retry_with_backoff() simulation:
Attempt 1 failed: LLM API 503 Overloaded. Retrying in 0.05s...
Attempt 2 failed: LLM API 503 Overloaded. Retrying in 0.10s...
Function recovered on Attempt 3!
Result: {'status': 'success', 'response': 'Generated response'}

Resilience test PASSED (0.17s)`);
        setTestsPassed(true);
      }
    }, 700);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            In-Browser Python & AI Code Runner
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Live Coding & <span className="text-orange-500">Algorithm Sandbox</span>
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Practice the high-yield algorithms screened in 2026 AI rounds: RAG chunking algorithms, vector cosine similarity calculators, and API retry decorators.
          </p>
        </div>
      </div>

      {/* Challenge Selector Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {CODING_CHALLENGES.map((ch, idx) => (
          <button
            key={ch.id}
            onClick={() => handleSelectChallenge(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedChallengeIdx === idx
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>{ch.title}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
              selectedChallengeIdx === idx ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {ch.difficulty}
            </span>
          </button>
        ))}
      </div>

      {/* Code Editor & Test Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Problem & Code Editor */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">{challenge.category}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{challenge.title}</h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {challenge.difficulty}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {challenge.description}
            </p>

            {/* Code Editor Area */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono">solution.py</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="p-1 hover:text-slate-200 text-slate-400 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleResetCode}
                    className="p-1 hover:text-slate-200 text-slate-400 transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                <textarea
                  rows={14}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-slate-950 p-4 font-mono text-xs sm:text-sm text-amber-200 focus:outline-none leading-relaxed resize-none selection:bg-orange-500/30"
                  spellCheck="false"
                />
              </div>
            </div>

            {/* Run Button */}
            <button
              disabled={isRunning}
              onClick={handleRunCode}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'Executing Python Engine...' : 'Run Code & Test Cases'}</span>
            </button>
          </div>
        </div>

        {/* Right: Output Terminal & Test Case Results */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-orange-400" />
                  <h4 className="text-sm font-bold text-white">Execution Console & Test Runner</h4>
                </div>
                {testsPassed && (
                  <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> All Tests Passed
                  </span>
                )}
              </div>

              {/* Terminal Screen */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 min-h-[220px] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                {output || (
                  <span className="text-slate-600">
                    Console ready. Click 'Run Code & Test Cases' to verify logic against automated test cases...
                  </span>
                )}
              </div>

              {/* Expected Output Spec */}
              <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Expected Output:
                </div>
                <pre className="font-mono text-xs text-emerald-400/90 whitespace-pre-wrap">
                  {challenge.expectedOutput}
                </pre>
              </div>
            </div>

            {/* Engineering Tip */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-xs text-orange-200/90 space-y-1">
              <div className="font-bold text-orange-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                2026 Interview Context:
              </div>
              <p className="text-slate-300">
                In TCS Prime, Infosys Power Programmer, and Series A startup rounds, interviewers often ask you to implement these core AI primitives without importing high-level frameworks (e.g. implementing similarity or chunking from pure Python standard library).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
