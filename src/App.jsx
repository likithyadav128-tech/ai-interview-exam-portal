import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ExamEngine from './components/ExamEngine';
import CompanyTracks from './components/CompanyTracks';
import AIInterviewSimulator from './components/AIInterviewSimulator';
import CodingBench from './components/CodingBench';
import RoadmapView from './components/RoadmapView';
import ProjectPortfolioHub from './components/ProjectPortfolioHub';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('exams');
  const [userStage, setUserStage] = useState('sem7'); // 'sem5', 'sem7', 'graduate'
  const [activeExamId, setActiveExamId] = useState('layer-3');
  const [examHistory, setExamHistory] = useState([
    {
      paperId: 'layer-1',
      paperTitle: 'Layer 1: Programming Fundamentals & Python',
      totalQuestions: 5,
      correctCount: 4,
      scorePercentage: 80,
      passed: true,
      unlockedBand: '₹6.5 - 11 LPA (TCS Prime / Infosys Power Programmer AI-Tier)',
      timestamp: new Date().toISOString()
    }
  ]);

  const handleExamCompleted = (result) => {
    setExamHistory(prev => [result, ...prev]);
  };

  const handleLaunchCompanyExam = (examId) => {
    setActiveExamId(examId);
    setActiveTab('exams');
  };

  // Compute aggregate score
  const globalScore = examHistory.length > 0
    ? Math.round(examHistory.reduce((acc, c) => acc + c.scorePercentage, 0) / examHistory.length)
    : 75;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userStage={userStage}
          setUserStage={setUserStage}
          globalScore={globalScore}
          totalTestsAttempted={examHistory.length}
        />

        <main className="transition-all duration-300">
          {activeTab === 'exams' && (
            <ExamEngine
              activeExamId={activeExamId}
              setActiveExamId={setActiveExamId}
              onExamCompleted={handleExamCompleted}
            />
          )}

          {activeTab === 'companies' && (
            <CompanyTracks
              onLaunchCompanyExam={handleLaunchCompanyExam}
            />
          )}

          {activeTab === 'interview' && (
            <AIInterviewSimulator />
          )}

          {activeTab === 'coding' && (
            <CodingBench />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              userStage={userStage}
              setUserStage={setUserStage}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectPortfolioHub />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              examHistory={examHistory}
              globalScore={globalScore}
              onNavigateToExams={() => setActiveTab('exams')}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8 mt-16 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-300">The 2026 AI Career Roadmap</span> — For Indian Engineering Students
            <div className="text-[11px] text-slate-500 mt-0.5">Based on FACE Prep 2026 Placement Guidelines • Edition 1 (May 2026)</div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-orange-400 transition-colors">Curriculum</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-orange-400 transition-colors">5 Projects</button>
            <button onClick={() => setActiveTab('companies')} className="hover:text-orange-400 transition-colors">14 Companies</button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-orange-400 transition-colors">CTC Matrix</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
