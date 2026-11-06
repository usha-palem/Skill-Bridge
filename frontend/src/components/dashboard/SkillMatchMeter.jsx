import React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { Award, CheckCircle2, AlertCircle } from 'lucide-react';

export const SkillMatchMeter = ({ gapAnalysis, onAnalyzeMore }) => {
  const matchPercentage = gapAnalysis?.matchPercentage || 0;
  const readiness = gapAnalysis?.readinessLevel || 'Foundational Stage';
  const summary = gapAnalysis?.summaryMessage || '';

  const getReadinessBadgeClass = () => {
    if (matchPercentage >= 80) return 'badge-green';
    if (matchPercentage >= 50) return 'badge-blue';
    return 'badge-amber';
  };

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Award size={20} color="var(--primary-600)" />
            <span>Job Role Readiness Meter</span>
          </h3>
          <p className="card-subtitle">
            Dynamic benchmark against industry entry criteria
          </p>
        </div>
        <span className={`badge ${getReadinessBadgeClass()}`}>
          {readiness}
        </span>
      </div>

      {/* Large Score Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          padding: '1.5rem',
          backgroundColor: 'var(--primary-50)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--primary-200)',
          marginBottom: '1.5rem'
        }}
      >
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: 'var(--white)',
            border: '4px solid var(--primary-600)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-md)',
            flexShrink: 0
          }}
        >
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-700)', lineHeight: 1 }}>
            {matchPercentage}%
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
            Match
          </span>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.35rem' }}>
            {gapAnalysis?.jobRoleTitle || 'Full Stack Developer'}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '0.75rem' }}>
            {summary}
          </p>
          <ProgressBar value={matchPercentage} height="8px" showPercentage={false} />
        </div>
      </div>

      {/* Quick Analysis Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--success-bg)',
            border: '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success-text)', fontWeight: 700, fontSize: '0.875rem' }}>
            <CheckCircle2 size={16} />
            <span>Matched Skills</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-text)', marginTop: '0.25rem' }}>
            {gapAnalysis?.stats?.matchedSkillsCount || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', opacity: 0.9 }}>
            {gapAnalysis?.stats?.fullyMatchedCount || 0} meet full required level
          </div>
        </div>

        <div
          style={{
            padding: '1rem',
            backgroundColor: 'var(--warning-bg)',
            border: '1px solid var(--warning-border)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--warning-text)', fontWeight: 700, fontSize: '0.875rem' }}>
            <AlertCircle size={16} />
            <span>Missing Skills</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--warning-text)', marginTop: '0.25rem' }}>
            {gapAnalysis?.stats?.missingRequiredCount || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--warning-text)', opacity: 0.9 }}>
            Core skills not found in profile
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={onAnalyzeMore}
          className="btn btn-outline-primary btn-sm"
          style={{ width: '100%' }}
        >
          Deep Dive Into Skill Gaps →
        </button>
      </div>
    </div>
  );
};
