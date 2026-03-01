import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { REPORT_CONFIG, BADGE_COLORS } from './reportData';
import ExportToolbar from './ExportToolbar';
import './Reports.css';

/* ── small helpers ───────────────────────────────────────── */
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
const sections = ['A', 'B', 'C'];

const Badge = ({ val }) => {
    if (!val) return <span>—</span>;
    const color = BADGE_COLORS[val] ?? 'grey';
    return <span className={`rpt-badge rpt-badge-${color}`}>{val}</span>;
};

const BarCell = ({ val }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div className="rpt-bar-wrap" style={{ flex: 1 }}>
            <div className="rpt-bar-fill" style={{
                width: `${val}%`,
                background: val >= 90 ? '#28c76f' : val >= 70 ? '#ff9f43' : '#ea5455'
            }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: 12 }}>{val}%</span>
    </div>
);

/* ── main component ──────────────────────────────────────── */
const ReportPlaceholder = () => {
    const { reportType } = useParams();
    const config = REPORT_CONFIG[reportType];

    /* ── unknown route ── */
    if (!config) {
        return (
            <div className="rpt-report-page">
                <div className="rpt-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ fontSize: 56 }}>📊</div>
                    <h3 style={{ color: '#333448', marginTop: 12 }}>Report Not Found</h3>
                    <p style={{ color: '#6e6b7b' }}>No report configured for <code>{reportType}</code>.</p>
                    <Link to="/school/reports" className="rpt-search-btn" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 16 }}>
                        ← Back to Reports
                    </Link>
                </div>
            </div>
        );
    }

    const { title, icon, columns, rows, rowKeys, badgeKey, filters } = config;

    /* ── state ── */
    const [filterClass, setFilterClass] = useState('');
    const [filterSection, setFilterSection] = useState('');
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const PER_PAGE = 10;

    /* ── filtered rows ── */
    const filtered = useMemo(() => rows.filter(r => {
        const clsMatch = !filterClass || String(r.class || '').startsWith(filterClass);
        const secMatch = !filterSection || String(r.section || r.class || '').includes(filterSection);
        const srchMatch = !searchText || Object.values(r).some(v =>
            String(v).toLowerCase().includes(searchText.toLowerCase())
        );
        return clsMatch && secMatch && srchMatch;
    }), [rows, filterClass, filterSection, searchText]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const handleSearch = () => setPage(1);

    /* ── KPI summary ── */
    const kpiTotal = filtered.length;
    const kpiPaid = filtered.filter(r => (r.status || r.payment || '') === 'Paid' || r.status === 'Active' || r.status === 'Success' || r.status === 'Approved' || r.status === 'Issued').length;
    const kpiPending = filtered.filter(r => (r.status || '') === 'Pending').length;
    const kpiAlert = filtered.filter(r => ['Overdue', 'Fail', 'Rejected', 'Failed', 'Error'].includes(r.status || '')).length;

    return (
        <div className="rpt-report-page">
            {/* ── header ── */}
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">{icon} {title}</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link> /&nbsp;
                        <Link to="/school/reports">Reports &amp; Analytics</Link> /&nbsp;
                        <span className="rpt-breadcrumb-current">{title}</span>
                    </nav>
                </div>
                <ExportToolbar columns={columns} rows={filtered} rowKeys={rowKeys} title={title} />
            </div>

            {/* ── KPIs ── */}
            <div className="rpt-kpi-row">
                <div className="rpt-kpi-card">
                    <div className="rpt-kpi-icon" style={{ background: '#eef1fd', color: '#3d5ee1' }}>📋</div>
                    <div className="rpt-kpi-info">
                        <p className="rpt-kpi-label">Total Records</p>
                        <h3 className="rpt-kpi-value">{kpiTotal}</h3>
                    </div>
                </div>
                {kpiPaid > 0 && (
                    <div className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: '#e8faf1', color: '#28c76f' }}>✅</div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">Active / Paid</p>
                            <h3 className="rpt-kpi-value">{kpiPaid}</h3>
                        </div>
                    </div>
                )}
                {kpiPending > 0 && (
                    <div className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: '#fff5e6', color: '#ff9f43' }}>⏳</div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">Pending</p>
                            <h3 className="rpt-kpi-value">{kpiPending}</h3>
                        </div>
                    </div>
                )}
                {kpiAlert > 0 && (
                    <div className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: '#fce8e8', color: '#ea5455' }}>⚠️</div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">Alerts</p>
                            <h3 className="rpt-kpi-value">{kpiAlert}</h3>
                        </div>
                    </div>
                )}
            </div>

            {/* ── filters ── */}
            <div className="rpt-filter-card">
                <h6 className="rpt-filter-title">🔍 Filter &amp; Search</h6>
                <div className="rpt-filter-grid">
                    {filters.includes('class') && (
                        <div className="rpt-filter-group">
                            <label>Class</label>
                            <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setPage(1); }}>
                                <option value="">All Classes</option>
                                {classes.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    )}
                    {filters.includes('section') && (
                        <div className="rpt-filter-group">
                            <label>Section</label>
                            <select value={filterSection} onChange={e => { setFilterSection(e.target.value); setPage(1); }}>
                                <option value="">All Sections</option>
                                {sections.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}
                    <div className="rpt-filter-group">
                        <label>Date From</label>
                        <input type="date" defaultValue="2025-01-01" />
                    </div>
                    <div className="rpt-filter-group">
                        <label>Date To</label>
                        <input type="date" defaultValue="2025-02-28" />
                    </div>
                    <div className="rpt-filter-group">
                        <label>Search</label>
                        <input
                            type="text"
                            placeholder="Search any field..."
                            value={searchText}
                            onChange={e => setSearchText(e.target.value)}
                            style={{ padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: 8, fontSize: 13 }}
                        />
                    </div>
                    <div className="rpt-filter-group" style={{ alignSelf: 'flex-end' }}>
                        <button className="rpt-search-btn" onClick={handleSearch}>🔍 Generate Report</button>
                    </div>
                </div>
            </div>

            {/* ── data table ── */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">
                        {title} &nbsp;
                        <span style={{ fontSize: 13, fontWeight: 400, color: '#6e6b7b' }}>({filtered.length} records)</span>
                    </h5>
                    <ExportToolbar columns={columns} rows={filtered} rowKeys={rowKeys} title={title} />
                </div>

                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                {columns.map(col => <th key={col}>{col}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {paginated.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                                        No records found for the selected filters.
                                    </td>
                                </tr>
                            ) : paginated.map((row, ri) => (
                                <tr key={ri}>
                                    {rowKeys.map(key => {
                                        const val = row[key];
                                        // Special renders
                                        if (key === badgeKey) {
                                            return <td key={key}><Badge val={String(val)} /></td>;
                                        }
                                        if ((key === 'pct' || key === 'percentage') && typeof val === 'number') {
                                            return <td key={key}><BarCell val={val} /></td>;
                                        }
                                        if (key === 'debit' && val !== '—') {
                                            return <td key={key} style={{ color: '#ea5455', fontWeight: 600 }}>{val}</td>;
                                        }
                                        if (key === 'credit' && val !== '—') {
                                            return <td key={key} style={{ color: '#28c76f', fontWeight: 600 }}>{val}</td>;
                                        }
                                        if (key === 'due' || key === 'bal' || key === 'fine' || key === 'amount') {
                                            const n = Number(String(val).replace(/[^0-9]/g, ''));
                                            if (!isNaN(n) && n > 0) {
                                                return <td key={key} style={{ color: '#ea5455', fontWeight: 600 }}>
                                                    {typeof val === 'number' ? `₹${val.toLocaleString()}` : val}
                                                </td>;
                                            }
                                        }
                                        if (key === 'rank') {
                                            return <td key={key}>
                                                <span style={{
                                                    background: val === 1 ? '#ffd700' : val === 2 ? '#c0c0c0' : val === 3 ? '#cd7f32' : '#f0f0f0',
                                                    color: val <= 3 ? '#333' : '#555',
                                                    padding: '2px 10px', borderRadius: 20, fontWeight: 700, fontSize: 13
                                                }}>#{val}</span>
                                            </td>;
                                        }
                                        if (key === 'sno') {
                                            return <td key={key} style={{ color: '#999' }}>{val}</td>;
                                        }
                                        if (key === 'admNo' || key === 'empId' || key === 'id' || key === 'txnId' || key === 'voucher') {
                                            return <td key={key}><strong style={{ color: '#3d5ee1' }}>{val}</strong></td>;
                                        }
                                        return <td key={key}>{val ?? '—'}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* pagination */}
                <div className="rpt-table-footer">
                    <span style={{ color: '#6e6b7b', fontSize: 13 }}>
                        Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
                    </span>
                    <div className="rpt-pagination">
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                            .reduce((acc, n, i, arr) => {
                                if (i > 0 && n - arr[i - 1] > 1) acc.push('...');
                                acc.push(n);
                                return acc;
                            }, [])
                            .map((n, i) => n === '...'
                                ? <span key={i} style={{ padding: '0 4px', color: '#999' }}>…</span>
                                : <button key={n} className={`rpt-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                            )
                        }
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportPlaceholder;
