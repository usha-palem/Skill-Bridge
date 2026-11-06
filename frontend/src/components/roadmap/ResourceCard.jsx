import React from 'react';
import { ExternalLink, BookOpen, Video, Code, FileText } from 'lucide-react';

export const ResourceCard = ({ resource }) => {
  const getIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video course':
        return <Video size={16} color="var(--danger-main)" />;
      case 'interactive tutorial':
      case 'interactive course':
        return <Code size={16} color="var(--primary-600)" />;
      case 'documentation':
        return <BookOpen size={16} color="var(--primary-700)" />;
      default:
        return <FileText size={16} color="var(--slate-600)" />;
    }
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--white)',
        border: '1px solid var(--slate-200)',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        transition: 'all 0.15s ease',
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.03)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--primary-300)';
        e.currentTarget.style.backgroundColor = 'var(--primary-50)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--slate-200)';
        e.currentTarget.style.backgroundColor = 'var(--white)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '6px',
            backgroundColor: 'var(--slate-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}
        >
          {getIcon(resource.type)}
        </div>

        <div>
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--navy-950)' }}>
            {resource.title}
          </div>
          <div style={{ fontSize: '0.725rem', color: 'var(--slate-500)', display: 'flex', gap: '0.5rem', marginTop: '0.15rem' }}>
            <span>{resource.platform || 'Online Resource'}</span>
            <span>•</span>
            <span>{resource.type || 'Tutorial'}</span>
            {resource.duration && (
              <>
                <span>•</span>
                <span>{resource.duration}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <ExternalLink size={15} color="var(--primary-600)" style={{ flexShrink: 0 }} />
    </a>
  );
};
