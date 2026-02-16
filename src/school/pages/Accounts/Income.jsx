import React, { useState } from 'react';
import {
    IconPlus, IconSearch, IconFilter, IconDownload, IconEdit, IconTrash,
    IconTrendingUp, IconWallet, IconCalendar, IconFileText, IconEye, IconChevronDown
} from '@tabler/icons-react';
import './Accounts.css';

const Income = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterHead, setFilterHead] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        amount: '',
        paymentMethod: '',
        description: ''
    });

    // Sample income data
    const [incomeData, setIncomeData] = useState([
        {
            id: 1,
            name: 'Tuition Fees - Class 10',
            head: 'Tuition Fees',
            date: '2024-02-01',
            invoiceNo: 'INV-001',
            amount: 125000,
            description: 'Monthly tuition fees collection'
        },
        {
            id: 2,
            name: 'Transport Fee Collection',
            head: 'Transport Fees',
            date: '2024-02-02',
            invoiceNo: 'INV-002',
            amount: 45000,
            description: 'Bus fee for February 2024'
        },
        {
            id: 3,
            name: 'Library Fine Collection',
            head: 'Library',
            date: '2024-02-03',
            invoiceNo: 'INV-003',
            amount: 2500,
            description: 'Late book return fines'
        },
        {
            id: 4,
            name: 'Hostel Fee - Boys Wing',
            head: 'Hostel Fees',
            date: '2024-02-04',
            invoiceNo: 'INV-004',
            amount: 85000,
            description: 'Monthly hostel charges'
        },
        {
            id: 5,
            name: 'Lab Equipment Donation',
            head: 'Donations',
            date: '2024-02-05',
            invoiceNo: 'INV-005',
            amount: 50000,
            description: 'Donation for science lab equipment'
        },
        {
            id: 6,
            name: 'Admission Fee - New Students',
            head: 'Admission Fees',
            date: '2024-02-06',
            invoiceNo: 'INV-006',
            amount: 200000,
            description: 'New admission fee collection'
        }
    ]);

    const incomeHeads = ['all', 'Tuition Fees', 'Transport Fees', 'Library', 'Hostel Fees', 'Donations', 'Admission Fees'];

    const filteredData = incomeData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesHead = filterHead === 'all' || item.head === filterHead;
        return matchesSearch && matchesHead;
    });

    const totalIncome = filteredData.reduce((sum, item) => sum + item.amount, 0);

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

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({
            name: '',
            date: '',
            amount: '',
            paymentMethod: '',
            description: ''
        });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            name: item.name,
            date: item.date,
            amount: item.amount,
            paymentMethod: 'Cash', // Mocking payment method
            description: item.description
        });
        setShowAddModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setIncomeData(incomeData.map(item =>
                item.id === editingId
                    ? { ...item, name: formData.name, date: formData.date, amount: Number(formData.amount), description: formData.description }
                    : item
            ));
        } else {
            const newIncome = {
                id: incomeData.length + 1,
                name: formData.name,
                head: 'General', // Default head
                date: formData.date,
                invoiceNo: `INV-${String(incomeData.length + 1).padStart(3, '0')}`, // Auto-generate invoice number
                amount: Number(formData.amount),
                description: formData.description
            };
            setIncomeData([...incomeData, newIncome]);
        }
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            setIncomeData(incomeData.filter(item => item.id !== id));
        }
    };

    return (
        <div className="accounts-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Income</h4>
                    <nav className="breadcrumb">
                        <span>Accounts</span> / <span className="current">Income</span>
                    </nav>
                </div>
                <button className="btn-primary" onClick={handleOpenAddModal}>
                    <IconPlus size={18} />
                    Add Income
                </button>
            </div>

            {/* Add/Edit Income Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Edit Income' : 'Add Income'}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-group full-width">
                                <label>Income Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter income name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Date</label>
                                    <div className="input-with-icon">
                                        <input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        />
                                        <IconCalendar size={18} className="field-icon" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Amount</label>
                                    <input
                                        type="number"
                                        placeholder="Enter amount"
                                        value={formData.amount}
                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Payment Method</label>
                                    <div className="select-with-icon">
                                        <select
                                            value={formData.paymentMethod}
                                            onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                                        >
                                            <option value="">Select</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Credit">Credit</option>
                                        </select>
                                        <IconChevronDown size={18} className="field-icon" />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    placeholder="Enter description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">
                                    {isEditing ? 'Save Changes' : 'Add Income'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="stats-row">
                <div className="stat-card income">
                    <div className="stat-icon">
                        <IconTrendingUp size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Income</span>
                        <h3 className="stat-value">{formatCurrency(totalIncome)}</h3>
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
                        <span className="stat-label">Income Heads</span>
                        <h3 className="stat-value">{incomeHeads.length - 1}</h3>
                    </div>
                </div>
                <div className="stat-card monthly">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f0f4ff 0%, #d6ebff 100%)', color: '#5a7dff' }}>
                        <IconCalendar size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Monthly Income</span>
                        <h3 className="stat-value">{formatCurrency(totalIncome * 0.8)}</h3> {/* Mocking monthly as 80% of total for demo */}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="accounts-card">
                <div className="card-header">
                    <h5>Income List</h5>
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
                                    {incomeHeads.map((head, idx) => (
                                        <option key={idx} value={head}>
                                            {head === 'all' ? 'All Income Heads' : head}
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
                                    <th>Name</th>
                                    <th>Income Head</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <span className="invoice-badge">{item.invoiceNo}</span>
                                        </td>
                                        <td>
                                            <div className="item-info">
                                                <span className="item-name">{item.name}</span>
                                                <span className="item-desc">{item.description}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="head-badge">{item.head}</span>
                                        </td>
                                        <td>
                                            <div className="date-cell">
                                                <IconCalendar size={14} />
                                                {formatDate(item.date)}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="amount-cell positive">
                                                {formatCurrency(item.amount)}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">

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
                            Showing {filteredData.length} of {incomeData.length} entries
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

export default Income;
