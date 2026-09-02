import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthLanding from './components/AuthLanding';
import ExamEngine from './components/ExamEngine';
import CompanyTracks from './components/CompanyTracks';
import AIInterviewSimulator from './components/AIInterviewSimulator';
import CodingBench from './components/CodingBench';
import RoadmapView from './components/RoadmapView';
import ProjectPortfolioHub from './components/ProjectPortfolioHub';
import AnalyticsDashboard from './components/AnalyticsDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('exams');
  const [userStage, setUserStage] = useState('sem7'); // 'sem5', 'sem7', 'graduate'
  const [activeExamId, setActiveExamId] = useState('layer-3');
  const [examHistory, setExamHistory] = useState([]);

  // Check persisted user session on mount
  useEffect(() => {
    try {
      const savedUserStr = localStorage.getItem('ai_portal_current_user');
      if (savedUserStr) {
        const parsedUser = JSON.parse(savedUserStr);
        setCurrentUser(parsedUser);
        if (parsedUser.stage) setUserStage(parsedUser.stage);
        if (parsedUser.examHistory) setExamHistory(parsedUser.examHistory);
      }
    } catch (e) {
      console.error("Failed to load user session", e);
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    if (user.stage) setUserStage(user.stage);
    if (user.examHistory) setExamHistory(user.examHistory);
    setActiveTab('exams');
  };

  const handleLogout = () => {
    localStorage.removeItem('ai_portal_current_user');
    setCurrentUser(null);
  };

  const handleExamCompleted = (result) => {
    const updatedHistory = [result, ...examHistory];
    setExamHistory(updatedHistory);

    // Save to user profile in localStorage
    if (currentUser) {
      const updatedUser = { ...currentUser, examHistory: updatedHistory };
      setCurrentUser(updatedUser);
      localStorage.setItem('ai_portal_current_user', JSON.stringify(updatedUser));

      // Update all users list
      try {
        const usersStr = localStorage.getItem('ai_portal_users');
        let users = usersStr ? JSON.parse(usersStr) : [];
        const uIdx = users.findIndex(u => u.email === currentUser.email);
        if (uIdx !== -1) {
          users[uIdx] = updatedUser;
          localStorage.setItem('ai_portal_users', JSON.stringify(users));
        }
      } catch (err) {
        console.error("Error saving exam history", err);
      }
    }
  };

  const handleLaunchCompanyExam = (examId) => {
    setActiveExamId(examId);
    setActiveTab('exams');
  };

  // Compute aggregate score
  const globalScore = examHistory.length > 0
    ? Math.round(examHistory.reduce((acc, c) => acc + c.scorePercentage, 0) / examHistory.length)
    : 75;

  // If not logged in, render the Animated Auth Flow Landing
  if (!currentUser) {
    return <AuthLanding onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      <div>
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          userStage={userStage}
          setUserStage={setUserStage}
          globalScore={globalScore}
          totalTestsAttempted={examHistory.length}
          currentUser={currentUser}
          onLogout={handleLogout}
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
            <div className="text-[11px] text-slate-500 mt-0.5">
              Logged in as <span className="text-purple-400 font-bold">{currentUser.name}</span> ({currentUser.email})
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('roadmap')} className="hover:text-purple-400 transition-colors">Curriculum</button>
            <button onClick={() => setActiveTab('projects')} className="hover:text-purple-400 transition-colors">5 Projects</button>
            <button onClick={() => setActiveTab('companies')} className="hover:text-purple-400 transition-colors">14 Companies</button>
            <button onClick={() => setActiveTab('analytics')} className="hover:text-purple-400 transition-colors">CTC Matrix</button>
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 transition-colors font-medium">Sign Out</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
