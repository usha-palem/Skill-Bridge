import React, { useState, useMemo } from 'react';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { JobRoleCard } from '../components/jobs/JobRoleCard';
import { JobDetailModal } from '../components/jobs/JobDetailModal';
import { Search, Briefcase } from 'lucide-react';

export const JobRolesPage = ({ setCurrentTab }) => {
  const { jobRoles, selectedRole, setSelectedRole } = useSkillBridge();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalRole, setModalRole] = useState(null);

  const categories = [
    'All',
    'Software Engineering',
    'Frontend Engineering',
    'Backend Engineering',
    'Infrastructure & DevOps',
    'Data Science & Analytics',
    'Artificial Intelligence'
  ];

  const filteredRoles = useMemo(() => {
    return (jobRoles || []).filter((role) => {
      const matchCat = selectedCategory === 'All' || role.category === selectedCategory;
      const matchSearch =
        !searchTerm ||
        role.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [jobRoles, selectedCategory, searchTerm]);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
  };

  const handleAnalyzeGap = (role) => {
    setSelectedRole(role);
    setCurrentTab('gap-analysis');
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-950)' }}>
          Industry Job Roles & Requirements Catalog
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--slate-600)', marginTop: '0.25rem' }}>
          Explore entry-level tech roles with validated industry skill requirements, salary brackets, and market demand
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
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
            placeholder="Search job roles by title, keywords, or domain..."
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        {/* Categories */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
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
      </div>

      {/* Roles Grid */}
      <div className="grid-3">
        {filteredRoles.map((role) => (
          <JobRoleCard
            key={role.title}
            role={role}
            isSelected={selectedRole?.title === role.title}
            onSelectRole={handleSelectRole}
            onViewDetails={(r) => setModalRole(r)}
            onAnalyzeGap={handleAnalyzeGap}
          />
        ))}
      </div>

      {/* Modal for Job Specs */}
      <JobDetailModal
        isOpen={Boolean(modalRole)}
        onClose={() => setModalRole(null)}
        role={modalRole}
        isSelected={selectedRole?.title === modalRole?.title}
        onSetAsTarget={handleSelectRole}
        onAnalyzeGap={handleAnalyzeGap}
      />
    </div>
  );
};
