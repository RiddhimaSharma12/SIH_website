import React, { useState, useEffect } from 'react';
import { User } from './types/database';
import { MockDatabaseService } from './services/mockDatabase';
import { CivicHeader } from './components/CivicHeader';
import { LoginPage } from './pages/LoginPage';
import { LandingPage } from './pages/LandingPage';
import { FounderDashboard } from './pages/FounderDashboard';
import { ReviewerDashboard } from './pages/ReviewerDashboard';
import { OfficialDashboard } from './pages/OfficialDashboard';
import { SystemArchitectureModal } from './components/SystemArchitectureModal';

export function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    MockDatabaseService.initDatabase();
    return MockDatabaseService.getCurrentUser();
  });
  const [activeTab, setActiveTab] = useState<'login' | 'landing' | 'founder' | 'reviewer' | 'official'>('login');
  const [isFlowModalOpen, setIsFlowModalOpen] = useState(false);

  useEffect(() => {
    MockDatabaseService.initDatabase();
  }, []);

  const handleUserChange = (user: User) => {
    MockDatabaseService.setCurrentUser(user);
    setCurrentUser(user);
  };

  const handleLoginSuccess = (user: User, destinationTab: 'founder' | 'reviewer' | 'official') => {
    handleUserChange(user);
    setActiveTab(destinationTab);
  };

  if (activeTab === 'login') {
    return (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onContinueAsGuest={() => setActiveTab('landing')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      <CivicHeader
        currentUser={currentUser}
        onUserChange={handleUserChange}
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        onOpenFlowDiagram={() => setIsFlowModalOpen(true)}
        onLogout={() => setActiveTab('login')}
      />

      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onApplyNow={() => {
              const founder = MockDatabaseService.getUsers().find((u) => u.role === 'FOUNDER')!;
              handleUserChange(founder);
              setActiveTab('founder');
            }}
            onExploreProblems={() => {
              const element = document.getElementById('open-problems');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        )}

        {activeTab === 'founder' && <FounderDashboard />}
        {activeTab === 'reviewer' && <ReviewerDashboard />}
        {activeTab === 'official' && <OfficialDashboard />}
      </main>

      <SystemArchitectureModal
        isOpen={isFlowModalOpen}
        onClose={() => setIsFlowModalOpen(false)}
      />

      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-bold text-slate-200">
              Government Startup & Innovation Portal (GSP)
            </div>
            <p className="text-[11px] text-slate-500">
              Department for Promotion of Industry and Internal Trade (DPIIT) • Ministry of Commerce and Industry
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab('login')}
              className="text-amber-400 hover:underline cursor-pointer font-semibold"
            >
              Switch Body / Login
            </button>
            <span>•</span>
            <button
              onClick={() => setIsFlowModalOpen(true)}
              className="text-slate-300 hover:underline cursor-pointer"
            >
              System Flow Diagram
            </button>
            <span>•</span>
            <span className="text-slate-400">WCAG 2.1 AA Compliant</span>
            <span>•</span>
            <span className="text-slate-400">DPDPA 2023 Certified</span>
            <span>•</span>
            <span className="text-emerald-400">Database: Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
