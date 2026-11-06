import React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, Zap, RefreshCw } from 'lucide-react';

export const GapAnalysisCard = ({ gapAnalysis, selectedRole, onGenerateRoadmap, onRefresh }) => {
  const matchPercentage = gapAnalysis?.matchPercentage || 0;
  const readiness = gapAnalysis?.readinessLevel || 'Foundational Stage';
  const summary = gapAnalysis?.summaryMessage || '';

  const stats = gapAnalysis?.stats || {
    totalRequiredSkills: 0,
    matchedSkillsCount: 0,
    fullyMatchedCount: 0,
    missingRequiredCount: 0,
    missingRecommendedCount: 0
  };

  const getReadinessTheme = () => {
    if (matchPercentage >= 80) {
      return {
        badge: 'badge-green',
        border: 'var(--success-border)',
        bg: 'var(--success-bg)',
        text: 'var(--success-text)',
        accent: 'var(--success-main)'
      };
    }
    if (matchPercentage >= 50) {
      return {
        badge: 'badge-blue',
        border: 'var(--primary-200)',
        bg: 'var(--primary-50)',
        text: 'var(--primary-800)',
        accent: 'var(--primary-600)'
      };
    }
    return {
      badge: 'badge-amber',
      border: 'var(--warning-border)',
      bg: 'var(--warning-bg)',
      text: 'var(--warning-text)',
      accent: 'var(--warning-main)'
    };
  };

  const theme = getReadinessTheme();

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Target size={22} color="var(--primary-600)" />
            <span>Target Role: {selectedRole?.title}</span>
          </h3>
          <p className="card-subtitle">
            Algorithmic skill matching against benchmark role specifications
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span className={`badge ${theme.badge}`}>
            {readiness}
          </span>
          <button
            onClick={onRefresh}
            className="btn btn-secondary btn-sm"
            title="Recalculate Analysis"
          >
            <RefreshCw size={13} />
            <span>Recalculate</span>
          </button>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
        {/* Match Percentage Visual Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '1.5rem',
            backgroundColor: theme.bg,
            borderRadius: 'var(--radius-lg)',
            border: `1px solid ${theme.border}`
          }}
        >
          <div
            style={{
              width: '90px',
              height: '90px',
              borderRadius: '50%',
              backgroundColor: 'var(--white)',
              border: `5px solid ${theme.accent}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-md)',
              flexShrink: 0
            }}
          >
            <span style={{ fontSize: '1.9rem', fontWeight: 800, color: theme.text, lineHeight: 1 }}>
              {matchPercentage}%
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
              Match
            </span>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--navy-950)', marginBottom: '0.35rem' }}>
              {readiness}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
              {summary}
            </p>
            <ProgressBar value={matchPercentage} height="8px" color={theme.accent} showPercentage={false} />
          </div>
        </div>

        {/* 3-Part Metric Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--success-bg)',
              border: '1px solid var(--success-border)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success-text)' }}>
              {stats.fullyMatchedCount}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--success-text)', marginTop: '0.2rem' }}>
              Full Matches
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--success-text)', opacity: 0.8 }}>
              Proficiency met
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--warning-bg)',
              border: '1px solid var(--warning-border)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--warning-text)' }}>
              {stats.matchedSkillsCount - stats.fullyMatchedCount}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--warning-text)', marginTop: '0.2rem' }}>
              Proficiency Gaps
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--warning-text)', opacity: 0.8 }}>
              Upgrades needed
            </div>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor: 'var(--danger-bg)',
              border: '1px solid var(--danger-border)',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--danger-text)' }}>
              {stats.missingRequiredCount}
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--danger-text)', marginTop: '0.2rem' }}>
              Missing Skills
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--danger-text)', opacity: 0.8 }}>
              Critical to learn
            </div>
          </div>
        </div>
      </div>

      {/* Roadmap Trigger Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.25rem',
          backgroundColor: 'var(--slate-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Zap size={20} color="var(--primary-600)" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--navy-950)' }}>
              Convert These Gaps into a Personalized Learning Roadmap
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              System has synthesized curated resources, tutorials, and milestones to bridge your {stats.missingRequiredCount} missing skills.
            </div>
          </div>
        </div>

        <button
          onClick={onGenerateRoadmap}
          className="btn btn-primary btn-sm"
        >
          <span>Open Learning Roadmap</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
