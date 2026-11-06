import React from 'react';
import { Target, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';

export const StatsOverview = ({ gapAnalysis, roadmap, onNavigate }) => {
  const matchPercentage = gapAnalysis?.matchPercentage || 0;
  const missingCount = gapAnalysis?.stats?.missingRequiredCount || 0;
  const completedModules = roadmap?.completedModules || 0;
  const totalModules = roadmap?.totalModules || 0;
  const matchedCount = gapAnalysis?.stats?.matchedSkillsCount || 0;
  const totalRequired = gapAnalysis?.stats?.totalRequiredSkills || 0;

  const stats = [
    {
      label: 'Job Match Score',
      value: `${matchPercentage}%`,
      subtitle: `${matchedCount}/${totalRequired} Required Skills Met`,
      icon: Target,
      color: 'var(--primary-600)',
      bg: 'var(--primary-50)',
      onClick: () => onNavigate('gap-analysis')
    },
    {
      label: 'Missing Critical Skills',
      value: missingCount,
      subtitle: 'Core competencies to acquire',
      icon: AlertTriangle,
      color: 'var(--warning-main)',
      bg: 'var(--warning-bg)',
      onClick: () => onNavigate('gap-analysis')
    },
    {
      label: 'Roadmap Progress',
      value: `${completedModules}/${totalModules}`,
      subtitle: `${roadmap?.completionPercentage || 0}% Milestones finished`,
      icon: BookOpen,
      color: 'var(--success-main)',
      bg: 'var(--success-bg)',
      onClick: () => onNavigate('roadmap')
    },
    {
      label: 'Portfolio Skills',
      value: gapAnalysis?.stats?.totalStudentSkills || 0,
      subtitle: 'Verified technical competencies',
      icon: CheckCircle,
      color: 'var(--primary-800)',
      bg: 'var(--primary-100)',
      onClick: () => onNavigate('skills')
    }
  ];

  return (
    <div className="grid-4" style={{ marginBottom: '2rem' }}>
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="card"
            onClick={stat.onClick}
            style={{
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-500)' }}>
                  {stat.label}
                </span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-950)', marginTop: '0.25rem' }}>
                  {stat.value}
                </div>
              </div>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: stat.bg,
                  color: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon size={22} />
              </div>
            </div>

            <div
              style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--slate-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{stat.subtitle}</span>
              <span style={{ color: 'var(--primary-600)', fontWeight: 600 }}>View →</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
