import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../StudentInformation/components/BackButton';
import './Payroll.css';
import ExportToolbar from '../Reports/ExportToolbar';

const samplePayroll = [
  { id: '1', employeeId: 'EMP001', name: 'Rahul Sharma', department: 'Administration', designation: 'Manager', phone: '9876543210', amount: 45000, status: 'Paid' },
  { id: '2', employeeId: 'EMP002', name: 'Anita Rao', department: 'Teaching', designation: 'Teacher', phone: '9123456780', amount: 30000, status: 'Generated' },
  { id: '3', employeeId: 'EMP003', name: 'Suresh Kumar', department: 'Transport', designation: 'Driver', phone: '9988776655', amount: 15000, status: 'Paid' },
  { id: '4', employeeId: 'EMP004', name: 'Meena Iyer', department: 'Accounts', designation: 'Accountant', phone: '9012345678', amount: 38000, status: 'Generated' }
];

const Payroll = () => {
  const [data] = useState(samplePayroll);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRow, setModalRow] = useState(null);

  const filtered = useMemo(() => {
    let out = [...data];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      out = out.filter(r => r.name.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q) || (r.phone || '').includes(q));
    }
    if (statusFilter !== 'All') {
      out = out.filter(r => r.status === statusFilter);
    }

    out.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      return 0;
    });

    return out;
  }, [data, searchQuery, statusFilter, sortBy]);

  const isAllSelected = filtered.length > 0 && filtered.every(r => selectedIds.has(r.id));

  const handleRowCheckboxChange = (id) => {
    setSelectedIds(prev => {
      const s = new Set(prev);
      if (s.has(id)) s.delete(id); else s.add(id);
      return s;
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filtered.map(r => r.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const getExportData = () => {
    return selectedIds.size > 0 ? filtered.filter(r => selectedIds.has(r.id)) : filtered;
  };

  const navigate = useNavigate();
  const goTo = (path) => () => navigate(path);

  return (
    <div className="payroll-page">
      <div className="container">
        <div className="page-header">
          <div className="page-title">
            <div className="back-button-wrapper">
              <BackButton title="Go back to Human Resource" />
              <div>
                <h4>Payroll</h4>
                <nav className="breadcrumb"><span>Human Resource</span> / <span className="current">Payroll</span></nav>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links removed per UX requirements - only filters + table + exports remain */}

        <div className="card table-card soft-card">
          <div className="filter-bar">
            {/* ... filters ... */}
            <div className="payroll-filters">
              <div className="filter-item search">
                <div className="search-bar">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path></svg>
                  <input className="search-input" placeholder="Search by name, id or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>
              </div>

              <div className="filter-item date">
                <div className="date-range">
                  <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="date-input" aria-label="From date" />
                </div>
              </div>

              <div className="filter-item date">
                <div className="date-range">
                  <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="date-input" aria-label="To date" />
                </div>
              </div>

              <div className="filter-item status">
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="sort-select" aria-label="Status filter">
                  <option value="All">Status: All</option>
                  <option value="Paid">Paid</option>
                  <option value="Generated">Generated</option>
                </select>
              </div>

              <div className="filter-item sort">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select" aria-label="Sort">
                  <option value="name-asc">Sort: Name A–Z</option>
                  <option value="name-desc">Sort: Name Z–A</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-toolbar">
            <div className="table-stats"><strong>{filtered.length}</strong> records {selectedIds.size > 0 && `| ${selectedIds.size} selected`}</div>
            <div className="toolbar-actions">
              <ExportToolbar
                rows={getExportData()}
                columns={['Employee ID', 'Name', 'Department', 'Designation', 'Phone', 'Amount', 'Status']}
                rowKeys={['employeeId', 'name', 'department', 'designation', 'phone', 'amount', 'status']}
                title="Payroll Report"
              />
            </div>
          </div>

          <div className="table-wrap">
            <table className="fee-types-table">
              <thead>
                <tr>
                  <th className="checkbox-col"><input type="checkbox" checked={isAllSelected} onChange={handleSelectAll} title="Select all" /></th>
                  <th>Employee ID</th>
                  <th>Name</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Phone</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th className="actions-col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan="9" style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--ft-text-muted)' }}>No records found</td></tr>
                ) : (
                  filtered.map(row => (
                    <tr key={row.id}>
                      <td><input type="checkbox" checked={selectedIds.has(row.id)} onChange={() => handleRowCheckboxChange(row.id)} /></td>
                      <td>{row.employeeId}</td>
                      <td className="name-cell">{row.name}</td>
                      <td>{row.department}</td>
                      <td>{row.designation}</td>
                      <td>{row.phone}</td>
                      <td><strong>₹ {row.amount.toFixed(2)}</strong></td>
                      <td><span className={`status-badge ${row.status === 'Paid' ? 'status-active' : 'status-generated'}`}>{row.status}</span></td>
                      <td className="actions-cell">
                        <div className="action-icons">
                          <button className="pill-btn view" title="View Payslip" onClick={() => { setModalRow(row); setModalOpen(true); }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            <span>View</span>
                          </button>
                          <button className="pill-btn details" title="View Details" onClick={() => navigate(`/school/payroll/${row.id}`)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                            <span>Details</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {modalOpen && modalRow && (
          <div className="modal-overlay" role="dialog" aria-modal="true">
            <div className="modal-card">
              <header className="modal-header">
                <h4>Payroll — {modalRow.name}</h4>
                <button className="modal-close" onClick={() => setModalOpen(false)}>×</button>
              </header>
              <div className="modal-body">
                <p><strong>Employee ID:</strong> {modalRow.employeeId}</p>
                <p><strong>Phone:</strong> {modalRow.phone}</p>
                <p><strong>Department:</strong> {modalRow.department}</p>
                <p><strong>Designation:</strong> {modalRow.designation}</p>
                <p><strong>Amount:</strong> ₹ {modalRow.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> {modalRow.status}</p>
              </div>
              <footer className="modal-actions">
                <button className="btn btn-primary" onClick={() => setModalOpen(false)}>Close</button>
              </footer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;
