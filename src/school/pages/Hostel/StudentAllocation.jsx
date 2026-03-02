import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconChevronLeft, IconSearch, IconPlus, IconEdit, IconTrash } from '@tabler/icons-react';
import '../Accounts/Accounts.css';

const StudentAllocation = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        admissionNo: '',
        hostelName: '',
        roomNo: '',
        roomType: '',
    });

    const [allocations, setAllocations] = useState([
        { id: 1, studentName: 'John Doe', admissionNo: 'ADM1001', hostelName: 'Boys Hostel A', roomNo: '101', roomType: '2 Seater' },
        { id: 2, studentName: 'Jane Smith', admissionNo: 'ADM1002', hostelName: 'Girls Hostel B', roomNo: '205', roomType: '4 Seater' },
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowAddModal(false);
    };

    const handleEdit = (allocation) => {
        setFormData(allocation);
        setShowAddModal(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to remove this allocation?")) {
            setAllocations(prev => prev.filter(item => item.id !== id));
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
                        <h4>Student Allocation</h4>
                    </div>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span>Hostel</span> / <span className="current">Student Allocation</span>
                    </nav>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                    <IconPlus size={18} />
                    Add Allocation
                </button>
            </div>

            <div className="accounts-card">
                <div className="card-header">
                    <h5>Allocated Students</h5>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search by student name or admission no..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Admission No</th>
                                    <th>Hostel Name</th>
                                    <th>Room No</th>
                                    <th>Room Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allocations.map(allocation => (
                                    <tr key={allocation.id}>
                                        <td style={{ fontWeight: '500' }}>{allocation.studentName}</td>
                                        <td>{allocation.admissionNo}</td>
                                        <td>{allocation.hostelName}</td>
                                        <td>{allocation.roomNo}</td>
                                        <td>{allocation.roomType}</td>
                                        <td>
                                            <div className="action-buttons">
                                                <button className="action-btn edit" title="Edit" onClick={() => handleEdit(allocation)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconEdit size={18} />
                                                </button>
                                                <button className="action-btn delete" title="Delete" onClick={() => handleDelete(allocation.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                            <h3>Add Allocation</h3>
                            <button type="button" className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                            <div className="form-group full-width">
                                <label>Student Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} required placeholder="Enter student name" />
                            </div>
                            <div className="form-group full-width">
                                <label>Admission No <span style={{ color: '#ea5455' }}>*</span></label>
                                <input type="text" name="admissionNo" value={formData.admissionNo} onChange={handleChange} required placeholder="Enter admission number" />
                            </div>
                            <div className="form-group full-width">
                                <label>Hostel Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input type="text" name="hostelName" value={formData.hostelName} onChange={handleChange} required placeholder="Select hostel" />
                            </div>
                            <div className="form-group full-width">
                                <label>Room No <span style={{ color: '#ea5455' }}>*</span></label>
                                <input type="text" name="roomNo" value={formData.roomNo} onChange={handleChange} required placeholder="Select room" />
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

export default StudentAllocation;
