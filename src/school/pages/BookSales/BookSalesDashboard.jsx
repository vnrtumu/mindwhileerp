import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, Legend
} from 'recharts';
import { monthlySalesData, stockVsSoldData, paymentMethodData, vendors, inventory, sales, returns } from './bookSalesData';
import './BookSales.css';

const kpiCards = [
    { label: 'Total Vendors', value: '6', icon: '🏢', color: '#3d5ee1', bg: '#eef1fd', sub: '5 Active' },
    { label: 'Total Book Stock', value: '4,570', icon: '📦', color: '#ff9f43', bg: '#fff5e6', sub: '8 Titles' },
    { label: 'Total Books Sold', value: '1,820', icon: '📚', color: '#28c76f', bg: '#e8faf1', sub: 'This Year' },
    { label: 'Total Revenue', value: '₹4,40,000', icon: '💰', color: '#7367f0', bg: '#efedfd', sub: 'This Year' },
    { label: 'Total Returns', value: '5', icon: '🔁', color: '#ea5455', bg: '#fce8e8', sub: '2 Pending' },
];

const quickActions = [
    { label: '➕ Add Vendor', to: '/school/book-sales/vendors', color: '#3d5ee1', bg: '#eef1fd' },
    { label: '📦 Add Stock', to: '/school/book-sales/inventory', color: '#28c76f', bg: '#e8faf1' },
    { label: '🧾 New Sale', to: '/school/book-sales/sales', color: '#ff9f43', bg: '#fff5e6' },
    { label: '📊 View Reports', to: '/school/book-sales/reports', color: '#7367f0', bg: '#efedfd' },
];

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

