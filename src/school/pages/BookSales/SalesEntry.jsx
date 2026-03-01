import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { sales as initialSales, inventory } from './bookSalesData';
import './BookSales.css';
import './SalesEntry.css';

const classes = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6',
    'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const paymentMethods = ['Cash', 'UPI', 'Cheque', 'Card', 'Bank Transfer'];
const today = new Date().toISOString().split('T')[0];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const stockPct = (b) => (b.qty === 0 ? 0 : Math.round((b.stock / b.qty) * 100));

const StockBadge = ({ book }) => {
    const pct = stockPct(book);
    if (book.stock === 0) return <span className="se-stock-badge se-stock-out">Out of Stock</span>;
    if (pct < 30) return <span className="se-stock-badge se-stock-low">Low Stock ({book.stock})</span>;
    return <span className="se-stock-badge se-stock-ok">In Stock ({book.stock})</span>;
};

// Initial empty selected-books map: { bookId: { book, qty, type } }
const emptySelected = {};
const emptyStudent = { name: '', class: 'Class 10', payment: 'Cash', date: today };

// ─────────────────────────────────────────────────────────────────────────────
// SalesEntry Component
// ─────────────────────────────────────────────────────────────────────────────
const SalesEntry = () => {
    const [sales, setSales] = useState(initialSales);
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [student, setStudent] = useState(emptyStudent);
    const [selected, setSelected] = useState(emptySelected);   // { id: {book, qty, type} }
    const [bookSearch, setBookSearch] = useState('');

    // Table filters
    const [search, setSearch] = useState('');
    const [filterClass, setFilterClass] = useState('All');

    // ── Book multi-select helpers ──────────────────────────────────────────
    const visibleBooks = useMemo(() =>
        inventory.filter(b => b.name.toLowerCase().includes(bookSearch.toLowerCase())),
        [bookSearch]
    );

    const toggleBook = (book) => {
        setSelected(prev => {
            if (prev[book.id]) {
                const next = { ...prev };
                delete next[book.id];
                return next;
            }
            return {
                ...prev,
                [book.id]: { book, qty: 1, type: book.type }
            };
        });
    };

    const updateQty = (id, val) => {
        const num = Math.max(1, Number(val));
        setSelected(prev => prev[id]
            ? { ...prev, [id]: { ...prev[id], qty: num } }
            : prev
        );
    };

    const updateType = (id, val) => {
        setSelected(prev => prev[id]
            ? { ...prev, [id]: { ...prev[id], type: val } }
            : prev
        );
    };

    // ── Computed cart totals ────────────────────────────────────────────────
    const cartItems = Object.values(selected);
    const cartTotal = cartItems.reduce(
        (sum, item) => sum + Number(item.book.sellingPrice) * item.qty, 0
    );
    const cartBookCount = cartItems.length;

    // ── Submit ──────────────────────────────────────────────────────────────
    const handleSubmit = () => {
        if (!student.name || cartItems.length === 0) return;

        const now = Date.now();
        const newRows = cartItems.map((item, i) => ({
            id: now + i,
            student: student.name,
            class: student.class,
            book: item.book.name,
            qty: item.qty,
            type: item.type,
            price: item.book.sellingPrice,
            payment: student.payment,
            date: student.date || today,
        }));

        setSales(prev => [...newRows, ...prev]);
        setSelected(emptySelected);
        setStudent(emptyStudent);
        setShowModal(false);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3500);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelected(emptySelected);
        setStudent(emptyStudent);
        setBookSearch('');
    };

    // ── Table display ───────────────────────────────────────────────────────
    const filtered = sales.filter(s =>
        (filterClass === 'All' || s.class === filterClass) &&
        (s.student.toLowerCase().includes(search.toLowerCase()) ||
            s.book.toLowerCase().includes(search.toLowerCase()))
    );
    const totalRevenue = sales.reduce((a, s) => a + Number(s.price) * Number(s.qty), 0);

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="bs-page">
            {/* ── Page Header ── */}
            <div className="bs-page-header">
                <div>
                    <h4 className="bs-page-title">🧾 Sales Entry</h4>
                    <nav className="bs-breadcrumb">
                        <Link to="/school/dashboard">Dashboard</Link><span>/</span>
                        <Link to="/school/book-sales">Book Sales</Link><span>/</span>
                        <span className="bs-breadcrumb-current">Sales Entry</span>
                    </nav>
                </div>
                <button className="bs-btn bs-btn-primary" onClick={() => setShowModal(true)}>
                    ＋ New Sale Entry
                </button>
            </div>

            {/* ── Success Banner ── */}
            {submitted && (
                <div className="se-success-banner">
                    ✅ Sale recorded successfully! {cartBookCount > 1 ? `${cartBookCount} books` : ''} added.
                </div>
            )}

            {/* ── Summary Bar ── */}
            <div className="bs-summary-bar">
                {[
                    { label: 'Total Sales', value: sales.length, color: null },
                    { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString()}`, color: '#28c76f' },
                    { label: "Today's Sales", value: sales.filter(s => s.date === today).length, color: null },
                    { label: "Books Sold Today", value: sales.filter(s => s.date === today).reduce((a, s) => a + Number(s.qty), 0), color: '#3d5ee1' },
                ].map((item, i, arr) => (
                    <React.Fragment key={i}>
                        <div className="bs-summary-item">
                            <span className="bs-summary-label">{item.label}</span>
                            <span className="bs-summary-value" style={item.color ? { color: item.color } : {}}>
                                {item.value}
                            </span>
                        </div>
                        {i < arr.length - 1 && <div className="bs-summary-divider" />}
                    </React.Fragment>
                ))}
            </div>

            {/* ── Sales Table ── */}
            <div className="bs-card">
                <div className="bs-card-header">
                    <h5 className="bs-card-title">Recent Sales Records</h5>
                    <div className="bs-filter-bar" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                        <div className="bs-search-wrap" style={{ maxWidth: 220 }}>
                            <span className="bs-search-icon">🔍</span>
                            <input type="text" className="bs-search-input" placeholder="Search student/book..."
                                value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                        <select className="bs-select" value={filterClass} onChange={e => setFilterClass(e.target.value)}>
                            <option>All</option>
                            {classes.map(c => <option key={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div className="bs-table-wrap">
                    <table className="bs-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Class</th>
                                <th>Book Name</th>
                                <th>Qty</th>
                                <th>Type</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (
                                <tr><td colSpan={10} style={{ textAlign: 'center', padding: 32, color: 'var(--bs-muted)' }}>No records found.</td></tr>
                            ) : filtered.map((s, i) => (
                                <tr key={s.id}>
                                    <td style={{ color: 'var(--bs-muted)' }}>{i + 1}</td>
                                    <td style={{ fontWeight: 600 }}>{s.student}</td>
                                    <td><span className="bs-badge bs-badge-blue">{s.class}</span></td>
                                    <td style={{ color: 'var(--bs-muted)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.book}</td>
                                    <td style={{ fontWeight: 600 }}>{s.qty}</td>
                                    <td><span className={`bs-badge ${s.type === 'Set' ? 'bs-badge-purple' : 'bs-badge-cyan'}`}>{s.type}</span></td>
                                    <td>₹{Number(s.price).toLocaleString()}</td>
                                    <td style={{ fontWeight: 700, color: '#28c76f' }}>₹{(Number(s.price) * Number(s.qty)).toLocaleString()}</td>
                                    <td>
                                        <span className={`bs-badge ${s.payment === 'Cash' ? 'bs-badge-green' : s.payment === 'UPI' ? 'bs-badge-blue' : 'bs-badge-orange'}`}>
                                            {s.payment}
                                        </span>
                                    </td>
                                    <td style={{ color: 'var(--bs-muted)' }}>{s.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="bs-table-footer">
                    <span>Showing {filtered.length} of {sales.length} records</span>
                    <div className="bs-pagination">
                        <button className="bs-page-btn">‹</button>
                        <button className="bs-page-btn active">1</button>
                        <button className="bs-page-btn">›</button>
                    </div>
                </div>
            </div>

            {/* ════════════════════════ MODAL ════════════════════════ */}
            {showModal && (
                <div className="bs-modal-overlay" onClick={handleClose}>
                    <div className="se-modal" onClick={e => e.stopPropagation()}>

                        {/* Modal Header */}
                        <div className="bs-modal-header">
                            <h5 className="bs-modal-title">🧾 New Sale Entry</h5>
                            <button className="bs-modal-close" onClick={handleClose}>×</button>
                        </div>

                        <div className="se-modal-body">
                            {/* ── LEFT PANEL: Student + Book picker ── */}
                            <div className="se-left-panel">

                                {/* Student Info */}
                                <div className="se-section-label">👤 Student Information</div>
                                <div className="bs-form-grid se-student-grid">
                                    <div className="bs-form-group">
                                        <label className="bs-form-label">Student Name *</label>
                                        <input className="bs-form-input" placeholder="e.g. Aarav Sharma"
                                            value={student.name}
                                            onChange={e => setStudent({ ...student, name: e.target.value })} />
                                    </div>
                                    <div className="bs-form-group">
                                        <label className="bs-form-label">Class</label>
                                        <select className="bs-form-select" value={student.class}
                                            onChange={e => setStudent({ ...student, class: e.target.value })}>
                                            {classes.map(c => <option key={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="bs-form-group">
                                        <label className="bs-form-label">Payment Method</label>
                                        <select className="bs-form-select" value={student.payment}
                                            onChange={e => setStudent({ ...student, payment: e.target.value })}>
                                            {paymentMethods.map(m => <option key={m}>{m}</option>)}
                                        </select>
                                    </div>
                                    <div className="bs-form-group">
                                        <label className="bs-form-label">Date</label>
                                        <input className="bs-form-input" type="date" value={student.date}
                                            onChange={e => setStudent({ ...student, date: e.target.value })} />
                                    </div>
                                </div>

                                {/* Book Picker */}
                                <div className="se-section-label" style={{ marginTop: 20 }}>
                                    📚 Select Books
                                    <span className="se-section-hint">Tick checkboxes to add multiple books</span>
                                </div>

                                {/* Book search */}
                                <div className="se-book-search-wrap">
                                    <span className="se-book-search-icon">🔍</span>
                                    <input
                                        type="text"
                                        className="bs-search-input"
                                        placeholder="Search books by name..."
                                        value={bookSearch}
                                        onChange={e => setBookSearch(e.target.value)}
                                    />
                                </div>

                                {/* Book checklist */}
                                <div className="se-book-list">
                                    {visibleBooks.length === 0 ? (
                                        <p style={{ color: 'var(--bs-muted)', textAlign: 'center', padding: 16 }}>No books found.</p>
                                    ) : visibleBooks.map(book => {
                                        const isChecked = !!selected[book.id];
                                        const pct = stockPct(book);
                                        const disabled = book.stock === 0;
                                        return (
                                            <div
                                                key={book.id}
                                                className={`se-book-item ${isChecked ? 'se-book-item-active' : ''} ${disabled ? 'se-book-item-disabled' : ''}`}
                                                onClick={() => !disabled && toggleBook(book)}
                                            >
                                                {/* Checkbox */}
                                                <div className={`se-checkbox ${isChecked ? 'se-checkbox-checked' : ''} ${disabled ? 'se-checkbox-disabled' : ''}`}>
                                                    {isChecked && <span className="se-check-icon">✓</span>}
                                                </div>

                                                {/* Book Info */}
                                                <div className="se-book-info">
                                                    <div className="se-book-name">{book.name}</div>
                                                    <div className="se-book-meta">
                                                        <span className={`bs-badge ${book.type === 'Set' ? 'bs-badge-blue' : 'bs-badge-purple'}`} style={{ fontSize: 10 }}>
                                                            {book.type}
                                                        </span>
                                                        <span className="se-book-price">₹{book.sellingPrice}</span>
                                                        <StockBadge book={book} />
                                                    </div>
                                                </div>

                                                {/* Stock mini bar */}
                                                <div className="se-mini-bar-wrap">
                                                    <div className="se-mini-bar-track">
                                                        <div className="se-mini-bar-fill" style={{
                                                            width: `${Math.min(pct, 100)}%`,
                                                            background: pct === 0 ? '#ea5455' : pct < 30 ? '#ff9f43' : '#28c76f'
                                                        }} />
                                                    </div>
                                                    <span className="se-mini-bar-pct" style={{
                                                        color: pct === 0 ? '#ea5455' : pct < 30 ? '#ff9f43' : '#28c76f'
                                                    }}>{pct}%</span>
                                                </div>

                                                {/* Qty + Type controls (only if selected) */}
                                                {isChecked && (
                                                    <div className="se-book-controls" onClick={e => e.stopPropagation()}>
                                                        <div className="se-qty-control">
                                                            <button className="se-qty-btn"
                                                                onClick={() => updateQty(book.id, (selected[book.id].qty || 1) - 1)}>−</button>
                                                            <input
                                                                type="number" min="1"
                                                                className="se-qty-input"
                                                                value={selected[book.id].qty}
                                                                onChange={e => updateQty(book.id, e.target.value)}
                                                            />
                                                            <button className="se-qty-btn"
                                                                onClick={() => updateQty(book.id, (selected[book.id].qty || 1) + 1)}>＋</button>
                                                        </div>
                                                        <select className="se-type-select"
                                                            value={selected[book.id].type}
                                                            onChange={e => updateType(book.id, e.target.value)}>
                                                            <option>Set</option>
                                                            <option>Single</option>
                                                        </select>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* ── RIGHT PANEL: Bill Summary ── */}
                            <div className="se-right-panel">
                                <div className="se-bill-header">
                                    🧾 Bill Summary
                                    {cartBookCount > 0 && (
                                        <span className="se-bill-count">{cartBookCount} book{cartBookCount > 1 ? 's' : ''}</span>
                                    )}
                                </div>

                                {cartItems.length === 0 ? (
                                    <div className="se-bill-empty">
                                        <span style={{ fontSize: 36 }}>📚</span>
                                        <p>Select books from the left<br />to add them to the bill</p>
                                    </div>
                                ) : (
                                    <div className="se-bill-items">
                                        {cartItems.map(item => (
                                            <div key={item.book.id} className="se-bill-item">
                                                <div className="se-bill-item-name">{item.book.name}</div>
                                                <div className="se-bill-item-detail">
                                                    <span className="se-bill-qty">× {item.qty}</span>
                                                    <span className="se-bill-unit">@ ₹{item.book.sellingPrice}</span>
                                                </div>
                                                <div className="se-bill-item-total">
                                                    ₹{(item.book.sellingPrice * item.qty).toLocaleString()}
                                                </div>
                                                <button className="se-bill-remove"
                                                    onClick={() => toggleBook(item.book)} title="Remove">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Divider + Grand Total */}
                                <div className="se-bill-footer">
                                    <div className="se-bill-row">
                                        <span>Books selected</span>
                                        <strong>{cartBookCount}</strong>
                                    </div>
                                    <div className="se-bill-row se-bill-total-row">
                                        <span>Grand Total</span>
                                        <strong className="se-grand-total">₹{cartTotal.toLocaleString()}</strong>
                                    </div>
                                    {student.payment && (
                                        <div className="se-bill-row">
                                            <span>Payment</span>
                                            <span className="bs-badge bs-badge-green">{student.payment}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="bs-modal-footer">
                            <button className="bs-btn bs-btn-outline" onClick={handleClose}>Cancel</button>
                            <button
                                className="bs-btn bs-btn-success"
                                disabled={!student.name || cartItems.length === 0}
                                style={{ opacity: (!student.name || cartItems.length === 0) ? 0.5 : 1, cursor: (!student.name || cartItems.length === 0) ? 'not-allowed' : 'pointer' }}
                                onClick={handleSubmit}
                            >
                                ✔ Submit Sale ({cartBookCount > 0 ? `${cartBookCount} books · ₹${cartTotal.toLocaleString()}` : '—'})
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesEntry;
