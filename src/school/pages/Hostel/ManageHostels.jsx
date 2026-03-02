import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import '../Accounts/Accounts.css';

const ManageHostels = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        hostelName: '',
        type: '',
        address: '',
        intake: '',
        description: '',
    });

    const [hostels, setHostels] = useState([
        { id: 1, hostelName: 'Boys Hostel A', type: 'Boys', address: 'North Campus', intake: 150, description: 'Main boys dormitory' },
        { id: 2, hostelName: 'Girls Hostel B', type: 'Girls', address: 'South Campus', intake: 100, description: 'Main girls dormitory' },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAddModal(false);
    };

    const handleEdit = (hostel) => {
        setFormData(hostel);
        setShowAddModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this hostel?")) {
            setHostels(prev => prev.filter(item => item.id !== id));
        }
    };

    return (
        <div className="accounts-page">
            <div className="page-header">
                <div className="page-title">
                    <div className="d-flex align-items-center gap-2">
                        <button className="action-btn" onClick={() => navigate(-1)}>
                            <IconChevronLeft size={20} />
                        </button>
                        <h4>Manage Hostels</h4>
                    </div>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span>Hostel</span> / <span className="current">Manage Hostels</span>
                    </nav>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <IconPlus size={18} />
                    Add Hostel
                </button>
            </div>

            <div className="accounts-card">
                <div className="card-header">
                    <h5>Hostel List</h5>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search by hostel name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Hostel Name</th>
                                    <th>Type</th>
                                    <th>Address</th>
                                    <th>Intake</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hostels.map(hostel => (
                                    <tr key={hostel.id}>
                                        <td style={{ fontWeight: '500' }}>{hostel.hostelName}</td>
                                        <td>{hostel.type}</td>
                                        <td>{hostel.address}</td>
                                        <td>{hostel.intake}</td>
                                        <td>{hostel.description}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(hostel)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconEdit size={18} />
                                                </button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(hostel.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconTrash size={18} />
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

            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>Add Hostel</h3>
                            <button type="button" className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-group full-width">
                                <label>Hostel Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input type="text" name="hostelName" value={formData.hostelName} onChange={handleChange} required placeholder="Enter hostel name" />
                            </div>
                            <div className="form-group full-width">
                                <label>Type <span style={{ color: '#ea5455' }}>*</span></label>
                                <select name="type" value={formData.type} onChange={handleChange} required>
                                    <option value="">Select Type</option>
                                    <option value="Boys">Boys</option>
                                    <option value="Girls">Girls</option>
                                    <option value="Combine">Combine</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter address" />
                            </div>
                            <div className="form-group full-width">
                                <label>Intake</label>
                                <input type="number" name="intake" value={formData.intake} onChange={handleChange} placeholder="Enter capacity" />
                            </div>
                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Enter definition"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageHostels;
