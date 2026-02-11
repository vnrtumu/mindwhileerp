import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FeeContext } from '../../../context/FeeContext';
import './FeeTypes.css';
import HeaderActionButton from '../StudentInformation/components/HeaderActionButton';
import BackButton from '../StudentInformation/components/BackButton';
import { EyeIcon, EditIcon, DeleteIcon } from '../../../components/Icons';

const FeeGroups = () => {
  const navigate = useNavigate();
  const {
    feeGroups,
    loading,
    error,
    addFeeGroup,
    updateFeeGroup,
    deleteFeeGroup,
    updateFeeGroupStatus,
    setError
  } = useContext(FeeContext);

  // State management
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('A-Z');
  const [selectedColumns] = useState({
    id: true,
    name: true,
    status: true,
    actions: true
  });
  const perPage = 10;

  const [formData, setFormData] = useState({
    name: '',
    status: 'Active'
  });

  const [toast, setToast] = useState('');
  const [toastType, setToastType] = useState('success');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [statusToggleLoading, setStatusToggleLoading] = useState(null);

  // Show toast notification
  const showToast = (msg, type = 'success') => {
    setToastType(type);
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Filter and sort
  const filtered = feeGroups.filter(fg =>
    fg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'A-Z') return a.name.localeCompare(b.name);
    if (sortBy === 'Z-A') return b.name.localeCompare(a.name);
    return 0;
  });

  const paged = sorted.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(sorted.length / perPage);

  // Handle row checkbox
  const handleRowCheckbox = (id) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedRows(newSet);
  };

  // Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(paged.map(fg => fg.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  // Handle modal open/close
  const openModal = () => {
    setFormData({ name: '', status: 'Active' });
    setIsEditMode(false);
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (feeGroup) => {
    setFormData({
      name: feeGroup.name,
      status: feeGroup.status
    });
    setIsEditMode(true);
    setEditingId(feeGroup.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', status: 'Active' });
    setIsEditMode(false);
    setEditingId(null);
  };

  // Handle form submit
  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      if (isEditMode) {
        // Update existing fee group
        await updateFeeGroup(editingId, {
          name: formData.name,
          status: formData.status
        });
        showToast('Fee Group updated successfully', 'success');
      } else {
        // Add new fee group
        await addFeeGroup(formData.name);
        showToast('Fee Group added successfully', 'success');
      }
      closeModal();
      setCurrentPage(1);
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  // Handle view (navigate to details page)
  const handleViewFeeGroup = (id) => {
    navigate(`/school/finance/fee-groups/${id}`);
  };

  // Handle edit
  const handleEditFeeGroup = (feeGroup) => {
    openEditModal(feeGroup);
  };

  // Handle delete with confirmation
  const handleDeleteClick = (feeGroup) => {
    setDeleteConfirm(feeGroup);
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;

    try {
      await deleteFeeGroup(deleteConfirm.id);
      showToast(`Fee Group "${deleteConfirm.name}" deleted successfully`, 'success');
      setDeleteConfirm(null);
      setSelectedRows(prev => {
        const newSet = new Set(prev);
        newSet.delete(deleteConfirm.id);
        return newSet;
      });
    } catch (err) {
      showToast(err.message || 'Failed to delete fee group', 'error');
    }
  };

  // Handle status toggle
  const handleStatusToggle = async (feeGroup) => {
    setStatusToggleLoading(feeGroup.id);

    try {
      const newStatus = feeGroup.status === 'Active' ? 'Inactive' : 'Active';
      await updateFeeGroupStatus(feeGroup.id, newStatus);
      showToast(`Status changed to ${newStatus}`, 'success');
    } catch (err) {
      showToast(err.message || 'Failed to update status', 'error');
    } finally {
      setStatusToggleLoading(null);
    }
  };

  // Export functions
  const handleExportCopy = () => {
    const data = paged.map(fg => `${fg.id}\t${fg.name}`).join('\n');
    navigator.clipboard.writeText(data);
    showToast('Copied to clipboard', 'success');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Fee Group', 'Status'];
    const rows = paged.map(fg => [fg.id, fg.name, fg.status]);
    const csv = [headers, ...rows].map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
    downloadFile(csv, 'fee-groups.csv', 'text/csv');
  };

  const handleExportPDF = () => {
    showToast('PDF export coming soon', 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadFile = (content, filename, type) => {
    const element = document.createElement('a');
    element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Clear error when component mounts
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, []);

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
                  <span>Dashboard</span> / <span>Fees Collection</span> / <span className="current">Fees Group</span>
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
            <div className="export-dropdown">
              <button className="btn btn-outline" title="Export">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Export
              </button>
              <div className="dropdown-menu">
                <button onClick={handleExportCopy}>Copy</button>
                <button onClick={handleExportCSV}>CSV</button>
                <button onClick={handleExportPDF}>Excel</button>
                <button onClick={handlePrint}>Print</button>
              </div>
            </div>
            <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
            <button className="btn btn-primary" onClick={openModal} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Fees Group
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="filter-inputs">
            <div className="date-range-picker">
              <input type="date" placeholder="From" />
              <span className="separator">-</span>
              <input type="date" placeholder="To" />
            </div>
            <button className="btn btn-outline btn-sm">Filter</button>
            <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="A-Z">Sort A-Z</option>
              <option value="Z-A">Sort Z-A</option>
            </select>
          </div>
          <div className="search-bar">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search fee groups..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Empty State or Table */}
        {feeGroups.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-card">
              <div className="empty-state-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"></path>
                  <path d="M9 9h6M9 15h6"></path>
                </svg>
              </div>
              <h3>No fee groups found</h3>
              <p>Click 'Add Fees Group' to create one.</p>
              <button className="btn btn-primary btn-large" onClick={openModal}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Fees Group
              </button>
            </div>
          </div>
        ) : (
          <div className="card soft-card table-card">
            {/* Table Toolbar */}
            <div className="table-toolbar">
              <div className="toolbar-actions">
                <button className="toolbar-btn" title="Copy" onClick={handleExportCopy} disabled={selectedRows.size === 0}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  </svg>
                  Copy
                </button>
                <button className="toolbar-btn" title="CSV" onClick={handleExportCSV} disabled={selectedRows.size === 0}>CSV</button>
                <button className="toolbar-btn" title="Excel" onClick={handleExportCSV} disabled={selectedRows.size === 0}>Excel</button>
                <button className="toolbar-btn" title="PDF" onClick={handleExportPDF} disabled={selectedRows.size === 0}>PDF</button>
                <button className="toolbar-btn" title="Print" onClick={handlePrint}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print
                </button>
              </div>
              <span className="table-stats">{filtered.length} fee groups | {selectedRows.size > 0 && <strong>{selectedRows.size} selected</strong>}</span>
            </div>

            {/* Table */}
            <div className="table-wrap">
              <table className="fee-types-table">
                <thead>
                  <tr>
                    <th className="checkbox-col">
                      <input
                        type="checkbox"
                        checked={paged.length > 0 && paged.every(fg => selectedRows.has(fg.id))}
                        onChange={handleSelectAll}
                      />
                    </th>
                    {selectedColumns.id && <th>ID</th>}
                    {selectedColumns.name && <th>Fee Group</th>}
                    {selectedColumns.status && <th>Status</th>}
                    {selectedColumns.actions && <th className="actions-col">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {paged.map(fg => (
                    <tr key={fg.id} className="hover-row">
                      <td className="checkbox-col">
                        <input
                          type="checkbox"
                          checked={selectedRows.has(fg.id)}
                          onChange={() => handleRowCheckbox(fg.id)}
                        />
                      </td>
                      {selectedColumns.id && <td>{fg.id}</td>}
                      {selectedColumns.name && <td className="name-cell"><strong>{fg.name}</strong></td>}
                      {selectedColumns.status && <td>
                        <button
                          onClick={() => handleStatusToggle(fg)}
                          disabled={statusToggleLoading === fg.id}
                          className={`status-badge status-${fg.status.toLowerCase()} status-clickable`}
                          title="Click to toggle status"
                        >
                          {statusToggleLoading === fg.id ? 'Updating...' : fg.status}
                        </button>
                      </td>}
                      {selectedColumns.actions && <td className="actions-cell">
                        <div className="action-icons">
                          <button
                            className="icon-btn view-btn"
                            title="View"
                            onClick={() => handleViewFeeGroup(fg.id)}
                          >
                            <EyeIcon size={16} />
                          </button>
                          <button
                            className="icon-btn edit-btn"
                            title="Edit"
                            onClick={() => handleEditFeeGroup(fg)}
                          >
                            <EditIcon size={16} />
                          </button>
                          <button
                            className="icon-btn delete-btn"
                            title="Delete"
                            onClick={() => handleDeleteClick(fg)}
                          >
                            <DeleteIcon size={16} />
                          </button>
                        </div>
                      </td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                Showing {paged.length > 0 ? (currentPage - 1) * perPage + 1 : 0} - {Math.min(currentPage * perPage, sorted.length)} of {sorted.length}
              </div>
              <div className="pagination-controls">
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span className="page-indicator">{currentPage} / {totalPages || 1}</span>
                <button
                  className="btn btn-sm btn-outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Fee Group Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{isEditMode ? 'Edit Fee Group' : 'Add New Fee Group'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Fee Group Name *</label>
                <input
                  type="text"
                  placeholder="Enter fee group name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="form-input"
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="toggle-group">
                  <label className="toggle-option">
                    <input
                      type="radio"
                      name="status"
                      value="Active"
                      checked={formData.status === 'Active'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      disabled={loading}
                    />
                    <span>Active</span>
                  </label>
                  <label className="toggle-option">
                    <input
                      type="radio"
                      name="status"
                      value="Inactive"
                      checked={formData.status === 'Inactive'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      disabled={loading}
                    />
                    <span>Inactive</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={closeModal} disabled={loading}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Processing...' : (isEditMode ? 'Update Fee Group' : 'Add Fee Group')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal-content confirmation-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Fee Group</h3>
              <button className="close-btn" onClick={() => setDeleteConfirm(null)}>×</button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)} disabled={loading}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete} disabled={loading} style={{backgroundColor: '#ef4444'}}>
                {loading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toastType}`}>
          {toastType === 'success' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
          {toastType === 'error' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          )}
          {toastType === 'info' && (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
          )}
          {toast}
        </div>
      )}
    </div>
  );
};

export default FeeGroups;
