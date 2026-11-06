import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Award } from 'lucide-react';

export const SkillSelector = ({ allSkills, userSkills, onAddSkill }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProficiency, setSelectedProficiency] = useState('Intermediate');

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Cloud & DevOps',
    'Programming Languages',
    'System Architecture',
    'AI & Data Science',
    'Security & Testing'
  ];

  // Lookup map of skills already owned by student
  const ownedSkillMap = useMemo(() => {
    const map = new Map();
    (userSkills || []).forEach(s => {
      const name = s?.name || s?.skillName;
      if (name && typeof name === 'string') {
        map.set(name.toLowerCase().trim(), s.proficiency || 'Intermediate');
      }
    });
    return map;
  }, [userSkills]);

  // Filter skills
  const filteredSkills = useMemo(() => {
    return (allSkills || []).filter(skill => {
      if (!skill) return false;
      const name = skill.name || skill.skillName || skill.title || '';
      if (!name) return false;
      const cat = skill.category || '';
      const matchCat = selectedCategory === 'All' || cat.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch = !searchTerm || name.toLowerCase().includes(searchTerm.toLowerCase().trim());
      return matchCat && matchSearch;
    });
  }, [allSkills, selectedCategory, searchTerm]);

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <Plus size={20} color="var(--primary-600)" />
            <span>Select & Add Technical Skills</span>
          </h3>
          <p className="card-subtitle">
            Search from over 40+ industry skills and tag your current competency level
          </p>
        </div>

        {/* Global Proficiency Preset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Default Level:
          </span>
          <select
            value={selectedProficiency}
            onChange={(e) => setSelectedProficiency(e.target.value)}
            className="form-select"
            style={{ width: 'auto', padding: '0.35rem 0.65rem', fontSize: '0.8125rem' }}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '1rem' }}>
        <Search
          size={18}
          color="var(--slate-400)"
          style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search skills by name (e.g., React, Docker, Python, SQL, AWS)..."
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Category Pills */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '1.25rem'
        }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`badge ${isActive ? 'badge-blue' : 'badge-navy'}`}
              style={{
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                border: isActive ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
                backgroundColor: isActive ? 'var(--primary-600)' : 'var(--white)',
                color: isActive ? 'var(--white)' : 'var(--slate-700)',
                transition: 'all 0.15s ease'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '0.75rem',
          maxHeight: '380px',
          overflowY: 'auto',
          paddingRight: '0.25rem'
        }}
      >
        {filteredSkills.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--slate-500)' }}>
            No skills found matching "{searchTerm}" in this category.
          </div>
        ) : (
          filteredSkills.map((skill, index) => {
            const skillName = skill.name || skill.skillName || skill.title || `Skill-${index}`;
            const skillCategory = skill.category || 'General';
            const lookupKey = skillName.toLowerCase().trim();
            const isOwned = ownedSkillMap.has(lookupKey);
            const currentProf = ownedSkillMap.get(lookupKey);

            return (
              <div
                key={skill._id || `${skillName}-${index}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  border: isOwned ? '1px solid var(--primary-300)' : '1px solid var(--slate-200)',
                  backgroundColor: isOwned ? 'var(--primary-50)' : 'var(--white)',
                  transition: 'all 0.15s ease'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy-950)' }}>
                    {skillName}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--slate-500)', marginTop: '0.15rem' }}>
                    {skillCategory}
                  </div>
                </div>

                <div>
                  {isOwned ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                        <Check size={11} /> {currentProf}
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddSkill(skillName, skillCategory, selectedProficiency)}
                      className="btn btn-outline-primary btn-sm"
                      style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                    >
                      <Plus size={13} />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
