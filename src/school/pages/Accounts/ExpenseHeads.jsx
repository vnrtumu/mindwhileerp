import React, { useState } from 'react';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconWallet, IconTag, IconNotes, IconFilter, IconChevronDown
} from '@tabler/icons-react';
import './Accounts.css';

const ExpenseHeads = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: ''
    });

    // Sample data
    const [headsData, setHeadsData] = useState([
        { id: 1, name: 'Utility Bills', description: 'Electricity, water, and internet bills', category: 'Operations' },
        { id: 2, name: 'Office Supplies', description: 'Stationery, ink, and small office tools', category: 'Administrative' },
        { id: 3, name: 'Salaries', description: 'Staff, teachers, and security wages', category: 'Human Resources' },
        { id: 4, name: 'Maintenance', description: 'Building repairs and equipment servicing', category: 'Operations' },
        { id: 5, name: 'Sports', description: 'Physical education gear and events', category: 'Academic' },
        { id: 6, name: 'Marketing', description: 'Advertisements and promotional events', category: 'Promotion' }
    ]);

    const categories = ['all', 'Operations', 'Administrative', 'Human Resources', 'Academic', 'Promotion'];

    const filteredData = headsData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this head?')) {
            setHeadsData(headsData.filter(item => item.id !== id));
        }
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ name: '', description: '', category: '' });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            name: item.name,
            description: item.description,
            category: item.category
        });
        setShowAddModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setHeadsData(headsData.map(item =>
                item.id === editingId
                    ? { ...item, ...formData }
                    : item
            ));
        } else {
            const newHead = {
                id: headsData.length + 1,
                ...formData
            };
            setHeadsData([...headsData, newHead]);
        }
        setShowAddModal(false);
    };

    return (
        <div className="accounts-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Expense Heads</h4>
                    <nav className="breadcrumb">
                        <span>Accounts</span> / <span className="current">Expense Heads</span>
                    </nav>
                </div>
                <button className="btn-primary" style={{ background: '#7367f0' }} onClick={handleOpenAddModal}>
                    <IconPlus size={18} />
                    Add Expense Head
                </button>
            </div>

            {/* Add/Edit Expense Head Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header" style={{ background: '#7367f0' }}>
                            <h3>{isEditing ? 'Edit Expense Head' : 'Add Expense Head'}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-group full-width">
                                <label>Title <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group full-width">
                                <label>Category</label>
                                <div className="select-with-icon">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.filter(c => c !== 'all').map((cat, idx) => (
                                            <option key={idx} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <IconChevronDown size={18} className="field-icon" />
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
                                <button type="submit" className="btn-submit" style={{ background: '#7367f0' }}>
                                    {isEditing ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Content Card */}
            <div className="accounts-card">
                <div className="card-header">
                    <h5>Master Expense Heads</h5>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search expense heads..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="filter-group">
                            <IconFilter size={18} />
                            <div className="select-wrapper">
                                <select
                                    className="filter-select"
                                    value={filterCategory}
                                    onChange={(e) => setFilterCategory(e.target.value)}
                                >
                                    {categories.map((cat, idx) => (
                                        <option key={idx} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat}
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
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div className="item-info">
                                                <span className="item-name">{item.name}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="item-desc">{item.description}</span>
                                        </td>
                                        <td>
                                            <span className="head-badge" style={{ background: 'rgba(115, 103, 240, 0.1)', color: '#7367f0' }}>{item.category}</span>
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
                </div>
            </div>
        </div>
    );
};

export default ExpenseHeads;
