import React from 'react';
import { X, Award } from 'lucide-react';

export const SkillBadge = ({
  name,
  proficiency = 'Intermediate',
  onRemove = null,
  showIcon = true,
  size = 'md'
}) => {
  const getProficiencyClass = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case 'beginner':
        return 'badge-beginner';
      case 'intermediate':
        return 'badge-intermediate';
      case 'advanced':
        return 'badge-advanced';
      default:
        return 'badge-blue';
    }
  };

  const isSmall = size === 'sm';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: isSmall ? '0.2rem 0.5rem' : '0.35rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--white)',
        border: '1px solid var(--slate-200)',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.04)',
        fontSize: isSmall ? '0.75rem' : '0.8125rem',
        fontWeight: 600,
        color: 'var(--slate-800)'
      }}
    >
      {showIcon && <Award size={isSmall ? 13 : 15} color="var(--primary-600)" />}
      <span>{name}</span>

      {proficiency && (
        <span
          className={`badge ${getProficiencyClass(proficiency)}`}
          style={{
            fontSize: '0.6875rem',
            padding: '0.1rem 0.45rem',
            marginLeft: '0.15rem'
          }}
        >
          {proficiency}
        </span>
      )}

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(name);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--slate-400)',
            transition: 'color 0.15s ease'
          }}
          title={`Remove ${name}`}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--danger-main)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--slate-400)')}
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
};
