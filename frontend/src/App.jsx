import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SkillBridgeProvider } from './context/SkillBridgeContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { DashboardPage } from './pages/DashboardPage';
import { SkillsManagerPage } from './pages/SkillsManagerPage';
import { JobRolesPage } from './pages/JobRolesPage';
import { GapAnalysisPage } from './pages/GapAnalysisPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProfilePage } from './pages/ProfilePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function AppContent() {
  const getInitialTab = () => {
    // 1. Check window.location.hash (e.g. #roadmap)
    if (window.location.hash) {
      const cleanHash = window.location.hash.replace('#', '').replace('/', '').toLowerCase();
      if (['dashboard', 'skills', 'jobs', 'gap-analysis', 'roadmap', 'profile', 'login', 'register'].includes(cleanHash)) {
        return cleanHash;
      }
    }
    // 2. Check window.location.pathname (e.g. /roadmap)
    if (window.location.pathname && window.location.pathname !== '/') {
      const cleanPath = window.location.pathname.replace('/', '').toLowerCase();
      if (['dashboard', 'skills', 'jobs', 'gap-analysis', 'roadmap', 'profile', 'login', 'register'].includes(cleanPath)) {
        return cleanPath;
      }
    }
    return 'dashboard';
  };

  const [currentTab, setCurrentTabState] = useState(getInitialTab);

  // Synchronize Tab and Browser URL
  const setCurrentTab = (tab) => {
    setCurrentTabState(tab);
    window.location.hash = tab;
  };

  // Listen for browser forward/back buttons and hash changes
  useEffect(() => {
    const handleUrlChange = () => {
      const detectedTab = getInitialTab();
      setCurrentTabState(detectedTab);
    };

    window.addEventListener('hashchange', handleUrlChange);
    window.addEventListener('popstate', handleUrlChange);

    return () => {
      window.removeEventListener('hashchange', handleUrlChange);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardPage setCurrentTab={setCurrentTab} />;
      case 'skills':
        return <SkillsManagerPage setCurrentTab={setCurrentTab} />;
      case 'jobs':
        return <JobRolesPage setCurrentTab={setCurrentTab} />;
      case 'gap-analysis':
        return <GapAnalysisPage setCurrentTab={setCurrentTab} />;
      case 'roadmap':
        return <RoadmapPage setCurrentTab={setCurrentTab} />;
      case 'profile':
        return <ProfilePage />;
      case 'login':
        return <LoginPage setCurrentTab={setCurrentTab} />;
      case 'register':
        return <RegisterPage setCurrentTab={setCurrentTab} />;
      default:
        return <DashboardPage setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="app-layout">
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <main className="main-content">
        <ErrorBoundary key={currentTab}>
          {renderTabContent()}
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SkillBridgeProvider>
        <AppContent />
      </SkillBridgeProvider>
    </AuthProvider>
  );
}
