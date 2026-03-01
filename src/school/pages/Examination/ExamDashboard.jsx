import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconPlus, IconSearch, IconEdit, IconTrash,
    IconCalendar, IconClipboardList, IconDownload, IconUserCheck,
    IconFileTypePdf, IconFileTypeXls, IconChevronDown, IconFilter
} from '@tabler/icons-react';
import '../Transport/ManageStudentTransport.css';

const ExamDashboard = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [showExportMenu, setShowExportMenu] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        note: ''
    });

    const [examsData, setExamsData] = useState([
        { id: 1, name: 'FA-1', date: '2025-06-08', note: 'test' },
        { id: 2, name: 'FA-2', date: '2025-06-10', note: '' },
        { id: 3, name: 'FA-3', date: '2025-06-30', note: '' },
        { id: 4, name: 'FA5', date: '2025-11-29', note: '' },
        { id: 5, name: 'SA-1', date: '2025-06-15', note: '' }
    ]);

    const filteredData = examsData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        setFormData({ name: '', date: '', note: '' });
        setShowAddModal(true);
    };

    const handleOpenEditModal = (item) => {
        setIsEditing(true);
        setEditingId(item.id);
        setFormData({
            name: item.name,
            date: item.date,
            note: item.note
        });
        setShowAddModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setExamsData(examsData.map(item =>
                item.id === editingId ? { ...item, ...formData } : item
            ));
        } else {
            const newExam = {
                id: examsData.length + 1,
                ...formData
            };
            setExamsData([...examsData, newExam]);
        }
        setShowAddModal(false);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this exam?')) {
            setExamsData(examsData.filter(item => item.id !== id));
        }
    };

    const handlePrint = () => {
        window.print();
        setShowExportMenu(false);
    };

    const handleExportCSV = () => {
        // Mock data export for dashboard (or actual data if available)
        const headers = ['Exam', 'Class', 'Section', 'Date'];
        const csvContent = [
            headers.join(','),
            // Example data - replace with actual state if available
            'FA-1,10th,A,2025-06-08',
            'SA-1,9th,B,2025-06-15'
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'exam_dashboard_export.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        setShowExportMenu(false);
    };

    return (
        <div className="accounts-page">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-title">
                    <h4>Exam</h4>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span className="current">Exam</span>
                    </nav>
                </div>
                <button className="btn-primary" onClick={handleOpenAddModal}>
                    <IconPlus size={18} />
                    Add a exam
                </button>
            </div>

            {/* Stats row */}
            <div className="stats-row">
                <div className="stat-card income">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #e8f4ff 0%, #d6ebff 100%)', color: '#3d5ee1' }}>
                        <IconClipboardList size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Total Exams</span>
                        <h3 className="stat-value">{examsData.length}</h3>
                    </div>
                </div>
                <div className="stat-card transactions">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fff5e8 0%, #ffe8cc 100%)', color: '#ff9f43' }}>
                        <IconCalendar size={24} />
                    </div>
                    <div className="stat-info">
                        <span className="stat-label">Upcoming Exams</span>
                        <h3 className="stat-value">{examsData.filter(e => new Date(e.date) > new Date()).length}</h3>
                    </div>
                </div>
            </div>

            <div className="card shadow-soft border-0 overflow-hidden mt-6">
                <div className="premium-header-banner">
                    <h4 className="mb-0">Exam List</h4>
                </div>

                <div className="table-toolbar-premium">
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
                                <th>Exam Name</th>
                                <th>Date</th>
                                <th>Note</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => (
                                <tr key={item.id} className="table-row-v2">
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="font-semibold text-slate-700">{item.name}</div>
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 text-slate-500 font-medium">
                                            <IconCalendar size={14} />
                                            {formatDate(item.date)}
                                        </div>
                                    </td>
                                    <td>
                                        <span className="text-slate-400 italic text-xs">{item.note || 'No notes added'}</span>
                                    </td>
                                    <td className="text-center">
                                        <div className="action-button-flex">
                                            <button
                                                className="action-icon-btn view"
                                                title="Assign Exam"
                                                onClick={() => navigate('/school/exam/assign', { state: { exam: item } })}
                                            >
                                                <IconUserCheck size={16} />
                                            </button>
                                            <button
                                                className="action-icon-btn edit"
                                                title="Edit"
                                                onClick={() => handleOpenEditModal(item)}
                                            >
                                                <IconEdit size={16} />
                                            </button>
                                            <button
                                                className="action-icon-btn delete"
                                                title="Delete"
                                                onClick={() => handleDelete(item.id)}
                                            >
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

            {/* Add/Edit Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal-content add-income-modal">
                        <div className="modal-header">
                            <h3>{isEditing ? 'Edit Exam' : 'Add Exam'}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleSubmit}>
                            <div className="form-group full-width">
                                <label>Exam Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="Enter exam name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
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
                            <div className="form-group full-width">
                                <label>Note</label>
                                <textarea
                                    placeholder="Enter note"
                                    rows="4"
                                    value={formData.note}
                                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
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

export default ExamDashboard;
