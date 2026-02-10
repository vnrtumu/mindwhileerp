import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeeContext } from '../../context/FeeContext';
import './FeeTypes.css';
import HeaderActionButton from '../StudentInformation/components/HeaderActionButton';
import BackButton from '../StudentInformation/components/BackButton';

const FeesMaster = () => {
  const navigate = useNavigate();
  const { feeTypes, feeGroups, setError } = useContext(FeeContext);

  // Clear error when component mounts
  useEffect(() => {
    if (setError) {
      setError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = [
    { label: 'Total Fee Types', value: feeTypes.length, icon: '💰', color: '#3d5ee1' },
    { label: 'Active Fee Types', value: feeTypes.filter(ft => ft.status === 'Active').length, icon: '✅', color: '#22c55e' },
    { label: 'Fee Groups', value: feeGroups.length, icon: '📁', color: '#f59e0b' },
    { label: 'Active Groups', value: feeGroups.filter(fg => fg.status === 'Active').length, icon: '✓', color: '#06b6d4' }
  ];

  const quickActions = [
    { label: 'Fee Types', path: '/school/finance/fee-types', icon: '📋', color: '#3d5ee1' },
    { label: 'Fee Groups', path: '/school/finance/fee-groups', icon: '📂', color: '#f59e0b' },
    { label: 'Assign Fees', path: '/school/finance/assign-fees', icon: '🎯', color: '#ef4444' },
    { label: 'Fees Discount', path: '/school/finance/fees-discount', icon: '🏷️', color: '#8b5cf6' }
  ];

  return (
    <div className="fee-types-page">
      <div className="container">
        {/* Page Header */}
        <div className="page-header">
          <div className="page-title">
            <div className="back-button-wrapper">
              <BackButton title="Go back to Finance" />
              <div>
                <h4>Fees Collection</h4>
                <nav className="breadcrumb">
                  <span>Dashboard</span> / <span>Fees Collection</span> / <span className="current">Fees Master</span>
                </nav>
              </div>
            </div>
          </div>
          <div className="page-header-actions">
            <button className="icon-btn" title="Refresh" onClick={() => window.location.reload()}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
              </svg>
            </button>
            <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="fees-master-stats">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value" style={{ color: stat.color }}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="fees-master-section">
          <div className="section-header">
            <h3>Quick Actions</h3>
            <p>Manage your fee configuration</p>
          </div>
          <div className="quick-actions-grid">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                className="quick-action-card"
                onClick={() => navigate(action.path)}
                style={{ borderLeft: `4px solid ${action.color}` }}
              >
                <div className="action-icon" style={{ backgroundColor: `${action.color}15` }}>
                  {action.icon}
                </div>
                <div className="action-label">{action.label}</div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="action-arrow">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Fee Types Summary */}
        <div className="fees-master-section">
          <div className="section-header">
            <h3>Fee Types Overview</h3>
            <p>{feeTypes.length} fee types configured</p>
          </div>
          {feeTypes.length > 0 ? (
            <div className="summary-table">
              <table>
                <thead>
                  <tr>
                    <th>Fee Type</th>
                    <th>Code</th>
                    <th>Group</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feeTypes.slice(0, 5).map(ft => (
                    <tr key={ft.id}>
                      <td><strong>{ft.name}</strong></td>
                      <td><span className="code-badge">{ft.code}</span></td>
                      <td>{ft.group}</td>
                      <td>
                        <span className={`status-badge status-${ft.status.toLowerCase()}`}>
                          {ft.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {feeTypes.length > 5 && (
                <div className="view-all-link">
                  <button onClick={() => navigate('/school/finance/fee-types')}>
                    View All {feeTypes.length} Fee Types →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state-small">
              <p>No fee types configured yet. <button onClick={() => navigate('/school/finance/fee-types')}>Create one</button></p>
            </div>
          )}
        </div>

        {/* Fee Groups Summary */}
        <div className="fees-master-section">
          <div className="section-header">
            <h3>Fee Groups Overview</h3>
            <p>{feeGroups.length} fee groups configured</p>
          </div>
          {feeGroups.length > 0 ? (
            <div className="summary-table">
              <table>
                <thead>
                  <tr>
                    <th>Group Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {feeGroups.slice(0, 5).map(fg => (
                    <tr key={fg.id}>
                      <td><strong>{fg.name}</strong></td>
                      <td>
                        <span className={`status-badge status-${fg.status.toLowerCase()}`}>
                          {fg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {feeGroups.length > 5 && (
                <div className="view-all-link">
                  <button onClick={() => navigate('/school/finance/fee-groups')}>
                    View All {feeGroups.length} Fee Groups →
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="empty-state-small">
              <p>No fee groups configured yet. <button onClick={() => navigate('/school/finance/fee-groups')}>Create one</button></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeesMaster;
