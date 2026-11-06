import React, { useState, useMemo } from 'react';
import { RoadmapItem } from './RoadmapItem';
import { ProgressBar } from '../common/ProgressBar';
import { Map, Clock, CheckCircle2, RotateCcw, Award, Calendar, Sparkles } from 'lucide-react';

export const RoadmapTimeline = ({ roadmap, onToggleComplete, onResetRoadmap, onNavigate }) => {
  const [filter, setFilter] = useState('All');

  const modules = roadmap?.modules || [];
  const completedCount = roadmap?.completedModules || 0;
  const totalCount = roadmap?.totalModules || modules.length;
  const completionPercentage = roadmap?.completionPercentage || 0;
  const estimatedHours = roadmap?.totalEstimatedHours || (modules.length * 12);

  const filteredModules = useMemo(() => {
    switch (filter) {
      case 'Completed':
        return modules.filter(m => m.isCompleted);
      case 'In Progress':
        return modules.filter(m => !m.isCompleted);
      case 'High Priority':
        return modules.filter(m => m.priority === 'High');
      default:
        return modules;
    }
  }, [modules, filter]);

  return (
    <div>
      {/* Header Banner */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-blue">Personalized Learning Roadmap</span>
              <span className="badge badge-navy">{roadmap?.jobRoleTitle || 'Full Stack Developer'}</span>
            </div>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--navy-950)' }}>
              Weekly Academic-to-Industry Learning Roadmap
            </h1>
            <p className="card-subtitle">
              Milestone sprints curated directly from your identified skill gaps & industry benchmark standards
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={onResetRoadmap}
              className="btn btn-secondary btn-sm"
              title="Reset All Progress"
            >
              <RotateCcw size={14} />
              <span>Reset Milestones</span>
            </button>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            padding: '1.25rem',
            backgroundColor: 'var(--primary-50)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--primary-200)',
            marginBottom: '1.25rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Calendar size={13} />
              <span>Roadmap Duration</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.2rem' }}>
              {modules.length} Weekly Sprints
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <CheckCircle2 size={13} />
              <span>Milestones Finished</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.2rem' }}>
              {completedCount} of {totalCount}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Clock size={13} />
              <span>Estimated Study Time</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.2rem' }}>
              ~{estimatedHours} Hours
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={13} />
              <span>Readiness Progress</span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-900)', marginTop: '0.2rem' }}>
              {completionPercentage}%
            </div>
          </div>
        </div>

        <ProgressBar
          value={completionPercentage}
          height="10px"
          label="Overall Roadmap Completion Status"
        />
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem',
          borderBottom: '1px solid var(--slate-200)',
          paddingBottom: '0.75rem'
        }}
      >
        {['All', 'In Progress', 'Completed', 'High Priority'].map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
            >
              {f}
              {f === 'All' && ` (${modules.length})`}
              {f === 'In Progress' && ` (${modules.length - completedCount})`}
              {f === 'Completed' && ` (${completedCount})`}
            </button>
          );
        })}
      </div>

      {/* Roadmap Modules List */}
      {filteredModules.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: 'center',
            padding: '3rem 1.5rem',
            backgroundColor: 'var(--slate-50)',
            border: '1px dashed var(--slate-300)'
          }}
        >
          <CheckCircle2 size={44} color="var(--success-main)" style={{ margin: '0 auto 0.75rem auto' }} />
          <h3 style={{ fontWeight: 800, color: 'var(--navy-950)', fontSize: '1.25rem' }}>
            No Modules in this View
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', marginTop: '0.35rem', maxWidth: '480px', margin: '0.35rem auto 1.25rem auto' }}>
            {filter === 'Completed'
              ? 'You have not marked any weekly milestones as complete yet. Start by checking off Week 1 above!'
              : 'All modules in this filter have been addressed. Switch back to "All" to view your full curriculum.'}
          </p>
          {onNavigate && (
            <button
              onClick={() => onNavigate('gap-analysis')}
              className="btn btn-primary btn-sm"
            >
              Recheck Skill Gaps
            </button>
          )}
        </div>
      ) : (
        <div>
          {filteredModules.map((item, idx) => (
            <RoadmapItem
              key={item.topicId}
              module={item}
              index={idx}
              onToggleComplete={onToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};
