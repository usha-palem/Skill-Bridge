import React from 'react';
import { Briefcase, DollarSign, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';

export const JobRoleCard = ({
  role,
  isSelected,
  onSelectRole,
  onViewDetails,
  onAnalyzeGap
}) => {
  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
        backgroundColor: isSelected ? '#fafcff' : 'var(--white)'
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <span className="badge badge-blue">
            {role.category}
          </span>
          {isSelected && (
            <span className="badge badge-green">
              <CheckCircle size={12} /> Target Role
            </span>
          )}
        </div>

        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-950)', marginBottom: '0.4rem' }}>
          {role.title}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '1rem', lineHeight: 1.5 }}>
          {role.shortDescription}
        </p>

        {/* Salary & Demand Badges */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.75rem',
            padding: '0.75rem',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--slate-200)',
            marginBottom: '1rem',
            fontSize: '0.785rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}>
            <DollarSign size={14} color="var(--primary-600)" />
            <span>{role.averageSalary}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--success-text)' }}>
            <TrendingUp size={14} color="var(--success-main)" />
            <span>{role.hiringDemand}</span>
          </div>
        </div>

        {/* Skills Tag Cloud */}
        <div style={{ marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.725rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.05em' }}>
            Core Skill Requirements:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
            {(role.requiredSkills || []).slice(0, 5).map((req, idx) => (
              <span key={idx} className="badge badge-navy" style={{ fontSize: '0.725rem' }}>
                {req.skillName}
              </span>
            ))}
            {(role.requiredSkills?.length || 0) > 5 && (
              <span className="badge badge-blue" style={{ fontSize: '0.725rem' }}>
                +{role.requiredSkills.length - 5} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
        <button
          onClick={() => onViewDetails(role)}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          Role Specs
        </button>

        {isSelected ? (
          <button
            onClick={() => onAnalyzeGap(role)}
            className="btn btn-primary btn-sm"
            style={{ flex: 1.2 }}
          >
            <span>Analyze Gap</span>
            <ArrowRight size={13} />
          </button>
        ) : (
          <button
            onClick={() => onSelectRole(role)}
            className="btn btn-outline-primary btn-sm"
            style={{ flex: 1.2 }}
          >
            Set as Target
          </button>
        )}
      </div>
    </div>
  );
};
