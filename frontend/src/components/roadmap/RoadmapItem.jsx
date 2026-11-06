import React, { useState } from 'react';
import { ResourceCard } from './ResourceCard';
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  Layers,
  Calendar,
  Check
} from 'lucide-react';

export const RoadmapItem = ({ module, index, onToggleComplete }) => {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const isCompleted = module.isCompleted;
  const weekLabel = module.weekLabel || `Week ${index + 1}`;

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return <span className="badge badge-red">High Priority Missing</span>;
      case 'Medium':
        return <span className="badge badge-amber">Proficiency Upgrade</span>;
      default:
        return <span className="badge badge-blue">Elective / Bonus</span>;
    }
  };

  return (
    <div
      style={{
        backgroundColor: isCompleted ? '#fbfdfc' : 'var(--white)',
        border: isCompleted ? '2px solid var(--success-border)' : '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: isCompleted ? 'var(--shadow-sm)' : 'var(--shadow-sm)',
        marginBottom: '1.25rem',
        overflow: 'hidden',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Module Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          cursor: 'pointer',
          backgroundColor: isCompleted ? 'var(--success-bg)' : 'transparent',
          borderBottom: isExpanded ? '1px solid var(--slate-200)' : 'none',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px' }}>
          {/* Interactive Checkbox */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(module.topicId);
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isCompleted ? 'var(--success-main)' : 'var(--slate-400)',
              padding: '2px'
            }}
            title={isCompleted ? 'Mark as incomplete' : 'Mark week as complete'}
            aria-label={`Toggle completion for ${module.skillName}`}
          >
            {isCompleted ? (
              <CheckCircle2 size={28} color="var(--success-main)" />
            ) : (
              <Circle size={28} />
            )}
          </button>

          {/* Week Label & Skill Title */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: isCompleted ? 'var(--success-text)' : 'var(--primary-700)',
                  backgroundColor: isCompleted ? 'var(--white)' : 'var(--primary-50)',
                  border: isCompleted ? '1px solid var(--success-border)' : '1px solid var(--primary-200)',
                  padding: '0.15rem 0.5rem',
                  borderRadius: 'var(--radius-full)',
                  letterSpacing: '0.025em'
                }}
              >
                <Calendar size={12} />
                {weekLabel}
              </span>

              {getPriorityBadge(module.priority)}

              <span className="badge badge-navy" style={{ fontSize: '0.7rem' }}>
                {module.category}
              </span>
            </div>

            <div
              style={{
                fontSize: '1.2rem',
                fontWeight: 800,
                color: isCompleted ? 'var(--success-text)' : 'var(--navy-950)',
                textDecoration: isCompleted ? 'line-through' : 'none',
                marginTop: '0.25rem'
              }}
            >
              {module.skillName}
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.8125rem',
              color: 'var(--slate-500)',
              fontWeight: 600
            }}
          >
            <Clock size={15} />
            <span>{module.estimatedDuration}</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleComplete(module.topicId);
            }}
            className={`btn btn-sm ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
            style={{
              minWidth: '125px',
              backgroundColor: isCompleted ? 'var(--white)' : 'var(--primary-600)',
              color: isCompleted ? 'var(--success-text)' : 'var(--white)',
              borderColor: isCompleted ? 'var(--success-border)' : 'transparent'
            }}
          >
            {isCompleted ? (
              <>
                <Check size={14} color="var(--success-main)" />
                <span>Completed ✓</span>
              </>
            ) : (
              <span>Mark Complete</span>
            )}
          </button>

          <div style={{ color: 'var(--slate-400)' }}>
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>

      {/* Expanded Accordion Body */}
      {isExpanded && (
        <div style={{ padding: '1.75rem', backgroundColor: 'var(--white)' }}>
          {/* Target Proficiency Callout */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.85rem 1.15rem',
              backgroundColor: 'var(--slate-50)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--slate-200)',
              marginBottom: '1.5rem',
              fontSize: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--slate-700)' }}>
              <Target size={16} color="var(--primary-600)" />
              <span>Target Proficiency:</span>
              <strong style={{ color: 'var(--navy-950)' }}>{module.targetProficiency}</strong>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
              Status: <strong style={{ color: isCompleted ? 'var(--success-main)' : 'var(--primary-600)' }}>
                {isCompleted ? 'Mastered & Verified' : 'In Progress'}
              </strong>
            </div>
          </div>

          {/* Specific Weekly Topics */}
          {module.topics && module.topics.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--navy-950)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Layers size={16} color="var(--primary-600)" />
                <span>Weekly Core Learning Topics</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {module.topics.map((top, idx) => (
                  <span
                    key={idx}
                    className="badge badge-navy"
                    style={{ fontSize: '0.785rem', padding: '0.35rem 0.65rem' }}
                  >
                    {top}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Learning Objectives */}
          {module.learningObjectives && module.learningObjectives.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--navy-950)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Sparkles size={16} color="var(--primary-600)" />
                <span>Learning Objectives & Syllabus Checklist</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                {module.learningObjectives.map((obj, i) => (
                  <li key={i} style={{ marginBottom: '0.35rem' }}>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Curated Resources */}
          {module.resources && module.resources.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--navy-950)',
                  marginBottom: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem'
                }}
              >
                <Clock size={16} color="var(--primary-600)" />
                <span>Curated Learning Resources & Documentation</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {module.resources.map((res, i) => (
                  <ResourceCard key={i} resource={res} />
                ))}
              </div>
            </div>
          )}

          {/* Hands-On Practical Project */}
          {module.practicalProject && module.practicalProject.title && (
            <div
              style={{
                padding: '1.15rem 1.35rem',
                backgroundColor: 'var(--primary-50)',
                border: '1px solid var(--primary-200)',
                borderRadius: 'var(--radius-md)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: 'var(--primary-900)',
                  marginBottom: '0.35rem'
                }}
              >
                <Sparkles size={16} color="var(--primary-600)" />
                <span>Weekly Portfolio Project: {module.practicalProject.title}</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--primary-800)', lineHeight: 1.55 }}>
                {module.practicalProject.description}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
