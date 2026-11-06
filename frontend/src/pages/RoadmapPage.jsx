import React, { useState } from 'react';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { RoadmapTimeline } from '../components/roadmap/RoadmapTimeline';
import { Sparkles, ArrowLeft, Target } from 'lucide-react';

export const RoadmapPage = ({ setCurrentTab }) => {
  const {
    roadmap,
    toggleRoadmapItem,
    resetRoadmapProgress,
    selectedRole
  } = useSkillBridge();

  const [notification, setNotification] = useState(null);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleToggle = async (topicId) => {
    await toggleRoadmapItem(topicId);
    showNotification('Progress saved! Your profile skill match has dynamically updated.');
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all roadmap completion progress?')) {
      await resetRoadmapProgress();
      showNotification('Roadmap completion progress reset successfully.');
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Quick Breadcrumb / Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.25rem',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}
      >
        {setCurrentTab && (
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="btn btn-secondary btn-sm"
          >
            <ArrowLeft size={14} />
            <span>Back to Dashboard</span>
          </button>
        )}

        {setCurrentTab && (
          <button
            onClick={() => setCurrentTab('gap-analysis')}
            className="btn btn-outline-primary btn-sm"
          >
            <Target size={14} />
            <span>View Skill Gap Matrix</span>
          </button>
        )}
      </div>

      {notification && (
        <div
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success-text)',
            border: '1px solid var(--success-border)',
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
          <span>{notification}</span>
        </div>
      )}

      <RoadmapTimeline
        roadmap={roadmap}
        onToggleComplete={handleToggle}
        onResetRoadmap={handleReset}
        onNavigate={setCurrentTab}
      />
    </div>
  );
};
