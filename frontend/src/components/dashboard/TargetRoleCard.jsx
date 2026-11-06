import React, { useState } from 'react';
import { Briefcase, DollarSign, TrendingUp, ChevronRight, Check } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TargetRoleCard = ({ selectedRole, jobRoles, onSelectRole, onBrowseCatalog }) => {
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Briefcase size={20} color="var(--primary-600)" />
            <span>Target Job Role</span>
          </h3>
          <p className="card-subtitle">
            Currently targeted career transition track
          </p>
        </div>
        <button
          onClick={() => setIsSwitchModalOpen(true)}
          className="btn btn-secondary btn-sm"
        >
          Change Role
        </button>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-950)', marginBottom: '0.4rem' }}>
          {selectedRole?.title}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
          {selectedRole?.shortDescription}
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          padding: '1rem',
          backgroundColor: 'var(--slate-50)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--slate-200)',
          marginBottom: '1.25rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
            <DollarSign size={14} color="var(--primary-600)" />
            <span>Industry Salary</span>
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--navy-950)', marginTop: '0.2rem' }}>
            {selectedRole?.averageSalary || '$85,000 - $125,000'}
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>
            <TrendingUp size={14} color="var(--success-main)" />
            <span>Market Demand</span>
          </div>
          <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--success-text)', marginTop: '0.2rem' }}>
            {selectedRole?.hiringDemand || 'High Demand'}
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.05em' }}>
          Primary Required Tech Stack ({selectedRole?.requiredSkills?.length || 0})
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
          {(selectedRole?.requiredSkills || []).slice(0, 5).map((req, idx) => (
            <span
              key={idx}
              className="badge badge-navy"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            >
              {req.skillName}
            </span>
          ))}
          {(selectedRole?.requiredSkills?.length || 0) > 5 && (
            <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
              +{selectedRole.requiredSkills.length - 5} more
            </span>
          )}
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={onBrowseCatalog}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%' }}
        >
          Explore All Job Roles
        </button>
      </div>

      {/* Switch Role Modal */}
      <Modal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        title="Select Target Industry Role"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
          {jobRoles.map((role) => {
            const isSelected = selectedRole?.title === role.title;
            return (
              <div
                key={role.title}
                onClick={() => {
                  onSelectRole(role);
                  setIsSwitchModalOpen(false);
                }}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  border: isSelected ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  backgroundColor: isSelected ? 'var(--primary-50)' : 'var(--white)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isSelected ? 'var(--primary-800)' : 'var(--navy-950)' }}>
                    {role.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '0.2rem' }}>
                    {role.category} • {role.averageSalary}
                  </div>
                </div>

                {isSelected ? (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--primary-600)',
                      color: 'var(--white)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Check size={14} />
                  </div>
                ) : (
                  <ChevronRight size={18} color="var(--slate-400)" />
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};
