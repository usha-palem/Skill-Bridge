import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Compass,
  LayoutDashboard,
  CheckCircle2,
  Briefcase,
  GitCompare,
  Map,
  User,
  LogOut,
  LogIn
} from 'lucide-react';

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skills', label: 'My Skills', icon: CheckCircle2 },
    { id: 'jobs', label: 'Job Catalog', icon: Briefcase },
    { id: 'gap-analysis', label: 'Gap Analysis', icon: GitCompare },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <nav className="navbar" role="navigation" aria-label="Main Navigation">
      <div className="nav-container">
        {/* Brand Logo */}
        <a
          href="#dashboard"
          className="brand"
          style={{ cursor: 'pointer', textDecoration: 'none' }}
          onClick={(e) => {
            e.preventDefault();
            setCurrentTab('dashboard');
          }}
        >
          <div className="brand-icon">
            <Compass size={22} />
          </div>
          <div>
            <div className="brand-title">SkillBridge</div>
            <div className="brand-subtitle">Academic → Industry Platform</div>
          </div>
        </a>

        {/* Navigation Items */}
        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <a
                key={item.id}
                id={`nav-${item.id}`}
                data-tab={item.id}
                data-testid={`nav-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(item.id);
                }}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* User Auth Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.75rem',
                  backgroundColor: 'var(--primary-50)',
                  border: '1px solid var(--primary-200)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--primary-800)'
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--success-main)'
                  }}
                />
                <span>{user.name}</span>
              </div>

              <button
                onClick={logout}
                className="btn btn-secondary btn-sm"
                title="Log Out"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setCurrentTab('login')}
              className="btn btn-primary btn-sm"
            >
              <LogIn size={14} />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