const BookSalesDashboard = () => {
    const navigate = useNavigate();
    const [period, setPeriod] = useState('This Year');

    return (
        <div className="bs-page">
            {/* Page Header */}
            <div className="bs-page-header">
                <div>
                    <h4 className="bs-page-title">📚 Book Sales Dashboard</h4>
                    <nav className="bs-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link>
                        <span>/</span>
                        <span className="bs-breadcrumb-current">Book Sales</span>
                    </nav>
                </div>
                <div className="bs-header-actions">
                    {['This Week', 'This Month', 'This Year'].map(p => (
                        <button
                            key={p}
                            className={`bs-btn bs-btn-outline bs-btn-sm ${period === p ? 'bs-btn-primary' : ''}`}
                            onClick={() => setPeriod(p)}
                            style={period === p ? { background: '#3d5ee1', color: '#fff', border: 'none' } : {}}
                        >{p}</button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="bs-kpi-grid">
                {kpiCards.map((card, i) => (
                    <div key={i} className="bs-kpi-card">
                        <div className="bs-kpi-icon" style={{ background: card.bg, color: card.color }}>
                            <span>{card.icon}</span>
                        </div>
                        <div className="bs-kpi-info">
                            <p className="bs-kpi-label">{card.label}</p>
                            <h3 className="bs-kpi-value">{card.value}</h3>
                            <span className="bs-kpi-sub">{card.sub}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">⚡ Quick Actions</h5>
                </div>
                <div className="bs-card-body">
                    <div className="bs-quick-actions">
                        {quickActions.map((qa, i) => (
                            <Link key={i} to={qa.to} className="bs-quick-action-btn">
                                <div className="bs-quick-action-icon" style={{ background: qa.bg, color: qa.color }}>
                                    <span style={{ fontSize: 24 }}>{qa.label.split(' ')[0]}</span>
                                </div>
                                <span className="bs-quick-action-label">{qa.label.slice(qa.label.indexOf(' ') + 1)}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="bs-row bs-row-2">
                {/* Monthly Sales Chart */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">📈 Monthly Sales & Revenue</h5>
                        <Link to="/school/book-sales/reports" className="bs-btn bs-btn-outline bs-btn-sm">Full Report →</Link>
                    </div>
                    <div className="bs-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <AreaChart data={monthlySalesData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#28c76f" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#28c76f" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Area type="monotone" dataKey="sales" name="Sales" stroke="#3d5ee1" fill="url(#salesGrad)" strokeWidth={2.5} />
                                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#28c76f" fill="url(#revGrad)" strokeWidth={2.5} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Stock vs Sold */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">📦 Stock vs Sold by Book</h5>
                        <Link to="/school/book-sales/inventory" className="bs-btn bs-btn-outline bs-btn-sm">View Inventory →</Link>
                    </div>
                    <div className="bs-chart-body">
                        <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={stockVsSoldData} margin={{ top: 5, right: 10, bottom: 0, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f2f7" />
                                <XAxis dataKey="book" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="stock" name="In Stock" fill="#3d5ee1" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="sold" name="Sold" fill="#28c76f" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Payment & Recent Sales */}
            <div className="bs-row bs-row-2-1">
                {/* Recent Sales Table */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">🧾 Recent Sales</h5>
                        <Link to="/school/book-sales/sales" className="bs-btn bs-btn-primary bs-btn-sm">View All</Link>
                    </div>
                    <div className="bs-table-wrap">
                        <table className="bs-table">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Book</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.slice(0, 6).map(s => (
                                    <tr key={s.id}>
                                        <td style={{ fontWeight: 500 }}>{s.student}</td>
                                        <td><span className="bs-badge bs-badge-blue">{s.class}</span></td>
                                        <td style={{ color: 'var(--bs-muted)', maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.book}</td>
                                        <td style={{ fontWeight: 600, color: '#28c76f' }}>₹{s.price}</td>
                                        <td>
                                            <span className={`bs-badge ${s.payment === 'Cash' ? 'bs-badge-green' : s.payment === 'UPI' ? 'bs-badge-blue' : s.payment === 'Cheque' ? 'bs-badge-orange' : 'bs-badge-purple'}`}>
                                                {s.payment}
                                            </span>
                                        </td>
                                        <td style={{ color: 'var(--bs-muted)' }}>{s.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Payment Methods Pie */}
                <div className="bs-card">
                    <div className="bs-card-header">
                        <h5 className="bs-card-title">💳 Payment Methods</h5>
                    </div>
                    <div className="bs-chart-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <ResponsiveContainer width="100%" height={180}>
                            <PieChart>
                                <Pie
                                    data={paymentMethodData}
                                    cx="50%" cy="50%"
                                    innerRadius={55} outerRadius={80}
                                    dataKey="value" stroke="none"
                                    paddingAngle={3}
                                >
                                    {paymentMethodData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={v => [`${v}%`, '']} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div style={{ width: '100%' }}>
                            {paymentMethodData.map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 0', fontSize: 13, borderBottom: '1px solid var(--bs-border)' }}>
                                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, flexShrink: 0 }}></span>
                                    <span style={{ flex: 1 }}>{item.name}</span>
                                    <strong>{item.value}%</strong>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Low Stock Alert */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">⚠️ Low Stock / Out of Stock Alert</h5>
                    <Link to="/school/book-sales/inventory" className="bs-btn bs-btn-warning bs-btn-sm">Manage Inventory</Link>
                </div>
                <div className="bs-table-wrap">
                    <table className="bs-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Type</th>
                                <th>Vendor</th>
                                <th>Selling Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {inventory.filter(b => b.stock <= 20).map((b, i) => (
                                <tr key={b.id}>
                                    <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                    <td style={{ fontWeight: 500 }}>{b.name}</td>
                                    <td><span className={`bs-badge ${b.type === 'Set' ? 'bs-badge-blue' : 'bs-badge-purple'}`}>{b.type}</span></td>
                                    <td style={{ color: 'var(--bs-muted)' }}>{b.vendor}</td>
                                    <td style={{ fontWeight: 600 }}>₹{b.sellingPrice}</td>
                                    <td style={{ fontWeight: 700, color: b.stock === 0 ? '#ea5455' : '#ff9f43' }}>{b.stock}</td>
                                    <td>
                                        <span className={`bs-badge ${b.stock === 0 ? 'bs-badge-red' : 'bs-badge-orange'}`}>
                                            {b.stock === 0 ? '❌ Out of Stock' : '⚠️ Low Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BookSalesDashboard;
