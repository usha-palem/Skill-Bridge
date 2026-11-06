import React from 'react';
import { Compass, GraduationCap, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--white)',
        borderTop: '1px solid var(--slate-200)',
        padding: '2.5rem 1.5rem',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              backgroundColor: 'var(--primary-600)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Compass size={16} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy-950)' }}>
              SkillBridge Platform
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
              Transforming Academic Curriculums into Industry Job Readiness
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8125rem', color: 'var(--slate-600)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <GraduationCap size={15} color="var(--primary-600)" />
            <span>Curriculum Mapped</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <ShieldCheck size={15} color="var(--success-main)" />
            <span>Industry Benchmark Standards</span>
          </div>
        </div>

        <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
          © 2026 SkillBridge. MERN Stack Platform.
        </div>
      </div>
    </footer>
  );
};
