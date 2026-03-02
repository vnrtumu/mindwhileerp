import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconEye, IconEdit, IconTrash, IconUserPlus, IconPlus } from '@tabler/icons-react';
import './User.css';

export default function User() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([
        { id: 1, photo: null, name: 'DRIVER', phone: '', role: 'Driver', status: true },
        { id: 2, photo: null, name: 'Attender', phone: '', role: 'Attender', status: true },
        { id: 3, photo: null, name: 'PRASANNA', phone: '', role: 'Accountant', status: true },
        { id: 4, photo: null, name: 'Nithya', phone: '00000000', role: 'Receptionist', status: true },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const toggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: !u.status } : u));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="user-mgmt-page">
            {selectedUser && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header" style={{ background: '#7367f0' }}>
                            <h3>User Details</h3>
                            <button className="close-btn" onClick={() => setSelectedUser(null)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)', color: 'white' }} />
                            </button>
                        </div>
                        <div className="modal-body" style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-color, #e9ecef)' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary, #6e6b7b)' }}>Name</span>
                                    <span style={{ fontWeight: 600, color: '#7367f0' }}>{selectedUser.name}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-color, #e9ecef)' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary, #6e6b7b)' }}>Role</span>
                                    <span className="user-role-tag">{selectedUser.role}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderBottom: '1px solid var(--border-color, #e9ecef)' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary, #6e6b7b)' }}>Phone</span>
                                    <span style={{ color: 'var(--text-primary, #333448)' }}>{selectedUser.phone || 'N/A'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0' }}>
                                    <span style={{ fontWeight: 600, color: 'var(--text-secondary, #6e6b7b)' }}>Status</span>
                                    <span className={`status-badge ${selectedUser.status ? 'active' : 'inactive'}`}>
                                        {selectedUser.status ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn-cancel" onClick={() => setSelectedUser(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="user-header-row">
                <div className="user-breadcrumb">
                    <h2>User</h2>
                    <div className="breadcrumb-path">Dashboard / <span>User</span></div>
                </div>
                <div className="user-header-actions">
                    <button className="btn-add-primary" onClick={() => navigate('/school/teachers/user/add')}>
                        <IconUserPlus size={20} /> Add a user
                    </button>
                </div>
            </div>

            <div className="user-card-container">
                <div className="user-table-header">
                    <div className="header-left">
                        <div className="records-dropdown">
                            <select>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span>records per page</span>
                        </div>
                        <div className="user-export-group">
                            <button className="export-btn">Copy</button>
                            <button className="export-btn">Excel</button>
                            <button className="export-btn">CSV</button>
                            <button className="export-btn">PDF</button>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="user-search-container">
                            <label>Search:</label>
                            <input
                                type="text"
                                placeholder="..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="user-table-responsive">
                    <table className="user-mgmt-table">
                        <thead>
                            <tr>
                                <th width="60">#</th>
                                <th width="80">Photo</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th width="100">Status</th>
                                <th width="120">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="user-avatar-cell">
                                            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="avatar" />
                                        </div>
                                    </td>
                                    <td className="user-name-cell">{user.name}</td>
                                    <td>{user.phone || '-'}</td>
                                    <td><span className="user-role-tag">{user.role}</span></td>
                                    <td>
                                        <div
                                            className={`user-status-toggle ${user.status ? 'active' : ''}`}
                                            onClick={() => toggleStatus(user.id)}
                                        >
                                            <div className="toggle-handle"></div>
                                            <span className="toggle-text">{user.status ? 'ON' : 'OFF'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="user-action-group">
                                            <button className="action-icn view" title="View" onClick={() => setSelectedUser(user)}>
                                                <IconEye size={18} />
                                            </button>
                                            <button className="action-icn edit" title="Edit" onClick={() => navigate(`/school/teachers/user/edit/${user.id}`)}>
                                                <IconEdit size={18} />
                                            </button>
                                            <button className="action-icn delete" title="Delete" onClick={() => handleDelete(user.id)}>
                                                <IconTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="user-table-footer">
                    <div className="footer-info">
                        Showing 1 to {users.length} of {users.length} entries
                    </div>
                    <div className="user-pagination">
                        <button className="page-nav disabled">Previous</button>
                        <button className="page-num active">1</button>
                        <button className="page-nav disabled">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
