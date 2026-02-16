import React, { useState } from 'react';
import {
    IconPlus, IconSearch, IconFilter, IconDownload, IconEdit, IconTrash,
    IconTrendingDown, IconWallet, IconCalendar, IconFileText, IconEye, IconChevronDown
} from '@tabler/icons-react';
import './Accounts.css';

const Expense = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterHead, setFilterHead] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        invoiceNo: '',
        title: '',
        head: '',
        date: '',
        amount: '',
        description: '' // Kept for consistency, though not in the mini-header request
    });

    // Sample expense data
    const [expenseData, setExpenseData] = useState([
        {
            id: 1,
            name: 'Electricity Bill - Jan 2024',
            head: 'Utility Bills',
            date: '2024-02-01',
            invoiceNo: 'EXP-001',
            amount: 15600,
            description: 'Monthly electricity charges for main building'
        },
        {
            id: 2,
            name: 'Stationery Purchase',
            head: 'Office Supplies',
            date: '2024-02-02',
            invoiceNo: 'EXP-002',
            amount: 4500,
            description: 'Pens, papers, and files for office use'
        },
        {
            id: 3,
            name: 'Teacher Salaries - Jan',
            head: 'Salaries',
            date: '2024-02-03',
            invoiceNo: 'EXP-003',
            amount: 450000,
            description: 'Monthly salary distribution for teaching staff'
        },
        {
            id: 4,
            name: 'Plumbing Repairs',
            head: 'Maintenance',
            date: '2024-02-04',
            invoiceNo: 'EXP-004',
            amount: 2500,
            description: 'Fixed leaking pipes in secondary wing'
        },
        {
            id: 5,
            name: 'Internet Subscription',
            head: 'Utility Bills',
            date: '2024-02-05',
            invoiceNo: 'EXP-005',
            amount: 8000,
            description: 'High-speed fiber connection charges'
        },
        {
            id: 6,
            name: 'Sports Equipment',
            head: 'Sports',
            date: '2024-02-06',
            invoiceNo: 'EXP-006',
            amount: 25000,
            description: 'New footballs and cricket kits'
        }
    ]);

    const expenseHeads = ['all', 'Utility Bills', 'Office Supplies', 'Salaries', 'Maintenance', 'Sports'];

    const filteredData = expenseData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesHead = filterHead === 'all' || item.head === filterHead;
        return matchesSearch && matchesHead;
    });

    const totalExpense = filteredData.reduce((sum, item) => sum + item.amount, 0);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this expense?')) {
            setExpenseData(expenseData.filter(item => item.id !== id));
        }
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({
            invoiceNo: `EXP-${String(expenseData.length + 1).padStart(3, '0')}`,
            title: '',
            head: '',
            date: new Date().toISOString().split('T')[0],
            amount: '',
            description: ''
        });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            invoiceNo: item.invoiceNo,
            title: item.name,
            head: item.head,
            date: item.date,
            amount: item.amount,
            description: item.description
        });
        setShowAddModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setExpenseData(expenseData.map(item =>
                item.id === editingId
                    ? { ...item, name: formData.title, head: formData.head, date: formData.date, amount: Number(formData.amount), invoiceNo: formData.invoiceNo, description: formData.description }
                    : item
            ));
        } else {
            const newExpense = {
                id: expenseData.length + 1,
                name: formData.title,
                head: formData.head,
                date: formData.date,
                invoiceNo: formData.invoiceNo,
                amount: Number(formData.amount),
                description: formData.description
            };
            setExpenseData([...expenseData, newExpense]);
        }
        setShowAddModal(false);
    };

    return (
        <div className="accounts-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Expense</h4>
                    <nav className="breadcrumb">
                        <span>Accounts</span> / <span className="current">Expense</span>
                    </nav>
                </div>
                <button className="btn-primary" style={{ background: '#7367f0' }} onClick={handleOpenAddModal}>
                    <IconPlus size={18} />
                    Add Expense
                </button>
            </div>

            {/* Add/Edit Expense Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header" style={{ background: '#7367f0' }}>
                            <h3>{isEditing ? 'Edit Expense' : 'Add Expense'}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Invoice No <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter invoice no"
                                    required
                                    value={formData.invoiceNo}
                                    onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Title <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter expense title"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Expense Head <span style={{ color: '#ea5455' }}>*</span></label>
                                <div className="select-with-icon">
                                    <select
                                        required
                                        value={formData.head}
                                        onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                                    >
                                        <option value="">Select Head</option>
                                        {expenseHeads.filter(h => h !== 'all').map((head, idx) => (
                                            <option key={idx} value={head}>{head}</option>
                                        ))}
                                    </select>
                                    <IconChevronDown size={18} className="field-icon" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Date <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Amount <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="number"
                                    placeholder="Enter amount"
                                    required
                                    value={formData.amount}
                                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    placeholder="Enter description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit" style={{ background: '#7367f0' }}>
                                    {isEditing ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stat-card expense-variant">
                    <div className="stat-icon" style={{ background: 'rgba(115, 103, 240, 0.1)', color: '#7367f0' }}>
                        <IconTrendingDown size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Expense</span>
                        <h3 className="stat-value">{formatCurrency(totalExpense)}</h3>
                    </div>
                </div>
                <div className="stat-card transactions">
                    <div className="stat-icon">
                        <IconFileText size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Transactions</span>
                        <h3 className="stat-value">{filteredData.length}</h3>
                    </div>
                </div>
                <div className="stat-card heads">
                    <div className="stat-icon">
                        <IconWallet size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Expense Heads</span>
                        <h3 className="stat-value">{expenseHeads.length - 1}</h3>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="accounts-card">
                <div className="card-header">
                    <h5>Expense List</h5>
                    <div className="header-actions">
                        <button className="btn-outline">
                            <IconDownload size={16} />
                            Export
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or invoice..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <IconFilter size={18} />
                            <div className="select-wrapper">
                                <select
                                    className="filter-select"
                                    value={filterHead}
                                    onChange={(e) => setFilterHead(e.target.value)}
                                >
                                    {expenseHeads.map((head, idx) => (
                                        <option key={idx} value={head}>
                                            {head === 'all' ? 'All Expense Heads' : head}
                                        </option>
                                    ))}
                                </select>
                                <IconChevronDown size={14} className="select-chevron" />
                            </div>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Invoice No</th>
                                    <th>Title</th>
                                    <th>Expense Head</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="invoice-badge" style={{ background: 'rgba(115, 103, 240, 0.1)', color: '#7367f0' }}>{item.invoiceNo}</span>
                                        </td>
                                        <td>
                                            <div className="item-info">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-desc">{item.description}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="head-badge" style={{ background: 'rgba(115, 103, 240, 0.1)', color: '#7367f0' }}>{item.head}</span>
                                        </td>
                                        <td>
                                            <div className="date-cell">
                                                <IconCalendar size={14} />
                                                {formatDate(item.date)}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="amount-cell negative">
                                                {formatCurrency(item.amount)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn view" title="View">
                                                    <IconEye size={16} />
                                                </button>
                                                <button className="action-btn edit" title="Edit" onClick={() => handleOpenEditModal(item)}>
                                                    <IconEdit size={16} />
                                                </button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(item.id)}>
                                                    <IconTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="table-footer">
                        <span className="showing-text">
                            Showing {filteredData.length} of {expenseData.length} entries
                        </span>
                        <div className="pagination">
                            <button className="page-btn" disabled>Previous</button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expense;
