import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { inventory as initialInventory } from './bookSalesData';
import './BookSales.css';

const emptyBook = { name: '', type: 'Set', qty: '', sets: '', singles: '', costPrice: '', sellingPrice: '', stock: '', vendor: '' };
const bookTypes = ['Set', 'Single'];

const getStockStatus = (stock) => {
    const s = Number(stock);
    if (s === 0) return { label: '❌ Out of Stock', cls: 'bs-badge-red' };
    if (s <= 20) return { label: '⚠️ Low Stock', cls: 'bs-badge-orange' };
    return { label: '✅ In Stock', cls: 'bs-badge-green' };
};

const Inventory = () => {
    const [books, setBooks] = useState(initialInventory);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyBook);

    const filtered = books.filter(b => {
        const status = getStockStatus(b.stock).label;
        return (
            (filterType === 'All' || b.type === filterType) &&
            (filterStatus === 'All' || status.includes(filterStatus)) &&
            b.name.toLowerCase().includes(search.toLowerCase())
        );
    });

    const openAdd = () => { setForm(emptyBook); setEditId(null); setShowModal(true); };
    const openEdit = (b) => { setForm({ ...b }); setEditId(b.id); setShowModal(true); };

    const handleSubmit = () => {
        if (!form.name) return;
        if (editId) {
            setBooks(bs => bs.map(b => b.id === editId ? { ...form, id: editId } : b));
        } else {
            setBooks(bs => [...bs, { ...form, id: Date.now() }]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this book?')) setBooks(bs => bs.filter(b => b.id !== id));
    };

    const totalStock = books.reduce((a, b) => a + Number(b.stock), 0);
    const outOfStock = books.filter(b => Number(b.stock) === 0).length;
    const lowStock = books.filter(b => Number(b.stock) > 0 && Number(b.stock) <= 20).length;

    return (
        <div className="bs-page">
            {/* Header */}
            <div className="bs-page-header">
                <div>
                    <h4 className="bs-page-title">📦 Book Inventory</h4>
                    <nav className="bs-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link><span>/</span>
                        <Link to="/school/book-sales">Book Sales</Link><span>/</span>
                        <span className="bs-breadcrumb-current">Inventory</span>
                    </nav>
                </div>
                <button className="bs-btn bs-btn-primary" onClick={openAdd}>
                    ＋ Add Stock
                </button>
            </div>

            {/* KPI Row */}
            <div className="bs-row bs-row-3" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                {[
                    { label: 'Total Titles', value: books.length, color: '#3d5ee1', bg: '#eef1fd', icon: '📚' },
                    { label: 'Total Stock', value: totalStock, color: '#28c76f', bg: '#e8faf1', icon: '📦' },
                    { label: 'Low Stock', value: lowStock, color: '#ff9f43', bg: '#fff5e6', icon: '⚠️' },
                    { label: 'Out of Stock', value: outOfStock, color: '#ea5455', bg: '#fce8e8', icon: '❌' },
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
                    <h5 className="bs-card-title">Book Stock List</h5>
                    <div className="bs-filter-bar" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                        <div className="bs-search-wrap" style={{ maxWidth: 220 }}>
                            <span className="bs-search-icon">🔍</span>
                            <input type="text" className="bs-search-input" placeholder="Search books..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <select className="bs-select" value={filterType} onChange={e => setFilterType(e.target.value)}>
                            <option>All</option>
                            {bookTypes.map(t => <option key={t}>{t}</option>)}
                        </select>
                        <select className="bs-select" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                            <option value="All">All Status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                </div>
                <div className="bs-table-wrap">
                    <table className="bs-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book Name</th>
                                <th>Type</th>
                                <th>Total Qty</th>
                                <th>Sets</th>
                                <th>Singles</th>
                                <th>Cost Price</th>
                                <th>Selling Price</th>
                                <th>Vendor</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={12} style={{ textAlign: 'center', padding: 32, color: 'var(--bs-muted)' }}>No books found.</td></tr>
                            ) : filtered.map((b, i) => {
                                const status = getStockStatus(b.stock);
                                return (
                                    <tr key={b.id}>
                                        <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                        <td style={{ fontWeight: 600 }}>{b.name}</td>
                                        <td><span className={`bs-badge ${b.type === 'Set' ? 'bs-badge-blue' : 'bs-badge-purple'}`}>{b.type}</span></td>
                                        <td>{b.qty}</td>
                                        <td>{b.sets}</td>
                                        <td>{b.singles}</td>
                                        <td>₹{b.costPrice}</td>
                                        <td style={{ fontWeight: 700, color: '#28c76f' }}>₹{b.sellingPrice}</td>
                                        <td style={{ color: 'var(--bs-muted)', fontSize: 12 }}>{b.vendor}</td>
                                        <td style={{ fontWeight: 700, color: Number(b.stock) === 0 ? '#ea5455' : Number(b.stock) <= 20 ? '#ff9f43' : '#28c76f' }}>
                                            {b.stock}
                                        </td>
                                        <td><span className={`bs-badge ${status.cls}`}>{status.label}</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: 6 }}>
                                                <button className="bs-btn-icon bs-btn-icon-edit" onClick={() => openEdit(b)}>✏️</button>
                                                <button className="bs-btn-icon bs-btn-icon-delete" onClick={() => handleDelete(b.id)}>🗑</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="bs-table-footer">
                    <span>Showing {filtered.length} of {books.length} books</span>
                    <div className="bs-pagination">
                        <button className="bs-page-btn">‹</button>
                        <button className="bs-page-btn active">1</button>
                        <button className="bs-page-btn">›</button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="bs-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="bs-modal bs-modal-lg" onClick={e => e.stopPropagation()}>
                        <div className="bs-modal-header">
                            <h5 className="bs-modal-title">{editId ? '✏️ Edit Book' : '➕ Add Book Stock'}</h5>
                            <button className="bs-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <div className="bs-modal-body">
                            <div className="bs-form-grid">
                                <div className="bs-form-group full-width">
                                    <label className="bs-form-label">Book Name *</label>
                                    <input className="bs-form-input" placeholder="e.g. Mathematics Class 10"
                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Type</label>
                                    <select className="bs-form-select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                        {bookTypes.map(t => <option key={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Total Quantity</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 200" value={form.qty}
                                        onChange={e => setForm({ ...form, qty: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">How Many Sets</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 180" value={form.sets}
                                        onChange={e => setForm({ ...form, sets: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">How Many Singles</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 20" value={form.singles}
                                        onChange={e => setForm({ ...form, singles: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Cost Price (₹)</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 450" value={form.costPrice}
                                        onChange={e => setForm({ ...form, costPrice: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Selling Price (₹)</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 550" value={form.sellingPrice}
                                        onChange={e => setForm({ ...form, sellingPrice: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Stock Available</label>
                                    <input className="bs-form-input" type="number" placeholder="e.g. 120" value={form.stock}
                                        onChange={e => setForm({ ...form, stock: e.target.value })} />
                                </div>
                                <div className="bs-form-group">
                                    <label className="bs-form-label">Vendor</label>
                                    <input className="bs-form-input" placeholder="Vendor name" value={form.vendor}
                                        onChange={e => setForm({ ...form, vendor: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        <div className="bs-modal-footer">
                            <button className="bs-btn bs-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="bs-btn bs-btn-primary" onClick={handleSubmit}>
                                {editId ? '✔ Update Book' : '✔ Add Stock'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
