import React, { useState } from 'react';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconWallet, IconTag, IconNotes
} from '@tabler/icons-react';
import './Accounts.css';

const IncomeHeads = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const [headsData, setHeadsData] = useState([
        { id: 1, name: 'Tuition Fees', description: 'Standard monthly tuition fees from students' },
        { id: 2, name: 'Transport Fees', description: 'Monthly transportation/bus charges' },
        { id: 3, name: 'Library', description: 'Library membership and late fines' },
        { id: 4, name: 'Hostel Fees', description: 'Residential and mess charges' },
        { id: 5, name: 'Donations', description: 'External grants and alumni donations' },
        { id: 6, name: 'Admission Fees', description: 'One-time admission fee for new joins' }
    ]);

    const filteredData = headsData.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this head?')) {
            setHeadsData(headsData.filter(item => item.id !== id));
        }
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({ name: '', description: '' });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            name: item.name,
            description: item.description
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
                    <h4>Income Heads</h4>
                    <nav className="breadcrumb">
                        <span>Accounts</span> / <span className="current">Income Heads</span>
                    </nav>
                </div>
                <button className="btn-primary" onClick={handleOpenAddModal}>
                    <IconPlus size={18} />
                    Add Income Head
                </button>
            </div>

            {/* Add/Edit Income Head Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Edit Income Head' : 'Add Income Head'}</h3>
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
                    <h5>Master Income Heads</h5>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search income heads..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
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

export default IncomeHeads;
