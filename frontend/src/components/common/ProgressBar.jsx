import React from 'react';

export const ProgressBar = ({
  value = 0,
  max = 100,
  label = '',
  height = '10px',
  color = 'var(--primary-600)',
  showPercentage = true
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  return (
    <div style={{ width: '100%' }}>
      {(label || showPercentage) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.35rem',
            fontSize: '0.8125rem'
          }}
        >
          {label && <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>{label}</span>}
          {showPercentage && (
            <span style={{ fontWeight: 700, color: 'var(--navy-950)', marginLeft: 'auto' }}>
              {percentage}%
            </span>
          )}
        </div>
      )}

      <div
        style={{
          width: '100%',
          height,
          backgroundColor: 'var(--slate-200)',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: color,
            backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0.15), rgba(255,255,255,0))',
            borderRadius: '9999px',
            transition: 'width 0.4s ease-in-out'
          }}
        />
      </div>
    </div>
  );
};
