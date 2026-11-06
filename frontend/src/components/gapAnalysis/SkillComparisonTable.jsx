import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Plus, ArrowUpCircle } from 'lucide-react';

export const SkillComparisonTable = ({
  gapAnalysis,
  onQuickAddSkill,
  onQuickUpgradeSkill
}) => {
  const matchedRequired = gapAnalysis?.matchedRequired || [];
  const missingRequired = gapAnalysis?.missingRequired || [];
  const missingRecommended = gapAnalysis?.missingRecommended || [];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h3 className="card-title">
            <span>Detailed Skill-by-Skill Gap Analysis</span>
          </h3>
          <p className="card-subtitle">
            Side-by-side matrix contrasting your verified skills against industry role criteria
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Target Level</th>
              <th>Your Level</th>
              <th>Match Status</th>
              <th>Action Needed</th>
              <th style={{ textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* 1. Matched Skills */}
            {matchedRequired.map((item, idx) => {
              const isAdequate = item.isProficiencyAdequate;
              return (
                <tr key={`matched-${idx}`}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--navy-950)' }}>
                      {item.skillName}
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-navy">{item.category}</span>
                  </td>
                  <td>
                    <span className="badge badge-blue">{item.requiredProficiency}</span>
                  </td>
                  <td>
                    <span className={`badge ${isAdequate ? 'badge-green' : 'badge-amber'}`}>
                      {item.studentProficiency}
                    </span>
                  </td>
                  <td>
                    {isAdequate ? (
                      <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <CheckCircle2 size={12} /> Full Match
                      </span>
                    ) : (
                      <span className="badge badge-amber" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertTriangle size={12} /> Level Gap
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: isAdequate ? 'var(--success-text)' : 'var(--warning-text)', fontWeight: 600 }}>
                      {isAdequate ? 'Benchmark met' : `Upgrade to ${item.requiredProficiency}`}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {!isAdequate ? (
                      <button
                        onClick={() => onQuickUpgradeSkill(item.skillName, item.category, item.requiredProficiency)}
                        className="btn btn-outline-primary btn-sm"
                        style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                      >
                        <ArrowUpCircle size={12} />
                        <span>Upgrade</span>
                      </button>
                    ) : (
                      <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 600 }}>
                        Ready ✓
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}

            {/* 2. Missing Required Skills */}
            {missingRequired.map((item, idx) => (
              <tr key={`missing-${idx}`} style={{ backgroundColor: '#fffdfc' }}>
                <td>
                  <div style={{ fontWeight: 700, color: 'var(--danger-text)' }}>
                    {item.skillName}
                  </div>
                </td>
                <td>
                  <span className="badge badge-navy">{item.category}</span>
                </td>
                <td>
                  <span className="badge badge-blue">{item.requiredProficiency}</span>
                </td>
                <td>
                  <span className="badge badge-red">Not in Profile</span>
                </td>
                <td>
                  <span className="badge badge-red" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={12} /> Critical Missing
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--danger-text)', fontWeight: 600 }}>
                    Study via Roadmap
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => onQuickAddSkill(item.skillName, item.category, item.requiredProficiency)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                    title="If you already know this, add it to your profile"
                  >
                    <Plus size={12} />
                    <span>I Know This</span>
                  </button>
                </td>
              </tr>
            ))}

            {/* 3. Missing Recommended Skills */}
            {missingRecommended.slice(0, 3).map((item, idx) => (
              <tr key={`rec-${idx}`} style={{ opacity: 0.9 }}>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--slate-700)' }}>
                    {item.skillName}
                  </div>
                </td>
                <td>
                  <span className="badge badge-navy">{item.category}</span>
                </td>
                <td>
                  <span className="badge badge-navy">Recommended</span>
                </td>
                <td>
                  <span className="badge badge-navy">Not in Profile</span>
                </td>
                <td>
                  <span className="badge badge-blue">Elective / Bonus</span>
                </td>
                <td>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    Competitive Advantage
                  </span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    onClick={() => onQuickAddSkill(item.skillName, item.category, 'Beginner')}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
                  >
                    <Plus size={12} />
                    <span>Add</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
