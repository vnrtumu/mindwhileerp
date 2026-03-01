import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import {
    monthlySalesData, vendorWiseData, paymentMethodData,
    sales, vendors, inventory, returns
} from './bookSalesData';
import './BookSales.css';

const today = new Date().toISOString().split('T')[0];

// Student-wise report (aggregated from sales)
const studentWise = Object.values(
    sales.reduce((acc, s) => {
        if (!acc[s.student]) acc[s.student] = { student: s.student, class: s.class, books: 0, amount: 0 };
        acc[s.student].books += Number(s.qty);
        acc[s.student].amount += Number(s.price) * Number(s.qty);
        return acc;
    }, {})
);

// Book-wise report
const bookWise = inventory.map(b => ({
    book: b.name, type: b.type, costPrice: b.costPrice, sellingPrice: b.sellingPrice,
    sold: b.qty - b.stock, stock: b.stock,
    revenue: (b.qty - b.stock) * b.sellingPrice,
    profit: (b.qty - b.stock) * (b.sellingPrice - b.costPrice),
}));

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bs-tooltip">
                <p style={{ fontWeight: 600, margin: '0 0 5px', fontSize: 13 }}>{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color, margin: '2px 0', fontSize: 12 }}>
                        {p.name}: <strong>{typeof p.value === 'number' && p.value > 1000 ? `₹${p.value.toLocaleString()}` : p.value}</strong>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

