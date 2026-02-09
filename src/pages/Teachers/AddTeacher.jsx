import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    IconUser, IconCurrencyDollar, IconWalk, IconBuildingBank,
    IconBus, IconBuilding, IconBrandFacebook, IconFileText,
    IconLock
} from '@tabler/icons-react';
import { teachersData } from './teachersData';
import './AddTeacher.css';

const AddTeacher = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    // Synchronous lookup since data is local
    const teacher = isEditMode ? teachersData.find(t => t.id === id) : null;

    // Helper to get default value safely
    const getVal = (field) => teacher ? teacher[field] : '';

    return (
        <div className="add-teacher-page">
            <div className="page-header">
                <h2 className="page-title">{isEditMode ? 'Edit Teacher' : 'Add Teacher'}</h2>
                <div className="breadcrumb">Dashboard / Teachers / {isEditMode ? 'Edit Teacher' : 'Add Teacher'}</div>
            </div>

            <form className="form-container" key={id || 'new'}>
                {/* Personal Information */}
                <div className="form-section">
                    <div className="section-header">
                        <IconUser size={20} />
                        <h3 className="section-title">Personal Information</h3>
                    </div>
                    <div className="section-body">
                        <div className="image-upload-row">
                            <div className="image-preview">
                                {teacher?.avatar ? <img src={teacher.avatar} alt="Preview" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} /> : <IconUser size={40} />}
                            </div>
                            <div className="upload-actions">
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px' }}>Upload</button>
                                    <button type="button" className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', background: '#3b82f6', color: 'white' }}>Remove</button>
                                </div>
                                <span className="upload-text">Upload image size 4MB, Format JPG, PNG, SVG</span>
                            </div>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Teacher ID</label>
                                <input type="text" className="form-control" defaultValue={getVal('id')} placeholder="T849127" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">First Name</label>
                                <input type="text" className="form-control" defaultValue={getVal('name')} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Last Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Class</label>
                                <select className="form-control" defaultValue={getVal('class')}>
                                    <option>Select</option>
                                    <option value="III A">III A</option>
                                    <option value="II (A)">II (A)</option>
                                    <option value="VI (A)">VI (A)</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Subject</label>
                                <select className="form-control" defaultValue={getVal('subject')}>
                                    <option>Select</option>
                                    <option value="Physics">Physics</option>
                                    <option value="Computer">Computer</option>
                                    <option value="English">English</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Gender</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Primary Contact Number</label>
                                <input type="text" className="form-control" defaultValue={getVal('phone')} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <input type="email" className="form-control" defaultValue={getVal('email')} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Blood Group</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>O+</option>
                                    <option>A+</option>
                                    <option>B+</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date of Joining</label>
                                <input type="text" className="form-control" defaultValue={getVal('joinDate')} placeholder="DD Mon YYYY" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Father's Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Mother's Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Marital Status</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Qualification</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Work Experience</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Previous School if Any</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Previous School Address</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Previous School Phone No</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group grid-col-2">
                                <label className="form-label">Address</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group grid-col-2">
                                <label className="form-label">Permanent Address</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">PAN Number / ID Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Status</label>
                                <select className="form-control" defaultValue={getVal('status')}>
                                    <option>Select</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="form-group full-width">
                                <label className="form-label">Notes</label>
                                <textarea className="form-control" rows="3" placeholder="Other Information"></textarea>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payroll */}
                <div className="form-section">
                    <div className="section-header">
                        <IconCurrencyDollar size={20} />
                        <h3 className="section-title">Payroll</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">EPF No</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Basic Salary</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Contract Type</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Permanent</option>
                                    <option>Contract</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Work Shift</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Morning</option>
                                    <option>Evening</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Work Location</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Date of Leaving</label>
                                <input type="date" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Leaves */}
                <div className="form-section">
                    <div className="section-header">
                        <IconWalk size={20} />
                        <h3 className="section-title">Leaves</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Medical Leaves</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Casual Leaves</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Maternity Leaves</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Sick Leaves</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bank Account Detail */}
                <div className="form-section">
                    <div className="section-header">
                        <IconBuildingBank size={20} />
                        <h3 className="section-title">Bank Account Detail</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Account Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Account Number</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Bank Name</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">IFSC Code</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Branch Name</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transport Information */}
                <div className="form-section">
                    <div className="section-header">
                        <IconBus size={20} />
                        <h3 className="section-title">Transport Information</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Route</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Route 1</option>
                                    <option>Route 2</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Vehicle Number</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>VH001</option>
                                    <option>VH002</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Pickup Point</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Point A</option>
                                    <option>Point B</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hostel Information */}
                <div className="form-section">
                    <div className="section-header">
                        <IconBuilding size={20} />
                        <h3 className="section-title">Hostel Information</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Hostel</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>Hostel A</option>
                                    <option>Hostel B</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Room No</label>
                                <select className="form-control">
                                    <option>Select</option>
                                    <option>101</option>
                                    <option>102</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="form-section">
                    <div className="section-header">
                        <IconBrandFacebook size={20} />
                        <h3 className="section-title">Social Media Links</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group">
                                <label className="form-label">Facebook</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Instagram</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">LinkedIn</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Youtube</label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Twitter URL</label>
                                <input type="text" className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documents */}
                <div className="form-section">
                    <div className="section-header">
                        <IconFileText size={20} />
                        <h3 className="section-title">Documents</h3>
                    </div>
                    <div className="section-body">
                        <div className="form-grid">
                            <div className="form-group grid-col-2">
                                <label className="form-label">Upload Resume</label>
                                <div className="file-upload-control">
                                    <span className="file-hint">Upload image size of 4MB, Accepted Format PDF</span>
                                    <input type="file" className="form-control" />
                                </div>
                            </div>
                            <div className="form-group grid-col-2">
                                <label className="form-label">Upload Joining Letter</label>
                                <div className="file-upload-control">
                                    <span className="file-hint">Upload image size of 4MB, Accepted Format PDF</span>
                                    <input type="file" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Password - Only show if not edit mode? Or allow password reset. Usually optional in edit. */}
                {!isEditMode && (
                    <div className="form-section">
                        <div className="section-header">
                            <IconLock size={20} />
                            <h3 className="section-title">Password</h3>
                        </div>
                        <div className="section-body">
                            <div className="form-grid">
                                <div className="form-group grid-col-2">
                                    <label className="form-label">New Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                                <div className="form-group grid-col-2">
                                    <label className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                    <button type="button" className="btn btn-primary" onClick={(e) => { e.preventDefault(); navigate('/teachers/list'); }}>
                        {isEditMode ? 'Update Teacher' : 'Add Teacher'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTeacher;
