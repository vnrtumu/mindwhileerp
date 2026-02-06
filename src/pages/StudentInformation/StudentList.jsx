import React, { useContext } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { useNavigate } from 'react-router-dom';
import './StudentList.css';
import { EyeIcon, EditIcon, BanIcon, SortIcon, PlaceholderAvatar } from '../../components/Icons';

const StudentList = () => {
    const navigate = useNavigate();
    const { students, disablingIds } = useContext(StudentContext);

    return (
        <div className="student-list-page">
            <div className="container">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Students</h4>
                    <nav className="breadcrumb">
                        <span>Student Management</span> / <span className="current">Students</span>
                    </nav>
                </div>
                <div className="page-header-actions">
                    <button 
                        onClick={() => navigate('/student-info/student-list/add')}
                        className="btn btn-primary"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Student
                    </button>
                </div>
            </div>

                        {/* Empty State or Table */}
                        {students.length === 0 ? (
                            <div className="empty-state-container">
                                    <div className="empty-state-card">
                                            <div className="empty-state-icon">
                                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                            <circle cx="12" cy="7" r="4"></circle>
                                                    </svg>
                                            </div>
                                            <h3>No Students Yet</h3>
                                            <p>Start by adding your first student to the system</p>
                                            <button 
                                                    onClick={() => navigate('/student-info/student-list/add')}
                                                    className="btn btn-primary btn-large"
                                            >
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="12" y1="5" x2="12" y2="19"></line>
                                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                                    </svg>
                                                    Add First Student
                                            </button>
                                    </div>
                            </div>
                        ) : (
                            <div className="card soft-card fade-in">
                                <div className="table-toolbar">
                                    <div><strong>{students.length}</strong> students</div>
                                    <div className="toolbar-actions">
                                        {/* Placeholder for search/pagination/export controls */}
                                    </div>
                                </div>

                                <div className="table-wrap">
                                <table className="students-table">
                                    <thead>
                                        <tr>
                                            <th className="col-adm">Adm No. <SortIcon /></th>
                                            <th className="col-photo">Photo</th>
                                            <th className="col-name">Name <SortIcon /></th>
                                            <th className="col-class">Class <SortIcon /></th>
                                            <th className="col-father">Father Name</th>
                                            <th className="col-phone">Father Phone</th>
                                            <th className="col-assigned">Total Assigned</th>
                                            <th className="col-due">Total Due</th>
                                            <th className="col-actions">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map(s => (
                                            <tr key={s.id} className="table-row">
                                                <td className="adm">{s.admissionNo || s.id || '—'}</td>
                                                <td className="photo">
                                                    {s.image ? (
                                                        <img src={s.image} alt={s.name} className="avatar" />
                                                    ) : (
                                                        <PlaceholderAvatar gender={s.gender} size={40} />
                                                    )}
                                                </td>
                                                <td className="name">{s.name || '—'}</td>
                                                <td className="class">{s.class || s.className || '—'}</td>
                                                <td className="father">{s.fatherName || '—'}</td>
                                                <td className="phone">{s.fatherPhone || s.phone || '—'}</td>
                                                <td className="assigned">{s.totalAssigned != null ? `₹ ${s.totalAssigned.toFixed(2)}` : '—'}</td>
                                                <td className="due">
                                                    {s.totalDue == null ? '—' : (
                                                        <span className={`badge ${s.totalDue > 0 ? 'badge-danger' : 'badge-success'}`}>{s.totalDue > 0 ? `₹ ${s.totalDue.toFixed(2)}` : 'No Due'}</span>
                                                    )}
                                                </td>
                                                <td className="actions">
                                                    <button className="icon-btn icon-view" title="View" onClick={() => navigate(`/student-info/student-list/profile/${s.id}`)}>
                                                        <EyeIcon />
                                                    </button>
                                                    <button className="icon-btn icon-edit" title="Edit" onClick={() => navigate('/student-info/student-list/add', { state: { editId: s.id } })}>
                                                        <EditIcon />
                                                    </button>
                                                    <button className="icon-btn icon-disable" title="Disable" onClick={() => navigate(`/student-info/student-list/disable/${s.id}`)} disabled={disablingIds.includes(s.id)}>
                                                        <BanIcon />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        )}
            </div>
        </div>
    );
};

export default StudentList;
