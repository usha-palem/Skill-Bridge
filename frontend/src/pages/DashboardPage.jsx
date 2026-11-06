import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { StatsOverview } from '../components/dashboard/StatsOverview';
import { SkillMatchMeter } from '../components/dashboard/SkillMatchMeter';
import { TargetRoleCard } from '../components/dashboard/TargetRoleCard';
import { RecentRoadmapWidget } from '../components/dashboard/RecentRoadmapWidget';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

export const DashboardPage = ({ setCurrentTab }) => {
  const { user } = useAuth();
  const {
    jobRoles,
    selectedRole,
    setSelectedRole,
    gapAnalysis,
    roadmap,
    toggleRoadmapItem
  } = useSkillBridge();

  return (
    <div className="animate-fade-in">
      {/* Student Welcome Hero Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '1.75rem',
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--slate-200)',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '2rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span className="badge badge-blue">Student Dashboard</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <GraduationCap size={15} color="var(--primary-600)" />
              {user?.college || 'Engineering Institute'} • Class of {user?.graduationYear || 2026}
            </span>
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy-950)' }}>
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p style={{ fontSize: '0.925rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
            Bridging your academic foundations into high-impact industry software engineering.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setCurrentTab('skills')}
            className="btn btn-secondary"
          >
            Update Skills
          </button>
          <button
            onClick={() => setCurrentTab('gap-analysis')}
            className="btn btn-primary"
          >
            <Sparkles size={16} />
            <span>View Skill Gaps</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <StatsOverview
        gapAnalysis={gapAnalysis}
        roadmap={roadmap}
        onNavigate={setCurrentTab}
      />

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid-2">
        <SkillMatchMeter
          gapAnalysis={gapAnalysis}
          onAnalyzeMore={() => setCurrentTab('gap-analysis')}
        />

        <TargetRoleCard
          selectedRole={selectedRole}
          jobRoles={jobRoles}
          onSelectRole={setSelectedRole}
          onBrowseCatalog={() => setCurrentTab('jobs')}
        />
      </div>

      {/* Personalized Roadmap Quick Checkoff Widget */}
      <RecentRoadmapWidget
        roadmap={roadmap}
        onToggleItem={toggleRoadmapItem}
        onViewFullRoadmap={() => setCurrentTab('roadmap')}
      />
    </div>
  );
};