const BookSalesReports = () => {
    const [activeTab, setActiveTab] = useState('student');
    const [dateFrom, setDateFrom] = useState('2026-01-01');
    const [dateTo, setDateTo] = useState(today);
    const [filterVendor, setFilterVendor] = useState('All');
    const [filterBook, setFilterBook] = useState('All');

    const totalRevenue = sales.reduce((a, s) => a + Number(s.price) * Number(s.qty), 0);
    const totalCost = inventory.reduce((a, b) => a + b.costPrice * (b.qty - b.stock), 0);
    const totalProfit = totalRevenue - totalCost;
    const returnRate = ((returns.length / sales.length) * 100).toFixed(1);

    const handleExport = (type) => {
        alert(`Exporting ${type} report... (Demo)`);
    };

    return (
        <div className="bs-page">
            {/* Header */}
            <div className="bs-page-header">
                <div>
                    <h4 className="bs-page-title">📊 Reports & Analytics</h4>
                    <nav className="bs-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link><span>/</span>
                        <Link to="/school/book-sales">Book Sales</Link><span>/</span>
                        <span className="bs-breadcrumb-current">Reports</span>
                    </nav>
                </div>
                <div className="bs-export-wrap">
                    <button className="bs-export-btn" onClick={() => handleExport('PDF')}>📄 PDF</button>
                    <button className="bs-export-btn" onClick={() => handleExport('Excel')}>📊 Excel</button>
                </div>
            </div>

            {/* Filters */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">🔍 Filters</h5>
                </div>
                <div className="bs-card-body">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                        <div className="bs-form-group">
                            <label className="bs-form-label">Date From</label>
                            <input type="date" className="bs-form-input" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
                        </div>
                        <div className="bs-form-group">
                            <label className="bs-form-label">Date To</label>
                            <input type="date" className="bs-form-input" value={dateTo} onChange={e => setDateTo(e.target.value)} />
                        </div>
                        <div className="bs-form-group">
                            <label className="bs-form-label">Vendor</label>
                            <select className="bs-form-select" value={filterVendor} onChange={e => setFilterVendor(e.target.value)}>
                                <option>All</option>
                                {vendors.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                            </select>
                        </div>
                        <div className="bs-form-group">
                            <label className="bs-form-label">Book</label>
                            <select className="bs-form-select" value={filterBook} onChange={e => setFilterBook(e.target.value)}>
                                <option>All</option>
                                {inventory.map(b => <option key={b.id} value={b.name}>{b.name}</option>)}
                            </select>
                        </div>
                        <div className="bs-form-group" style={{ alignSelf: 'flex-end' }}>
                            <button className="bs-btn bs-btn-primary" style={{ width: '100%' }}>Apply Filters</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* KPI Summary Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                    { label: 'Total Books Sold', value: sales.reduce((a, s) => a + Number(s.qty), 0), icon: '📚', color: '#3d5ee1', bg: '#eef1fd', sub: 'All time' },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: '💰', color: '#28c76f', bg: '#e8faf1', sub: 'Gross' },
                    { label: 'Profit', value: `₹${totalProfit.toLocaleString()}`, icon: '📈', color: '#7367f0', bg: '#efedfd', sub: 'Revenue – Cost' },
                    { label: 'Return Rate', value: `${returnRate}%`, icon: '🔁', color: '#ea5455', bg: '#fce8e8', sub: `${returns.length} returns` },
                ].map((card, i) => (
                    <div key={i} className="bs-kpi-card">
                        <div className="bs-kpi-icon" style={{ background: card.bg, color: card.color }}><span>{card.icon}</span></div>
                        <div className="bs-kpi-info">
                            <p className="bs-kpi-label">{card.label}</p>
                            <h3 className="bs-kpi-value">{card.value}</h3>
                            <span className="bs-kpi-sub">{card.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="bs-row bs-row-2">
                {/* Monthly Sales Trend */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">📈 Monthly Sales Trend</h5>
                    </div>
                    <div className="bs-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={monthlySalesData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Line type="monotone" dataKey="sales" name="Sales" stroke="#3d5ee1" strokeWidth={2.5} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#28c76f" strokeWidth={2.5} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Vendor-wise Sales */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">🏢 Vendor-wise Revenue</h5>
                    </div>
                    <div className="bs-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={vendorWiseData} layout="vertical" margin={{ top: 5, right: 30, bottom: 0, left: 60 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <YAxis type="category" dataKey="vendor" tick={{ fontSize: 11 }} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="sales" name="Revenue" fill="#7367f0" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Data Tables */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">📋 Detailed Reports</h5>
                    <div style={{ display: 'flex', gap: 8 }}>
                        {[
                            { key: 'student', label: '👤 Student-wise' },
                            { key: 'vendor', label: '🏢 Vendor-wise' },
                            { key: 'book', label: '📚 Book-wise' },
                        ].map(tab => (
                            <button
                                key={tab.key}
                                className={`bs-btn bs-btn-sm ${activeTab === tab.key ? 'bs-btn-primary' : 'bs-btn-outline'}`}
                                onClick={() => setActiveTab(tab.key)}
                            >{tab.label}</button>
                        ))}
                    </div>
                </div>

                {/* Student-wise */}
                {activeTab === 'student' && (
                    <div className="bs-table-wrap">
                        <table className="bs-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Books Purchased</th>
                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentWise.map((s, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{s.student}</td>
                                        <td><span className="bs-badge bs-badge-blue">{s.class}</span></td>
                                        <td style={{ fontWeight: 600 }}>{s.books}</td>
                                        <td style={{ fontWeight: 700, color: '#28c76f' }}>₹{s.amount.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Vendor-wise */}
                {activeTab === 'vendor' && (
                    <div className="bs-table-wrap">
                        <table className="bs-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Vendor Name</th>
                                    <th>Type</th>
                                    <th>Books Supplied</th>
                                    <th>Total Amount</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((v, i) => (
                                    <tr key={v.id}>
                                        <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{v.name}</td>
                                        <td><span className="bs-badge bs-badge-purple">{v.type}</span></td>
                                        <td style={{ fontWeight: 600 }}>{v.booksSupplied}</td>
                                        <td style={{ fontWeight: 700, color: '#7367f0' }}>₹{Number(v.amount).toLocaleString()}</td>
                                        <td><span className={`bs-badge ${v.status === 'Active' ? 'bs-badge-green' : 'bs-badge-red'}`}>{v.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Book-wise */}
                {activeTab === 'book' && (
                    <div className="bs-table-wrap">
                        <table className="bs-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book Name</th>
                                    <th>Type</th>
                                    <th>Cost Price</th>
                                    <th>Selling Price</th>
                                    <th>Sold</th>
                                    <th>Revenue</th>
                                    <th>Profit</th>
                                    <th>Stock Left</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookWise.map((b, i) => (
                                    <tr key={i}>
                                        <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{b.book}</td>
                                        <td><span className={`bs-badge ${b.type === 'Set' ? 'bs-badge-blue' : 'bs-badge-purple'}`}>{b.type}</span></td>
                                        <td>₹{b.costPrice}</td>
                                        <td>₹{b.sellingPrice}</td>
                                        <td style={{ fontWeight: 600 }}>{b.sold}</td>
                                        <td style={{ fontWeight: 700, color: '#28c76f' }}>₹{b.revenue.toLocaleString()}</td>
                                        <td style={{ fontWeight: 700, color: b.profit > 0 ? '#7367f0' : '#ea5455' }}>₹{b.profit.toLocaleString()}</td>
                                        <td style={{ fontWeight: 700, color: b.stock === 0 ? '#ea5455' : b.stock <= 20 ? '#ff9f43' : '#28c76f' }}>{b.stock}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="bs-table-footer">
                    <span>
                        {activeTab === 'student' && `${studentWise.length} students`}
                        {activeTab === 'vendor' && `${vendors.length} vendors`}
                        {activeTab === 'book' && `${bookWise.length} books`}
                    </span>
                    <div className="bs-export-wrap">
                        <button className="bs-export-btn" onClick={() => handleExport('PDF')}>📄 Export PDF</button>
                        <button className="bs-export-btn" onClick={() => handleExport('Excel')}>📊 Export Excel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookSalesReports;
