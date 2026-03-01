import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { returns as initialReturns, inventory } from './bookSalesData';
import './BookSales.css';

const today = new Date().toISOString().split('T')[0];
const reasons = ['Damaged pages', 'Wrong edition', 'Duplicate', 'Not needed', 'Wrong class', 'Defective binding', 'Other'];
const emptyForm = { student: '', book: inventory[0]?.name || '', qty: 1, reason: reasons[0], date: today };

const Returns = () => {
    const [returns, setReturns] = useState(initialReturns);
    const [form, setForm] = useState(emptyForm);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filtered = returns.filter(r =>
        (filterStatus === 'All' || r.status === filterStatus) &&
        (r.student.toLowerCase().includes(search.toLowerCase()) || r.book.toLowerCase().includes(search.toLowerCase()))
    );

    const handleSubmit = () => {
        if (!form.student || !form.book) return;
        setReturns(prev => [{ ...form, id: Date.now(), status: 'Pending' }, ...prev]);
        setForm(emptyForm);
        setShowModal(false);
    };

    const updateStatus = (id, status) => {
        setReturns(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    };

    const totalReturns = returns.length;
    const pendingReturns = returns.filter(r => r.status === 'Pending').length;
    const approvedReturns = returns.filter(r => r.status === 'Approved').length;

    return (
        <div className="bs-page">
            {/* Header */}
            <div className="bs-page-header">
                <div>
                    <h4 className="bs-page-title">🔁 Returns Management</h4>
                    <nav className="bs-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link><span>/</span>
                        <Link to="/school/book-sales">Book Sales</Link><span>/</span>
                        <span className="bs-breadcrumb-current">Returns</span>
                    </nav>
                </div>
                <button className="bs-btn bs-btn-warning" onClick={() => setShowModal(true)}>
                    ＋ Add Return
                </button>
            </div>

            {/* Summary Cards */}
            <div className="bs-row" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                {[
                    { label: 'Total Returns', value: totalReturns, icon: '🔁', color: '#3d5ee1', bg: '#eef1fd' },
                    { label: 'Pending Approval', value: pendingReturns, icon: '⏳', color: '#ff9f43', bg: '#fff5e6' },
                    { label: 'Approved Returns', value: approvedReturns, icon: '✅', color: '#28c76f', bg: '#e8faf1' },
                ].map((card, i) => (
                    <div key={i} className="bs-kpi-card">
                        <div className="bs-kpi-icon" style={{ background: card.bg, color: card.color }}><span>{card.icon}</span></div>
                        <div className="bs-kpi-info">
                            <p className="bs-kpi-label">{card.label}</p>
                            <h3 className="bs-kpi-value">{card.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Card */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">Return Records</h5>
                    <div className="bs-filter-bar" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                        <div className="bs-search-wrap" style={{ maxWidth: 220 }}>
                            <span className="bs-search-icon">🔍</span>
                            <input type="text" className="bs-search-input" placeholder="Search..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <select className="bs-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option>All</option>
                            <option>Pending</option>
                            <option>Approved</option>
                            <option>Rejected</option>
                        </select>
                    </div>
                </div>
                <div className="bs-table-wrap">
                    <table className="bs-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Book Name</th>
                                <th>Qty Returned</th>
                                <th>Reason</th>
                                <th>Return Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={8} style={{ textAlign: 'center', padding: 32, color: 'var(--bs-muted)' }}>No returns found.</td></tr>
                            ) : filtered.map((r, i) => (
                                <tr key={r.id}>
                                    <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{r.student}</td>
                                    <td style={{ color: 'var(--bs-muted)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.book}</td>
                                    <td style={{ fontWeight: 700, color: '#ea5455' }}>{r.qty}</td>
                                    <td>
                                        <span className="bs-badge bs-badge-orange">{r.reason}</span>
                                    </td>
                                    <td style={{ color: 'var(--bs-muted)' }}>{r.date}</td>
                                    <td>
                                        <span className={`bs-badge ${r.status === 'Approved' ? 'bs-badge-green' : r.status === 'Rejected' ? 'bs-badge-red' : 'bs-badge-orange'}`}>
                                            {r.status === 'Approved' ? '✅' : r.status === 'Rejected' ? '❌' : '⏳'} {r.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: 6 }}>
                                            {r.status === 'Pending' && (
                                                <>
                                                    <button
                                                        className="bs-btn bs-btn-success bs-btn-sm"
                                                        onClick={() => updateStatus(r.id, 'Approved')}
                                                    >Approve</button>
                                                    <button
                                                        className="bs-btn bs-btn-danger bs-btn-sm"
                                                        onClick={() => updateStatus(r.id, 'Rejected')}
                                                    >Reject</button>
                                                </>
                                            )}
                                            {r.status !== 'Pending' && (
                                                <span style={{ color: 'var(--bs-muted)', fontSize: 12, padding: '4px 8px' }}>No action</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bs-table-footer">
                    <span>Showing {filtered.length} of {returns.length} returns</span>
                    <div className="bs-pagination">
                        <button className="bs-page-btn">‹</button>
                        <button className="bs-page-btn active">1</button>
                        <button className="bs-page-btn">›</button>
                    </div>
                </div>
            </div>

            {/* Add Return Modal */}
            {showModal && (
                <div className="bs-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="bs-modal" onClick={e => e.stopPropagation()}>
                        <div className="bs-modal-header">
                            <h5 className="bs-modal-title">🔁 Add Return</h5>
                            <button className="bs-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="bs-modal-body">
                            <div className="bs-form-grid">
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Student Name *</label>
                                    <input className="bs-form-input" placeholder="e.g. Aarav Sharma"
                                        value={form.student} onChange={e => setForm({ ...form, student: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Book Name *</label>
                                    <select className="bs-form-select" value={form.book} onChange={e => setForm({ ...form, book: e.target.value })}>
                                        {inventory.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                                    </select>
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Quantity Returned</label>
                                    <input className="bs-form-input" type="number" min="1" value={form.qty}
                                        onChange={e => setForm({ ...form, qty: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Return Date</label>
                                    <input className="bs-form-input" type="date" value={form.date}
                                        onChange={e => setForm({ ...form, date: e.target.value })} />
                                </div>
                                <div className="bs-form-group full-width">
                                    <label className="bs-form-label">Reason</label>
                                    <select className="bs-form-select" value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>
                                        {reasons.map(r => <option key={r}>{r}</option>)}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="bs-modal-footer">
                            <button className="bs-btn bs-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="bs-btn bs-btn-warning" onClick={handleSubmit}>✔ Submit Return</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Returns;
