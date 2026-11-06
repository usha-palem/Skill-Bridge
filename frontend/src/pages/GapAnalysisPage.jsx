import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { GapAnalysisCard } from '../components/gapAnalysis/GapAnalysisCard';
import { SkillComparisonTable } from '../components/gapAnalysis/SkillComparisonTable';
import { GitCompare, Map, Sparkles, Check } from 'lucide-react';

export const GapAnalysisPage = ({ setCurrentTab }) => {
  const { user, addSkillToProfile } = useAuth();
  const {
    jobRoles,
    selectedRole,
    setSelectedRole,
    gapAnalysis,
    loadRoadmap
  } = useSkillBridge();

  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuickAddSkill = async (name, category, proficiency) => {
    await addSkillToProfile(name, category, proficiency);
    showNotification(`Added "${name}" to your profile! Match score recalculated.`);
  };

  const handleQuickUpgradeSkill = async (name, category, targetProf) => {
    await addSkillToProfile(name, category, targetProf);
    showNotification(`Upgraded "${name}" to ${targetProf}! Match score increased.`);
  };

  const handleGenerateRoadmap = () => {
    loadRoadmap(selectedRole?.title);
    setCurrentTab('roadmap');
  };

  return (
    <div className="animate-fade-in">
      {/* Header & Target Role Selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-950)' }}>
            Dynamic Skill Gap Analysis
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
            Real-time algorithmic comparison of your verified competencies against industry entry criteria
          </p>
        </div>

        {/* Change Role on the fly */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Compare With:
          </span>
          <select
            value={selectedRole?.title || ''}
            onChange={(e) => {
              const found = jobRoles.find(r => r.title === e.target.value);
              if (found) setSelectedRole(found);
            }}
            className="form-select"
            style={{ width: 'auto', fontWeight: 700, padding: '0.45rem 0.85rem' }}
          >
            {jobRoles.map((r) => (
              <option key={r.title} value={r.title}>
                {r.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {notification && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success-text)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Sparkles size={16} />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Analysis Summary Card */}
      <GapAnalysisCard
        gapAnalysis={gapAnalysis}
        selectedRole={selectedRole}
        onGenerateRoadmap={handleGenerateRoadmap}
        onRefresh={() => showNotification('Skill gap scores synchronized with latest inputs!')}
      />

      {/* Comparison Matrix Table */}
      <SkillComparisonTable
        gapAnalysis={gapAnalysis}
        onQuickAddSkill={handleQuickAddSkill}
        onQuickUpgradeSkill={handleQuickUpgradeSkill}
      />
    </div>
  );
};
