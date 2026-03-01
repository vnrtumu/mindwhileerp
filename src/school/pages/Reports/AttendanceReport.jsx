import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import ExportToolbar from './ExportToolbar';
import './Reports.css';

const ATT_COLUMNS = ['#', 'Class', 'Section', 'Total', 'Present', 'Absent', 'Late', 'Attendance %'];
const ATT_KEYS = ['sno', 'class', 'section', 'total', 'present', 'absent', 'late', 'pct'];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const classes = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const generateAttendance = () =>
    classes.flatMap((cls, ci) =>
        ['A', 'B'].map((sec, si) => ({
            class: cls, section: sec,
            total: 45 + ci,
            present: 38 + ci - si,
            absent: 7 - ci % 3,
            late: 2 + si,
            pct: Math.round((38 + ci - si) / (45 + ci) * 100),
        }))
    );

const attendanceRecords = generateAttendance();

const weeklyData = days.map(d => ({
    day: d,
    present: 1000 + Math.floor(Math.random() * 200),
    absent: 100 + Math.floor(Math.random() * 80),
    late: 30 + Math.floor(Math.random() * 40),
}));

const AttendanceReport = () => {
    const [filterClass, setFilterClass] = useState('');
    const [page, setPage] = useState(1);
    const perPage = 8;
    const filtered = attendanceRecords.filter(r => !filterClass || r.class === filterClass);
    const totalPages = Math.ceil(filtered.length / perPage);
    const paged = filtered.slice((page - 1) * perPage, page * perPage);

    return (
        <div className="rpt-report-page">
            <div className="rpt-page-header">
                <div>
                    <h4 className="rpt-page-title">Attendance Report</h4>
                    <nav className="rpt-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link> /&nbsp;
                        <Link to="/school/reports">Reports</Link> /&nbsp;
                        <span className="rpt-breadcrumb-current">Attendance Report</span>
                    </nav>
                </div>
            </div>

            {/* KPIs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
                {[
                    { label: 'Avg Attendance', val: '92.4%', color: '#28c76f', bg: '#e8faf1', icon: '✅' },
                    { label: 'Total Present Today', val: '1,180', color: '#3d5ee1', bg: '#eef1fd', icon: '🟢' },
                    { label: 'Total Absent Today', val: '68', color: '#ea5455', bg: '#fce8e8', icon: '🔴' },
                    { label: 'Late Arrivals', val: '32', color: '#ff9f43', bg: '#fff5e6', icon: '🕐' },
                ].map((k, i) => (
                    <div key={i} className="rpt-kpi-card">
                        <div className="rpt-kpi-icon" style={{ background: k.bg, color: k.color }}>{k.icon}</div>
                        <div className="rpt-kpi-info">
                            <p className="rpt-kpi-label">{k.label}</p>
                            <h3 className="rpt-kpi-value">{k.val}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="rpt-card">
                <div className="rpt-card-header">
                    <h5 className="rpt-card-title">Weekly Attendance Breakdown</h5>
                </div>
                <div className="rpt-chart-body">
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={weeklyData} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6e6b7b' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6e6b7b' }} />
                            <Tooltip contentStyle={{ borderRadius: 10, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,.1)' }} />
                            <Legend iconType="circle" iconSize={8} />
                            <Bar dataKey="present" name="Present" fill="#28c76f" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="absent" name="Absent" fill="#ea5455" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="late" name="Late" fill="#ff9f43" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Filter */}
            <div className="rpt-filter-card">
                <div className="rpt-filter-grid">
                    <div className="rpt-filter-group">
                        <label>Class</label>
                        <select value={filterClass} onChange={e => { setFilterClass(e.target.value); setPage(1); }}>
                            <option value="">All</option>
                            {classes.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="rpt-filter-group">
                        <label>Date</label>
                        <input type="date" defaultValue="2025-02-19" />
                    </div>
                    <div className="rpt-filter-group" style={{ alignSelf: 'flex-end' }}>
                        <button className="rpt-search-btn">🔍 Search</button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rpt-table-card">
                <div className="rpt-table-header">
                    <h5 className="rpt-table-title">Class-wise Attendance ({filtered.length})</h5>
                    <ExportToolbar columns={ATT_COLUMNS} rows={filtered} rowKeys={ATT_KEYS} title="Attendance-Report" />
                </div>
                <div className="rpt-table-wrap">
                    <table className="rpt-table">
                        <thead>
                            <tr>
                                <th>#</th><th>Class</th><th>Section</th><th>Total</th>
                                <th>Present</th><th>Absent</th><th>Late</th><th>Attendance %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paged.map((r, i) => (
                                <tr key={i}>
                                    <td>{(page - 1) * perPage + i + 1}</td>
                                    <td><strong>{r.class}</strong></td>
                                    <td>{r.section}</td>
                                    <td>{r.total}</td>
                                    <td style={{ color: '#28c76f', fontWeight: 600 }}>{r.present}</td>
                                    <td style={{ color: '#ea5455', fontWeight: 600 }}>{r.absent}</td>
                                    <td style={{ color: '#ff9f43', fontWeight: 600 }}>{r.late}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <div className="rpt-bar-wrap" style={{ flex: 1 }}>
                                                <div className="rpt-bar-fill" style={{ width: r.pct + '%', background: r.pct >= 90 ? '#28c76f' : r.pct >= 75 ? '#ff9f43' : '#ea5455' }}></div>
                                            </div>
                                            <span style={{ fontWeight: 600, fontSize: 13, color: '#333' }}>{r.pct}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="rpt-table-footer">
                    <span>Showing {Math.min((page - 1) * perPage + 1, filtered.length)}–{Math.min(page * perPage, filtered.length)} of {filtered.length}</span>
                    <div className="rpt-pagination">
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                            <button key={n} className={`rpt-page-btn ${page === n ? 'active' : ''}`} onClick={() => setPage(n)}>{n}</button>
                        ))}
                        <button className="rpt-page-btn" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceReport;
