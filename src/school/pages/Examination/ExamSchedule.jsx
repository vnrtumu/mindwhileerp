import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconCalendar, IconClock, IconMapPin, IconChevronLeft, IconChevronDown
} from '@tabler/icons-react';
import '../Accounts/Accounts.css';

const ExamSchedule = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        exam: '',
        class: '',
        section: '',
        subject: '',
        date: '',
        timeFrom: '',
        timeTo: '',
        roomNo: ''
    });

    const [schedules, setSchedules] = useState([
        { id: 1, exam: 'FA-1', class: '10th class', section: 'A', subject: 'Mathematics', date: '2025-06-08', timeFrom: '09:00', timeTo: '12:00', roomNo: '101' },
        { id: 2, exam: 'FA-1', class: '10th class', section: 'A', subject: 'Science', date: '2025-06-09', timeFrom: '09:00', timeTo: '12:00', roomNo: '102' },
        { id: 3, exam: 'SA-1', class: '9th class', section: 'B', subject: 'English', date: '2025-06-15', timeFrom: '10:00', timeTo: '01:00', roomNo: '203' },
    ]);

    const classesList = ['1st class', '2nd class', '3rd class', '4th class', '5th class', '6th class', '7th class', '8th class', '9th class', '10th class'];
    const sectionsList = ['A', 'B', 'C'];
    const examsList = ['FA-1', 'FA-2', 'SA-1', 'SA-2'];
    const subjectsList = ['Mathematics', 'Science', 'English', 'History', 'Geography', 'Hindi', 'Telugu'];

    const filteredData = schedules.filter(item => {
        const matchesClass = selectedClass ? item.class === selectedClass : true;
        const matchesSection = selectedSection ? item.section === selectedSection : true;
        const matchesSearch = item.exam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.subject.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesClass && matchesSection && matchesSearch;
    });

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleOpenAddModal = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData({
            exam: '',
            class: selectedClass || '',
            section: selectedSection || '',
            subject: '',
            date: '',
            timeFrom: '',
            timeTo: '',
            roomNo: ''
        });
        setShowModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({ ...item });
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setSchedules(schedules.map(item =>
                item.id === editingId ? { ...item, ...formData } : item
            ));
        } else {
            const newSchedule = {
                id: schedules.length + 1,
                ...formData
            };
            setSchedules([...schedules, newSchedule]);
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            setSchedules(schedules.filter(item => item.id !== id));
        }
    };

    return (
        <div className="accounts-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <div className="d-flex align-items-center gap-2">
                        <button className="action-btn" onClick={() => navigate('/school/exam/dashboard')}>
                            <IconChevronLeft size={20} />
                        </button>
                        <h4>Exam Schedule</h4>
                    </div>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span>Exam</span> / <span className="current">Schedule</span>
                    </nav>
                </div>
                <button className="btn-primary" onClick={() => navigate('/school/exam/schedule/add')}>
                    <IconPlus size={18} />
                    Add Schedule
                </button>
            </div>

            {/* Criteria Selection Row */}
            <div className="exam-redesign-container">
                <div className="criteria-row-side-by-side">
                    <div className="criteria-column">
                        <label className="criteria-label">Class :</label>
                        <div className="section-select-wrapper">
                            <select
                                className="select-minimal"
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">Select Class</option>
                                {classesList.map((cls, idx) => (
                                    <option key={idx} value={cls}>{cls}</option>
                                ))}
                            </select>
                            <IconChevronDown size={16} className="dropdown-icon" />
                        </div>
                    </div>

                    <div className="criteria-column">
                        <label className="criteria-label">Section :</label>
                        <div className="section-select-wrapper">
                            <select
                                className="select-minimal"
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                            >
                                <option value="">Select Section</option>
                                {sectionsList.map((sec, idx) => (
                                    <option key={idx} value={sec}>{sec}</option>
                                ))}
                            </select>
                            <IconChevronDown size={16} className="dropdown-icon" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Schedule List Card */}
            <div className="accounts-card">
                <div className="card-header">
                    <h5>Exam Schedules</h5>
                    <div className="header-actions">
                        <button className="btn-outline">Download PDF</button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="filters-row">
                        <div className="search-box">
                            <IconSearch size={18} />
                            <input
                                type="text"
                                placeholder="Search by exam or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Exam</th>
                                    <th>Class (Section)</th>
                                    <th>Subject</th>
                                    <th>Date & Time</th>
                                    <th>Room No</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td><span className="item-name">{item.exam}</span></td>
                                            <td>{item.class} ({item.section})</td>
                                            <td><span className="head-badge">{item.subject}</span></td>
                                            <td>
                                                <div className="item-info">
                                                    <div className="date-cell">
                                                        <IconCalendar size={14} />
                                                        {formatDate(item.date)}
                                                    </div>
                                                    <div className="date-cell" style={{ marginTop: '2px' }}>
                                                        <IconClock size={14} />
                                                        {item.timeFrom} - {item.timeTo}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="date-cell">
                                                    <IconMapPin size={14} />
                                                    {item.roomNo}
                                                </div>
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
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center p-5 text-muted">
                                            No exam schedules found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Edit Schedule' : 'Add Schedule'}</h3>
                            <button className="close-btn" onClick={() => setShowModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Exam <span style={{ color: '#ea5455' }}>*</span></label>
                                    <select
                                        required
                                        value={formData.exam}
                                        onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                                    >
                                        <option value="">Select Exam</option>
                                        {examsList.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Subject <span style={{ color: '#ea5455' }}>*</span></label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="">Select Subject</option>
                                        {subjectsList.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Class <span style={{ color: '#ea5455' }}>*</span></label>
                                    <select
                                        required
                                        value={formData.class}
                                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                                    >
                                        <option value="">Select Class</option>
                                        {classesList.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Section <span style={{ color: '#ea5455' }}>*</span></label>
                                    <select
                                        required
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                    >
                                        <option value="">Select Section</option>
                                        {sectionsList.map(sec => <option key={sec} value={sec}>{sec}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Date <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="date"
                                    required
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Start Time <span style={{ color: '#ea5455' }}>*</span></label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.timeFrom}
                                        onChange={(e) => setFormData({ ...formData, timeFrom: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>End Time <span style={{ color: '#ea5455' }}>*</span></label>
                                    <input
                                        type="time"
                                        required
                                        value={formData.timeTo}
                                        onChange={(e) => setFormData({ ...formData, timeTo: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>Room No <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. 101"
                                    required
                                    value={formData.roomNo}
                                    onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                                />
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit">
                                    {isEditing ? 'Save Changes' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamSchedule;
