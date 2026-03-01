import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconCalendar, IconClock, IconMapPin, IconChevronLeft, IconDownload,
    IconChevronDown, IconFileTypePdf, IconFileTypeXls, IconFilter
} from '@tabler/icons-react';
import { StudentContext } from '../../../context/StudentContext';
import { ScheduleContext } from '../../../context/ScheduleContext';
import '../Transport/ManageStudentTransport.css';
import './ExamSchedule.css';

const ExamSchedule = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

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

    const { schedules, addSchedule, updateSchedule, deleteSchedule } = React.useContext(ScheduleContext);

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
            updateSchedule(editingId, { id: editingId, ...formData });
        } else {
            addSchedule({
                id: Date.now(), // Use timestamp for unique ID
                ...formData
            });
        }
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this schedule?')) {
            deleteSchedule(id);
        }
    };

    const handlePrint = () => {
        window.print();
        setShowExportMenu(false);
    };

    const handleExportCSV = () => {
        try {
            console.log('Export clicked');
            if (!filteredData || filteredData.length === 0) {
                alert('No data to export!');
                return;
            }

            // Define CSV headers
            const headers = ['Exam', 'Class', 'Section', 'Subject', 'Date', 'Time From', 'Time To', 'Room No'];

            // Convert data to CSV format
            const csvContent = [
                headers.join(','),
                ...filteredData.map(item => [
                    item.exam || '',
                    item.class || '',
                    item.section || '',
                    item.subject || '',
                    item.date || '',
                    item.timeFrom || '',
                    item.timeTo || '',
                    item.roomNo || ''
                ].map(field => `"${field}"`).join(',')) // Quote fields to handle commas
            ].join('\n');

            // Create a blob and link to download
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'exam_schedule_export.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                alert('Browser does not support download attribute');
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Export failed: ' + error.message);
        }
        setShowExportMenu(false);
    };

    return (
        <div className="page-wrapper">
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

            {/* Filters */}


            <div className="card shadow-soft border-0 overflow-hidden mt-6">
                <div className="premium-header-banner">
                    <h4 className="mb-0">Exam Schedule List</h4>
                </div>

                <div className="table-toolbar-premium">
                    <div className="flex gap-4 items-center">
                        <div className="search-pill-wrapper">
                            <IconSearch size={18} className="search-icon-pill" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="search-input-pill"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="filter-button-group">
                            <select
                                className="export-btn"
                                style={{ height: '48px', borderRadius: '24px', paddingLeft: '20px', paddingRight: '40px', appearance: 'none' }}
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                            >
                                <option value="">All Classes</option>
                                {classesList.map((cls, idx) => (
                                    <option key={idx} value={cls}>{cls}</option>
                                ))}
                            </select>
                            <select
                                className="export-btn"
                                style={{ height: '48px', borderRadius: '24px', paddingLeft: '20px', paddingRight: '40px', appearance: 'none' }}
                                value={selectedSection}
                                onChange={(e) => setSelectedSection(e.target.value)}
                            >
                                <option value="">All Sections</option>
                                {sectionsList.map((sec, idx) => (
                                    <option key={idx} value={sec}>{sec}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="export-button-group">
                        <button className="export-btn">Copy</button>
                        <button className="export-btn" onClick={handleExportCSV}>CSV</button>
                        <button className="export-btn">Excel</button>
                        <button className="export-btn">PDF</button>
                        <button className="export-btn" onClick={handlePrint}>Print</button>
                        <div className="filter-dropdown-btn">
                            <IconFilter size={16} />
                            <span>Filter</span>
                            <IconChevronDown size={14} />
                        </div>
                    </div>
                </div>

                <div className="table-wrap px-0">
                    <table className="premium-table-v2">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Exam</th>
                                <th>Class (Section)</th>
                                <th>Subject</th>
                                <th>Date & Time</th>
                                <th>Room No</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length > 0 ? (
                                filteredData.map((item, index) => (
                                    <tr key={item.id} className="table-row-v2">
                                        <td>{index + 1}</td>
                                        <td><div className="font-semibold text-slate-700">{item.exam}</div></td>
                                        <td>
                                            <span className="text-slate-600 font-medium">{item.class} ({item.section})</span>
                                        </td>
                                        <td>
                                            <span className="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-bold">
                                                {item.subject}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-500 font-medium">
                                                    <IconCalendar size={14} />
                                                    {formatDate(item.date)}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                    <IconClock size={14} />
                                                    {item.timeFrom} - {item.timeTo}
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-2 text-slate-600">
                                                <IconMapPin size={14} />
                                                {item.roomNo}
                                            </div>
                                        </td>
                                        <td className="text-center">
                                            <div className="action-button-flex">
                                                <button className="action-icon-btn edit" title="Edit" onClick={() => handleOpenEditModal(item)}>
                                                    <IconEdit size={16} />
                                                </button>
                                                <button className="action-icon-btn delete" title="Delete" onClick={() => handleDelete(item.id)}>
                                                    <IconTrash size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center p-12 text-slate-400 italic">
                                        No exam schedules found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Modal */}
            {
                showModal && (
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
                )
            }
        </div >
    );
};

export default ExamSchedule;
