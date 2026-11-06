import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSkillBridge } from '../context/SkillBridgeContext';
import { User, GraduationCap, Briefcase, Save, CheckCircle2 } from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const { jobRoles, setSelectedRole } = useSkillBridge();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    degree: user?.degree || '',
    graduationYear: user?.graduationYear || 2026,
    bio: user?.bio || '',
    targetRoleTitle: user?.targetRoleTitle || 'Full Stack MERN Developer'
  });

  // Keep form data synchronized if user changes
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        college: user.college || '',
        degree: user.degree || '',
        graduationYear: user.graduationYear || 2026,
        bio: user.bio || '',
        targetRoleTitle: user.targetRoleTitle || 'Full Stack MERN Developer'
      }));
    }
  }, [user]);

  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      await updateProfile(formData);

      // If target role was modified, update SkillBridge context
      const newRole = jobRoles.find(r => r.title === formData.targetRoleTitle);
      if (newRole) {
        setSelectedRole(newRole);
      }

      setStatusMsg({ type: 'success', text: 'Student profile updated successfully!' });
    } catch {
      setStatusMsg({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMsg(null), 3500);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">
              <User size={22} color="var(--primary-600)" />
              <span>Student Academic & Career Profile</span>
            </h1>
            <p className="card-subtitle">
              Manage your academic background, degree details, and target industry trajectory
            </p>
          </div>
        </div>

        {statusMsg && (
          <div
            style={{
              padding: '0.85rem 1.25rem',
              backgroundColor: statusMsg.type === 'success' ? 'var(--success-bg)' : 'var(--danger-bg)',
              color: statusMsg.type === 'success' ? 'var(--success-text)' : 'var(--danger-text)',
              border: `1px solid ${statusMsg.type === 'success' ? 'var(--success-border)' : 'var(--danger-border)'}`,
              borderRadius: 'var(--radius-md)',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <CheckCircle2 size={16} />
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Login & Notifications)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="student@university.edu"
              />
              <span className="form-hint">Used for student authentication and career notifications</span>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">University / College Institution</label>
              <input
                type="text"
                name="college"
                value={formData.college}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Degree / Major</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Graduation Year</label>
              <select
                name="graduationYear"
                value={formData.graduationYear}
                onChange={handleChange}
                className="form-select"
              >
                <option value={2024}>2024 (Recent Graduate)</option>
                <option value={2025}>2025 (Final Year)</option>
                <option value={2026}>2026 (Third Year)</option>
                <option value={2027}>2027 (Second Year)</option>
                <option value={2028}>2028 (First Year)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Target Industry Role Track</label>
              <select
                name="targetRoleTitle"
                value={formData.targetRoleTitle}
                onChange={handleChange}
                className="form-select"
              >
                {jobRoles.map((role) => (
                  <option key={role.title} value={role.title}>
                    {role.title} ({role.category})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Professional Career Summary / Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Briefly state your passion, technical interests, and transition goals..."
            />
          </div>

          {/* Current Verified Skills Snapshot */}
          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-500)', letterSpacing: '0.05em' }}>
              Current Verified Technical Skills ({user?.skills?.length || 0})
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {(user?.skills || []).map((s) => (
                <span key={s.name} className="badge badge-blue">
                  {s.name} ({s.proficiency})
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--slate-200)', paddingTop: '1.25rem' }}>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              <Save size={16} />
              <span>{loading ? 'Saving Profile...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
