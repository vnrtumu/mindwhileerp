import React from 'react';
import {
    IconSearch, IconFilter, IconSortAscending, IconGridDots, IconList,
    IconPlus, IconPrinter, IconDownload, IconRefresh, IconDotsVertical,
    IconPhone, IconMail, IconChevronDown, IconEye, IconEdit, IconLock,
    IconCircleOff, IconTrash, IconFileTypePdf, IconFileTypeXls, IconFileExport, IconChevronLeft,
    IconUserPlus, IconX
} from '@tabler/icons-react';
import './Teachers.css';

import { getTeachers, deleteTeacher, toggleTeacherStatus } from './teachersData';

import { useNavigate } from 'react-router';

const AllTeachers = ({ initialView = 'grid' }) => {
    const navigate = useNavigate();
    const [view, setView] = React.useState(initialView);
    const [sortBy, setSortBy] = React.useState('Ascending');
    const [teachersList, setTeachersList] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [filters, setFilters] = React.useState({ name: '', class: '', status: '' });
    const [tempFilters, setTempFilters] = React.useState({ name: '', class: '', status: '' });
    const [visibleColumns, setVisibleColumns] = React.useState({
        id: false,
        name: false,
        class: false,
        subject: false,
        email: false,
        phone: false,
        dateOfJoin: false,
        status: false
    });

    React.useEffect(() => {
        setTeachersList(getTeachers());
    }, []);

    const [showSortMenu, setShowSortMenu] = React.useState(false);
    const [showFilterMenu, setShowFilterMenu] = React.useState(false);
    const [showExportMenu, setShowExportMenu] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(null);
    const [showLoginModal, setShowLoginModal] = React.useState(false);
    const [selectedTeacher, setSelectedTeacher] = React.useState(null);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container') && !event.target.closest('.action-menu') && !event.target.closest('.menu-dots-btn') && !event.target.closest('.action-btn')) {
                setActiveMenu(null);
            }
            if (!event.target.closest('.sort-dropdown-container')) {
                setShowSortMenu(false);
            }
            if (!event.target.closest('.filter-dropdown-container')) {
                setShowFilterMenu(false);
            }
            if (!event.target.closest('.export-dropdown-container')) {
                setShowExportMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleMenu = (id) => {
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            setActiveMenu(id);
        }
    };

    const handleShowLoginDetails = (teacherId) => {
        const teacher = teachersList.find(t => t.id === teacherId);
        setSelectedTeacher(teacher);
        setShowLoginModal(true);
        setActiveMenu(null);
    };

    const ActionMenu = ({ teacherId, status }) => (
        <div className="action-menu">
            <div className="action-item" onClick={() => navigate(`/school/teachers/details/${teacherId}`)}><IconEye size={16} /> View Teacher</div>
            <div className="action-item" onClick={() => navigate(`/school/teachers/edit/${teacherId}`)}><IconEdit size={16} /> Edit</div>
            <div className="action-item" onClick={() => handleShowLoginDetails(teacherId)}><IconLock size={16} /> Login Details</div>
            <div className="action-item" onClick={() => handleToggleStatus(teacherId)}>
                <IconCircleOff size={16} /> {status === 'Active' ? 'Disable' : 'Enable'}
            </div>
            <div className="action-item delete" onClick={() => handleDelete(teacherId)}><IconTrash size={16} /> Delete</div>
        </div>
    );

    const LoginDetailsModal = () => {
        if (!selectedTeacher) return null;
        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3>Login Details</h3>
                        <button className="close-btn" onClick={() => setShowLoginModal(false)}><IconX size={20} /></button>
                    </div>
                    <div className="modal-body">
                        <div className="modal-profile-header">
                            <img src={selectedTeacher.avatar} alt={selectedTeacher.name} className="modal-avatar" />
                            <div>
                                <h4>{selectedTeacher.name}</h4>
                                <span>{selectedTeacher.class}</span>
                            </div>
                        </div>
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    <th>User Type</th>
                                    <th>User Name</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Parent</td>
                                    <td>parent_{selectedTeacher.id.toLowerCase()}</td>
                                    <td>parent@123</td>
                                </tr>
                                <tr>
                                    <td>Teacher</td>
                                    <td>teacher_{selectedTeacher.id.toLowerCase()}</td>
                                    <td>teacher@123</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                        <button className="btn-cancel" onClick={() => setShowLoginModal(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this teacher?')) {
            const updated = deleteTeacher(id);
            setTeachersList(updated);
            setActiveMenu(null);
        }
    };

    const handleToggleStatus = (id) => {
        const updated = toggleTeacherStatus(id);
        setTeachersList(updated);
        setActiveMenu(null);
    };

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        setShowFilterMenu(false);
        setCurrentPage(1);
    };

    const handleResetFilters = () => {
        const reset = { name: '', class: '', status: '' };
        setTempFilters(reset);
        setFilters(reset);
        setShowFilterMenu(false);
        setCurrentPage(1);
    };

    const toggleColumnVisibility = (column) => {
        setVisibleColumns(prev => ({
            ...prev,
            [column]: !prev[column]
        }));
    };

    // Helper function: if no columns are selected, show all columns
    const isColumnVisible = (column) => {
        const anySelected = Object.values(visibleColumns).some(val => val === true);
        if (!anySelected) {
            return true; // Show all columns if none are selected
        }
        return visibleColumns[column];
    };


    // Combined Search + Filter + Sort logic
    const getProcessedTeachers = () => {
        let items = [...teachersList];

        // 1. Search Filter
        if (searchTerm) {
            const lowTerm = searchTerm.toLowerCase();
            items = items.filter(t =>
                t.name.toLowerCase().includes(lowTerm) ||
                t.id.toLowerCase().includes(lowTerm) ||
                t.email.toLowerCase().includes(lowTerm)
            );
        }

        // 2. Dropdown Filters
        if (filters.name) {
            items = items.filter(t => t.name === filters.name);
        }
        if (filters.class) {
            items = items.filter(t => t.class === filters.class);
        }
        if (view === 'list' && filters.status) {
            items = items.filter(t => t.status === filters.status);
        }

        // 3. Sort
        switch (sortBy) {
            case 'Ascending':
                return items.sort((a, b) => a.name.localeCompare(b.name));
            case 'Descending':
                return items.sort((a, b) => b.name.localeCompare(a.name));
            case 'Recently Added':
                return items.sort((a, b) => b.id.localeCompare(a.id));
            default:
                return items;
        }
    };

    const teachers = getProcessedTeachers();

    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemsPerPage, setItemsPerPage] = React.useState(10);
    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeachers = teachers.slice(indexOfFirstItem, indexOfLastItem);

    const handleExportExcel = () => {
        const headers = ['ID', 'Name', 'Class', 'Subject', 'Email', 'Phone', 'Join Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...teachers.map(t => [
                t.id,
                `"${t.name}"`,
                `"${t.class}"`,
                `"${t.subject}"`,
                t.email,
                `"${t.phone}"`,
                t.joinDate,
                t.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `teachers_list_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setShowExportMenu(false);
    };

    const handleExportPDF = () => {
        window.print();
        setShowExportMenu(false);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="teachers-page">
            <div className="page-header-row">
                <div className="breadcrumb">
                    <h2>{initialView === 'grid' ? 'Teachers' : 'Teachers List'}</h2>
                    <span>Dashboard / Peoples / {initialView === 'grid' ? 'Teachers' : 'Teachers List'}</span>
                </div>
                <div className="header-actions">
                    <button className="icon-btn"><IconRefresh size={20} /></button>
                    <button className="icon-btn" onClick={() => window.print()}><IconPrinter size={20} /></button>
                    <div className="export-dropdown-container">
                        <button
                            className={`icon-btn export-btn ${showExportMenu ? 'active' : ''}`}
                            onClick={() => setShowExportMenu(!showExportMenu)}
                        >
                            <IconFileExport size={20} /> Export <IconChevronDown size={16} />
                        </button>
                        {showExportMenu && (
                            <div className="export-menu">
                                <button
                                    className="export-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleExportPDF();
                                    }}
                                >
                                    <IconFileTypePdf size={18} /> Export as PDF
                                </button>
                                <button
                                    className="export-item"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleExportExcel();
                                    }}
                                >
                                    <IconFileTypeXls size={18} /> Export as Excel
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="add-btn" onClick={() => navigate('/school/teachers/add')}><IconUserPlus size={20} /> Add Teacher</button>
                </div>
            </div>

            {showLoginModal && <LoginDetailsModal />}

            <div className="filters-bar">
                <div className="title-section">
                    <h3>{initialView === 'grid' ? 'Teachers Grid' : 'Teachers List'}</h3>
                </div>
                <div className="controls-section">
                    <div className="date-range">
                        📅 01/30/2026 - 02/05/2026
                    </div>
                    <div className="filter-dropdown-container">
                        <div
                            className={`filter-dropdown ${showFilterMenu ? 'active' : ''}`}
                            onClick={() => setShowFilterMenu(!showFilterMenu)}
                        >
                            <IconFilter size={18} /> Filter <IconChevronDown size={16} />
                        </div>
                        {showFilterMenu && (
                            <div className="filter-menu">
                                <div className="filter-header">
                                    <h3>Filter</h3>
                                </div>
                                <div className="filter-body">
                                    {view === 'list' && (
                                        <div className="filter-section">
                                            <label className="filter-section-label">Show Columns</label>
                                            <div className="column-checkboxes">
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.id}
                                                        onChange={() => toggleColumnVisibility('id')}
                                                    />
                                                    <span>ID</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.name}
                                                        onChange={() => toggleColumnVisibility('name')}
                                                    />
                                                    <span>Name</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.class}
                                                        onChange={() => toggleColumnVisibility('class')}
                                                    />
                                                    <span>Class</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.subject}
                                                        onChange={() => toggleColumnVisibility('subject')}
                                                    />
                                                    <span>Subject</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.email}
                                                        onChange={() => toggleColumnVisibility('email')}
                                                    />
                                                    <span>Email</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.phone}
                                                        onChange={() => toggleColumnVisibility('phone')}
                                                    />
                                                    <span>Phone</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.dateOfJoin}
                                                        onChange={() => toggleColumnVisibility('dateOfJoin')}
                                                    />
                                                    <span>Date of Join</span>
                                                </label>
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={visibleColumns.status}
                                                        onChange={() => toggleColumnVisibility('status')}
                                                    />
                                                    <span>Status</span>
                                                </label>
                                            </div>
                                        </div>
                                    )}
                                    <div className="filter-group-vertical">
                                        <label>Name</label>
                                        <select
                                            className="filter-select"
                                            value={tempFilters.name}
                                            onChange={(e) => setTempFilters({ ...tempFilters, name: e.target.value })}
                                        >
                                            <option value="">Select</option>
                                            {teachersList.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="filter-group-vertical">
                                        <label>Class</label>
                                        <select
                                            className="filter-select"
                                            value={tempFilters.class}
                                            onChange={(e) => setTempFilters({ ...tempFilters, class: e.target.value })}
                                        >
                                            <option value="">Select</option>
                                            {[...new Set(teachersList.map(t => t.class))].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    {view === 'list' && (
                                        <div className="filter-group-vertical">
                                            <label>Status</label>
                                            <select
                                                className="filter-select"
                                                value={tempFilters.status}
                                                onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                                            >
                                                <option value="">Select</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                                <div className="filter-footer">
                                    <button className="btn-reset" onClick={handleResetFilters}>Reset</button>
                                    <button className="btn-apply" onClick={handleApplyFilters}>Apply</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="view-toggle">
                        <button
                            className={view === 'list' ? 'active' : ''}
                            onClick={() => setView('list')}
                        >
                            <IconList size={18} />
                        </button>
                        <button
                            className={view === 'grid' ? 'active' : ''}
                            onClick={() => setView('grid')}
                        >
                            <IconGridDots size={18} />
                        </button>
                    </div>
                    <div className="sort-dropdown-container">
                        <div
                            className="sort-dropdown"
                            onClick={() => setShowSortMenu(!showSortMenu)}
                        >
                            <IconSortAscending size={18} /> {sortBy === 'Ascending' ? 'Sort by A-Z' : (sortBy === 'Descending' ? 'Sort by Z-A' : sortBy)} <IconChevronDown size={16} />
                        </div>
                        {showSortMenu && (
                            <div className="dropdown-menu">
                                {['Ascending', 'Descending', 'Recently Viewed', 'Recently Added'].map(option => (
                                    <div
                                        key={option}
                                        className={`dropdown-item ${sortBy === option ? 'active' : ''}`}
                                        onClick={() => {
                                            setSortBy(option);
                                            setShowSortMenu(false);
                                        }}
                                    >
                                        {option === 'Ascending' ? 'Name (A-Z)' : (option === 'Descending' ? 'Name (Z-A)' : option)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Row Per Page Selector for List View (Visual Placeholder usually, or functional) */}
            <div className="table-controls-row">
                <div className="entries-selector">
                    Row Per Page
                    <select
                        className="entries-select"
                        value={itemsPerPage}
                        onChange={(e) => {
                            setItemsPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    Entries
                </div>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {view === 'grid' ? (
                <div className="teachers-grid">
                    {currentTeachers.map(teacher => (
                        <div className="teacher-card" key={teacher.id}>
                            <div className="card-top-row">
                                <span className="teacher-id-link" onClick={() => navigate(`/school/teachers/details/${teacher.id}`)}>{teacher.id}</span>
                                <div className="card-actions-right">
                                    <span className={`status-pill ${teacher.status.toLowerCase()}`}>
                                        <span className="dot"></span> {teacher.status}
                                    </span>
                                    <button className="menu-dots-btn" onClick={() => toggleMenu(teacher.id)}>
                                        <IconDotsVertical size={16} />
                                    </button>
                                    {activeMenu === teacher.id && <ActionMenu teacherId={teacher.id} status={teacher.status} />}
                                </div>
                            </div>

                            <div className="card-profile-section">
                                <img src={teacher.avatar} alt={teacher.name} className="grid-avatar" />
                                <h3 className="grid-name">{teacher.name}</h3>
                                <span className="grid-class">{teacher.class}</span>
                            </div>

                            <div className="card-info-section">
                                <div className="info-line">
                                    <span>Email</span>
                                    <span className="val">{teacher.email}</span>
                                </div>
                                <div className="info-line">
                                    <span>Phone</span>
                                    <span className="val">{teacher.phone}</span>
                                </div>
                            </div>

                            <div className="card-bottom-row">
                                <span className={`subject-tag ${teacher.subject.toLowerCase().replace(' ', '-')}`}>
                                    {teacher.subject}
                                </span>
                                <button className="grid-view-btn" onClick={() => navigate(`/school/teachers/details/${teacher.id}`)}>
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="teachers-list-container">
                    <table className="teachers-table">
                        <thead>
                            <tr>
                                <th className="checkbox-col"><input type="checkbox" /></th>
                                {isColumnVisible('id') && <th>ID <IconSortAscending size={12} /></th>}
                                {isColumnVisible('name') && <th>Name <IconSortAscending size={12} /></th>}
                                {isColumnVisible('class') && <th>Class <IconSortAscending size={12} /></th>}
                                {isColumnVisible('subject') && <th>Subject <IconSortAscending size={12} /></th>}
                                {isColumnVisible('email') && <th>Email <IconSortAscending size={12} /></th>}
                                {isColumnVisible('phone') && <th>Phone <IconSortAscending size={12} /></th>}
                                {isColumnVisible('dateOfJoin') && <th>Date of Join <IconSortAscending size={12} /></th>}
                                {isColumnVisible('status') && <th>Status <IconSortAscending size={12} /></th>}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTeachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td className="checkbox-col"><input type="checkbox" /></td>
                                    {isColumnVisible('id') && (
                                        <td><span className="teacher-id-text" onClick={() => navigate(`/school/teachers/details/${teacher.id}`)}>{teacher.id}</span></td>
                                    )}
                                    {isColumnVisible('name') && (
                                        <td>
                                            <div className="teacher-cell">
                                                <img src={teacher.avatar} alt={teacher.name} className="avatar-small" />
                                                <span className="name-text">{teacher.name}</span>
                                            </div>
                                        </td>
                                    )}
                                    {isColumnVisible('class') && <td>{teacher.class}</td>}
                                    {isColumnVisible('subject') && <td>{teacher.subject}</td>}
                                    {isColumnVisible('email') && <td>{teacher.email}</td>}
                                    {isColumnVisible('phone') && <td>{teacher.phone}</td>}
                                    {isColumnVisible('dateOfJoin') && <td>{teacher.joinDate}</td>}
                                    {isColumnVisible('status') && (
                                        <td>
                                            <span className={`status-badge-pill ${teacher.status.toLowerCase()}`}>
                                                <span className="dot"></span> {teacher.status}
                                            </span>
                                        </td>
                                    )}
                                    <td>
                                        <div className="action-menu-container">
                                            <button
                                                className="action-btn"
                                                onClick={() => toggleMenu(teacher.id)}
                                            >
                                                <IconDotsVertical size={18} />
                                            </button>
                                            {activeMenu === teacher.id && <ActionMenu teacherId={teacher.id} status={teacher.status} />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <div className="pagination-container">
                <span
                    className={`pagination-info ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                >
                    Previous
                </span>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                        key={number}
                        className={`page-btn ${currentPage === number ? 'active' : ''}`}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </button>
                ))}
                <span
                    className={`pagination-info ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                >
                    Next
                </span>
            </div>
        </div>
    );
};

export default AllTeachers;
