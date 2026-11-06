import React from 'react';
import { Modal } from '../common/Modal';
import { Briefcase, DollarSign, TrendingUp, CheckCircle, Target, BookOpen } from 'lucide-react';

export const JobDetailModal = ({ isOpen, onClose, role, isSelected, onSetAsTarget, onAnalyzeGap }) => {
  if (!role) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={role.title} maxWidth="700px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Header Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <span className="badge badge-blue">{role.category}</span>
          <span className="badge badge-navy">{role.experienceLevel || 'Entry Level / College Graduate'}</span>
          <span className="badge badge-green">
            <TrendingUp size={12} /> {role.hiringDemand}
          </span>
        </div>

        {/* Description */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.35rem' }}>
            Role Overview
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
            {role.fullDescription || role.shortDescription}
          </p>
        </div>

        {/* Salary Benchmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.85rem 1rem',
            backgroundColor: 'var(--primary-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--primary-200)'
          }}
        >
          <DollarSign size={20} color="var(--primary-600)" />
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)' }}>
              Industry Salary Benchmark
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-900)' }}>
              {role.averageSalary}
            </div>
          </div>
        </div>

        {/* Key Responsibilities */}
        {role.keyResponsibilities && role.keyResponsibilities.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.5rem' }}>
              Day-to-Day Responsibilities
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
              {role.keyResponsibilities.map((resp, i) => (
                <li key={i} style={{ marginBottom: '0.35rem' }}>
                  {resp}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Mandatory Core Skills */}
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.5rem' }}>
            Required Industry Skills ({role.requiredSkills?.length || 0})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {(role.requiredSkills || []).map((req, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.65rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--slate-100)',
                  border: '1px solid var(--slate-300)',
                  fontSize: '0.8125rem'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--navy-950)' }}>{req.skillName}</span>
                <span className="badge badge-blue" style={{ fontSize: '0.6875rem' }}>
                  Min: {req.minimumProficiency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Skills */}
        {role.recommendedSkills && role.recommendedSkills.length > 0 && (
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--navy-950)', marginBottom: '0.5rem' }}>
              Recommended / Bonus Skills
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {role.recommendedSkills.map((rec, i) => (
                <span
                  key={i}
                  className="badge badge-navy"
                  style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem' }}
                >
                  {rec.skillName}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', borderTop: '1px solid var(--slate-200)', paddingTop: '1rem' }}>
          {!isSelected && (
            <button
              onClick={() => {
                onSetAsTarget(role);
                onClose();
              }}
              className="btn btn-outline-primary"
              style={{ flex: 1 }}
            >
              Set as Target Role
            </button>
          )}

          <button
            onClick={() => {
              onAnalyzeGap(role);
              onClose();
            }}
            className="btn btn-primary"
            style={{ flex: 1.5 }}
          >
            <Target size={16} />
            <span>Run Skill Gap Analysis</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
