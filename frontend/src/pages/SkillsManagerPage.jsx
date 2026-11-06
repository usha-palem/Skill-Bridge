import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { SkillSelector } from '../components/skills/SkillSelector';
import { SkillList } from '../components/skills/SkillList';
import { CheckCircle2, Sparkles, ArrowRight, Info, Award, Layers } from 'lucide-react';

export const SkillsManagerPage = ({ setCurrentTab }) => {
  const { user, addSkillToProfile, removeSkillFromProfile } = useAuth();
  const { allSkills } = useSkillBridge();
  const [notification, setNotification] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddSkill = async (name, category, proficiency) => {
    await addSkillToProfile(name, category, proficiency);
    showNotification(`Added "${name}" (${proficiency}) to your verified skill portfolio!`);
  };

  const handleUpdateProficiency = async (name, category, newProf) => {
    await addSkillToProfile(name, category, newProf);
    showNotification(`Updated "${name}" level to ${newProf}!`);
  };

  const handleRemoveSkill = async (name) => {
    await removeSkillFromProfile(name);
    showNotification(`Removed "${name}" from your portfolio.`, 'info');
  };

  const verifiedSkillsCount = user?.skills?.length || 0;

  return (
    <div className="animate-fade-in">
      {/* Redesigned Modern Header Banner */}
      <div
        style={{
          position: 'relative',
          background: 'linear-gradient(135deg, #ffffff 0%, #f4f8fe 55%, #e8f2fe 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--primary-200)',
          padding: '1.75rem 2rem',
          boxShadow: '0 4px 16px -2px rgba(37, 99, 235, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
          marginBottom: '1.75rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative glow circle in the corner */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            right: '-30px',
            width: '140px',
            height: '140px',
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(255, 255, 255, 0) 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', maxWidth: '780px' }}>
          {/* Professional Icon Badge */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
              color: 'var(--white)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px 0 rgba(37, 99, 235, 0.28)',
              flexShrink: 0,
              marginTop: '0.2rem'
            }}
          >
            <Award size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.725rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--primary-700)',
                  backgroundColor: 'var(--primary-100)',
                  border: '1px solid var(--primary-200)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                <Layers size={12} />
                Skill Portfolio & Benchmarking
              </span>

              <span
                className="badge badge-green"
                style={{ fontSize: '0.725rem', padding: '0.2rem 0.6rem' }}
              >
                <CheckCircle2 size={12} />
                {verifiedSkillsCount} {verifiedSkillsCount === 1 ? 'Skill' : 'Skills'} Verified
              </span>
            </div>

            <h1
              style={{
                fontSize: '1.85rem',
                fontWeight: 800,
                color: 'var(--navy-950)',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                margin: '0.15rem 0 0.45rem 0'
              }}
            >
              My Skills &amp; Competencies
            </h1>

            <p
              style={{
                fontSize: '0.925rem',
                color: 'var(--slate-600)',
                lineHeight: 1.55,
                margin: 0
              }}
            >
              Build, manage, and showcase your technical skills to bridge the gap between academic learning and industry requirements.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentTab('gap-analysis')}
            className="btn btn-primary"
            style={{
              padding: '0.75rem 1.4rem',
              fontSize: '0.9rem',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
            }}
          >
            <span>Calculate Match with Target Role</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: notification.type === 'info' ? 'var(--slate-800)' : 'var(--success-bg)',
            color: notification.type === 'info' ? 'var(--white)' : 'var(--success-text)',
            border: notification.type === 'info' ? 'none' : '1px solid var(--success-border)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.5rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <Sparkles size={16} />
          <span>{notification.msg}</span>
        </div>
      )}

      {/* Info Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1.25rem',
          backgroundColor: 'var(--primary-50)',
          border: '1px solid var(--primary-200)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
          fontSize: '0.85rem',
          color: 'var(--primary-800)'
        }}
      >
        <Info size={18} color="var(--primary-600)" style={{ flexShrink: 0 }} />
        <div>
          <strong>Pro-Tip:</strong> Set accurate proficiency levels (Beginner, Intermediate, Advanced). Industry job roles evaluate both the presence of a skill and whether your competency meets their minimum benchmark!
        </div>
      </div>

      {/* 2-Column Skills Layout */}
      <div className="grid-2">
        <SkillSelector
          allSkills={allSkills}
          userSkills={user?.skills || []}
          onAddSkill={handleAddSkill}
        />

        <SkillList
          userSkills={user?.skills || []}
          onUpdateProficiency={handleUpdateProficiency}
          onRemoveSkill={handleRemoveSkill}
        />
      </div>
    </div>
  );
};
