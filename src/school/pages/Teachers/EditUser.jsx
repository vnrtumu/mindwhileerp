import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IconUsers, IconDeviceDesktop, IconArrowLeft } from '@tabler/icons-react';
import './EditUser.css';

export default function EditUser() {
    const navigate = useNavigate();
    const { id } = useParams();

    // Initialize state with default values or values based on ID
    const [formData, setFormData] = useState({
        name: 'DRIVER',
        dob: '1991-02-27',
        gender: 'Male',
        religion: '',
        email: 'driver123@gmail.com',
        phone: '',
        address: '',
        joiningDate: '2025-04-29',
        photo: '',
        role: 'Driver',
        rfid: '',
        username: 'driver123'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate save and go back
        navigate('/school/teachers/user');
    };

    return (
        <div className="edit-user-page-container">
            <div className="back-button-wrapper">
                <button className="btn-circular-back" onClick={() => navigate('/school/teachers/user')}>
                    <IconArrowLeft size={20} />
                </button>
            </div>
            <div className="edit-user-card">
                <div className="edit-user-header">
                    <div className="header-left">
                        <IconUsers size={20} className="header-icon" />
                        <h3>User</h3>
                    </div>
                    <div className="header-right">
                        <IconDeviceDesktop size={16} />
                        <span>Dashboard / User / Edit User</span>
                    </div>
                </div>

                <form className="edit-user-form" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {/* Row 1 */}
                        <div className="form-group row-line">
                            <label>Name <span>*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Date of birth <span>*</span></label>
                            <input
                                type="text"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                placeholder="DD-MM-YYYY"
                                required
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group row-line">
                            <label>Religion</label>
                            <input
                                type="text"
                                name="religion"
                                value={formData.religion}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Row 2 */}
                        <div className="form-group row-line">
                            <label>Email <span>*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Joining date <span>*</span></label>
                            <input
                                type="text"
                                name="joiningDate"
                                value={formData.joiningDate}
                                onChange={handleChange}
                                placeholder="DD-MM-YYYY"
                                required
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="form-group row-line">
                            <label>Photo</label>
                            <div className="file-browse-input">
                                <input
                                    type="text"
                                    readOnly
                                    className="file-text"
                                />
                                <button type="button" className="btn-file-browse">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                        <polyline points="17 8 12 3 7 8"></polyline>
                                        <line x1="12" y1="3" x2="12" y2="15"></line>
                                    </svg>
                                    FILE BROWSE
                                </button>
                            </div>
                        </div>
                        <div className="form-group row-line">
                            <label>Role <span>*</span></label>
                            <select name="role" value={formData.role} onChange={handleChange} required>
                                <option value="Driver">Driver</option>
                                <option value="Attender">Attender</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Receptionist">Receptionist</option>
                            </select>
                        </div>
                        <div className="form-group row-line">
                            <label>Rfid</label>
                            <input
                                type="text"
                                name="rfid"
                                value={formData.rfid}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group row-line">
                            <label>Username <span>*</span></label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>
                    <div className="form-submit-row">
                        <button type="submit" className="btn-update-user">Update User</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
