import React from 'react';
import { ProgressBar } from '../common/ProgressBar';
import { Map, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';

export const RecentRoadmapWidget = ({ roadmap, onToggleItem, onViewFullRoadmap }) => {
  const modules = roadmap?.modules || [];
  const completionPercentage = roadmap?.completionPercentage || 0;

  return (
    <div className="card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Map size={20} color="var(--primary-600)" />
            <span>Active Learning Roadmap Milestones</span>
          </h3>
          <p className="card-subtitle">
            Personalized syllabus generated from identified skill gaps
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '140px' }}>
            <ProgressBar value={completionPercentage} height="8px" />
          </div>
          <button
            onClick={onViewFullRoadmap}
            className="btn btn-primary btn-sm"
          >
            <span>Full Roadmap</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {modules.length === 0 ? (
        <div
          style={{
            padding: '2.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--slate-300)'
          }}
        >
          <CheckCircle2 size={36} color="var(--success-main)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontWeight: 700, color: 'var(--navy-950)' }}>
            All Set! No Technical Gaps Found
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
            Your student profile already matches all the core technical competencies for this job role!
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {modules.slice(0, 4).map((mod) => (
            <div
              key={mod.topicId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--slate-200)',
                backgroundColor: mod.isCompleted ? 'var(--success-bg)' : 'var(--white)',
                borderColor: mod.isCompleted ? 'var(--success-border)' : 'var(--slate-200)',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <button
                  onClick={() => onToggleItem(mod.topicId)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: mod.isCompleted ? 'var(--success-main)' : 'var(--slate-400)'
                  }}
                  title={mod.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  {mod.isCompleted ? (
                    <CheckCircle2 size={22} color="var(--success-main)" />
                  ) : (
                    <Circle size={22} />
                  )}
                </button>

                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: '0.925rem',
                      color: mod.isCompleted ? 'var(--success-text)' : 'var(--navy-950)',
                      textDecoration: mod.isCompleted ? 'line-through' : 'none'
                    }}
                  >
                    {mod.skillName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span className="badge badge-navy" style={{ fontSize: '0.6875rem' }}>
                      {mod.category}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} />
                      {mod.estimatedDuration}
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  className={`badge ${mod.priority === 'High' ? 'badge-red' : mod.priority === 'Medium' ? 'badge-amber' : 'badge-blue'}`}
                  style={{ fontSize: '0.7rem' }}
                >
                  {mod.priority} Priority
                </span>

                <button
                  onClick={() => onToggleItem(mod.topicId)}
                  className={`btn btn-sm ${mod.isCompleted ? 'btn-secondary' : 'btn-outline-primary'}`}
                >
                  {mod.isCompleted ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>
            </div>
          ))}

          {modules.length > 4 && (
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={onViewFullRoadmap}
                className="btn btn-secondary btn-sm"
              >
                View all {modules.length} roadmap milestones →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
