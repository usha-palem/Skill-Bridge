import React from 'react';
import { Award, Trash2, CheckCircle2 } from 'lucide-react';

export const SkillList = ({ userSkills, onUpdateProficiency, onRemoveSkill }) => {
  const skills = Array.isArray(userSkills) ? userSkills : [];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <CheckCircle2 size={20} color="var(--success-main)" />
            <span>My Verified Skill Portfolio</span>
          </h3>
          <p className="card-subtitle">
            {skills.length} skills currently saved to your student profile
          </p>
        </div>
      </div>

      {skills.length === 0 ? (
        <div
          style={{
            padding: '3rem 1.5rem',
            textAlign: 'center',
            backgroundColor: 'var(--slate-50)',
            borderRadius: 'var(--radius-md)',
            border: '1px dashed var(--slate-300)'
          }}
        >
          <Award size={40} color="var(--slate-400)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h4 style={{ fontWeight: 700, color: 'var(--navy-950)' }}>
            No Skills Added Yet
          </h4>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
            Use the Skill Selector on the left to add skills you have learned in coursework or personal projects.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '420px', overflowY: 'auto' }}>
          {skills.map((skill, index) => {
            const skillName = skill?.name || skill?.skillName || `Skill-${index}`;
            const skillCategory = skill?.category || 'General';
            const proficiency = skill?.proficiency || 'Beginner';

            return (
              <div
                key={skill._id || `${skillName}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--slate-200)',
                  backgroundColor: 'var(--white)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.925rem', color: 'var(--navy-950)' }}>
                    {skillName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>
                    {skillCategory}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <select
                    value={proficiency}
                    onChange={(e) => onUpdateProficiency(skillName, skillCategory, e.target.value)}
                    className="form-select"
                    style={{
                      width: 'auto',
                      padding: '0.35rem 0.65rem',
                      fontSize: '0.8125rem',
                      fontWeight: 600
                    }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>

                  <button
                    onClick={() => onRemoveSkill(skillName)}
                    className="btn btn-danger btn-sm"
                    style={{ padding: '0.35rem 0.65rem' }}
                    title="Remove skill"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
