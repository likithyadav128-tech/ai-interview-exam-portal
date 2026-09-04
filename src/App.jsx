import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/auth/LoginPage';
import AuthLoading from './components/auth/AuthLoading';
import StageExperienceHub from './components/StageExperienceHub';
import ExamEngine from './components/ExamEngine';
import CompanyTracks from './components/CompanyTracks';
import AIInterviewSimulator from './components/AIInterviewSimulator';
import CodingBench from './components/CodingBench';
import RoadmapView from './components/RoadmapView';
import ProjectPortfolioHub from './components/ProjectPortfolioHub';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { AuthProvider, useAuth } from './auth/AuthContext';

function AuthenticatedApp() {
  const { user, isAuthenticated, isLoading, logout, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('stage');
  const [userStage, setUserStage] = useState('sem7');
  const [activeExamId, setActiveExamId] = useState('layer-3');
  const [examHistory, setExamHistory] = useState([]);

  // Sync user state when user object changes
  useEffect(() => {
    if (user) {
      if (user.stage) setUserStage(user.stage);
      if (user.examHistory) setExamHistory(user.examHistory);
    }
  }, [user]);

  // Loading Screen
  if (isLoading) {
    return <AuthLoading message="Checking your Microsoft session..." />;
  }

  // Unauthenticated -> Professional Two-Section Microsoft Login Page
  if (!isAuthenticated || !user) {
    return <LoginPage />;
  }

  const handleStageChange = (newStage) => {
    setUserStage(newStage);
    updateUserProfile({ stage: newStage });
  };

  const handleExamCompleted = (result) => {
    const updatedHistory = [result, ...examHistory];
    setExamHistory(updatedHistory);
    updateUserProfile({ examHistory: updatedHistory });
  };

  const handleLaunchExam = (examId) => {
    setActiveExamId(examId);
    setActiveTab('exams');
  };

  // Compute aggregate score
  const globalScore = examHistory.length > 0
    ? Math.round(examHistory.reduce((acc, c) => acc + c.scorePercentage, 0) / examHistory.length)
    : 75;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userStage={userStage}
          setUserStage={handleStageChange}
          globalScore={globalScore}
          totalTestsAttempted={examHistory.length}
          currentUser={user}
          onLogout={logout}
        />

        <main className="transition-all duration-300">
          {activeTab === 'stage' && (
            <StageExperienceHub
              userStage={userStage}
              setUserStage={handleStageChange}
              onLaunchExam={handleLaunchExam}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'exams' && (
            <ExamEngine
              activeExamId={activeExamId}
              setActiveExamId={setActiveExamId}
              onExamCompleted={handleExamCompleted}
            />
          )}

          {activeTab === 'companies' && (
            <CompanyTracks
              onLaunchCompanyExam={handleLaunchExam}
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
              setUserStage={handleStageChange}
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
            <span className="font-bold text-slate-300">The 2026 AI Career Roadmap</span> — University Placement Edition
            <div className="text-[11px] text-slate-500 mt-0.5">
              Signed in as <span className="text-blue-400 font-bold">{user.name}</span> ({user.email}) • Mode: <span className="text-slate-300 font-bold">{user.authProvider === 'microsoft' ? 'Microsoft SSO' : 'University Auth'}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('stage')} className="hover:text-blue-400 transition-colors">Stage Hub</button>
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-blue-400 transition-colors">Curriculum</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-blue-400 transition-colors">5 Projects</button>
            <button onClick={() => setActiveTab('companies')} className="hover:text-blue-400 transition-colors">14 Companies</button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-blue-400 transition-colors">CTC Matrix</button>
            <button onClick={logout} className="text-red-400 hover:text-red-300 transition-colors font-medium">Sign Out</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthenticatedApp />
    </AuthProvider>
  );
}
