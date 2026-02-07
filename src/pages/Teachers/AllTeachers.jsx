import React from 'react';
import {
    IconSearch, IconFilter, IconSortAscending, IconGridDots, IconList,
    IconPlus, IconPrinter, IconDownload, IconRefresh, IconDotsVertical,
    IconPhone, IconMail, IconChevronDown, IconEye, IconEdit, IconLock,
    IconCircleOff, IconTrash
} from '@tabler/icons-react';
import './Teachers.css';

import { teachersData } from './teachersData';

import { useNavigate } from 'react-router-dom';

const AllTeachers = () => {
    const navigate = useNavigate();
    const [view, setView] = React.useState('grid');
    const [sortBy, setSortBy] = React.useState('Ascending');

    const [showSortMenu, setShowSortMenu] = React.useState(false);
    const [showFilterMenu, setShowFilterMenu] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(null);

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container') && !event.target.closest('.menu-btn') && !event.target.closest('.action-btn')) {
                setActiveMenu(null);
            }
            if (!event.target.closest('.sort-dropdown-container')) {
                setShowSortMenu(false);
            }
            if (!event.target.closest('.filter-dropdown-container')) {
                setShowFilterMenu(false);
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

    const ActionMenu = () => (
        <div className="action-menu">
            <div className="action-item" onClick={() => navigate(`/teachers/${activeMenu}`)}><IconEye size={16} /> View Teacher</div>
            <div className="action-item"><IconEdit size={16} /> Edit</div>
            <div className="action-item"><IconLock size={16} /> Login Details</div>
            <div className="action-item"><IconCircleOff size={16} /> Disable</div>
            <div className="action-item delete"><IconTrash size={16} /> Delete</div>
        </div>
    );


    // Sort logic
    const getSortedTeachers = () => {
        let sorted = [...teachersData];
        switch (sortBy) {
            case 'Ascending':
                return sorted.sort((a, b) => a.name.localeCompare(b.name));
            case 'Descending':
                return sorted.sort((a, b) => b.name.localeCompare(a.name));
            case 'Recently Added':
                return sorted.sort((a, b) => b.id.localeCompare(a.id)); // Assuming higher ID is newer
            case 'Recently Viewed':
                return sorted; // Placeholder
            default:
                return sorted;
        }
    };

    const teachers = getSortedTeachers();

    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(teachers.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTeachers = teachers.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="teachers-page">
            <div className="page-header-row">
                <div className="breadcrumb">
                    <h2>{view === 'grid' ? 'Teachers Grid' : 'Teachers List'}</h2>
                    <span>Dashboard / Peoples / {view === 'grid' ? 'Teachers' : 'Teachers List'}</span>
                </div>
                <div className="header-actions">
                    <button className="icon-btn"><IconRefresh size={20} /></button>
                    <button className="icon-btn"><IconPrinter size={20} /></button>
                    <button className="icon-btn"><IconDownload size={20} /> Export</button>
                    <button className="add-btn" onClick={() => navigate('/teachers/add')}><IconPlus size={20} /> Add Teacher</button>
                </div>
            </div>

            <div className="filters-bar">
                <div className="title-section">
                    <h3>{view === 'grid' ? 'Teachers Grid' : 'Teachers List'}</h3>
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
                                    <div className="filter-group-vertical">
                                        <label>Name</label>
                                        <select className="filter-select">
                                            <option>Select</option>
                                            {teachersData.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="filter-group-vertical">
                                        <label>Class</label>
                                        <select className="filter-select">
                                            <option>Select</option>
                                            {[...new Set(teachersData.map(t => t.class))].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="filter-group-vertical">
                                        <label>Status</label>
                                        <select className="filter-select">
                                            <option>Select</option>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="filter-footer">
                                    <button className="btn-reset">Reset</button>
                                    <button className="btn-apply">Apply</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="view-toggle">
                        <button
                            className={view === 'grid' ? 'active' : ''}
                            onClick={() => setView('grid')}
                        >
                            <IconGridDots size={18} />
                        </button>
                        <button
                            className={view === 'list' ? 'active' : ''}
                            onClick={() => setView('list')}
                        >
                            <IconList size={18} />
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
                    <select className="entries-select">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                    </select>
                    Entries
                </div>
                <div className="search-bar">
                    {/* Search logic if needed, currently implicit or part of filter */}
                    <input type="text" placeholder="Search" className="search-input" />
                </div>
            </div>

            {view === 'grid' ? (
                <div className="teachers-grid">
                    {currentTeachers.map(teacher => (
                        <div className="teacher-card" key={teacher.id}>
                            <div className="card-top-row">
                                <span className="teacher-id-link" onClick={() => navigate(`/teachers/${teacher.id}`)}>{teacher.id}</span>
                                <div className="card-actions-right">
                                    <span className={`status-pill ${teacher.status.toLowerCase()}`}>
                                        <span className="dot"></span> {teacher.status}
                                    </span>
                                    <button className="menu-dots-btn" onClick={() => toggleMenu(teacher.id)}>
                                        <IconDotsVertical size={16} />
                                    </button>
                                    {activeMenu === teacher.id && <ActionMenu />}
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
                                <button className="grid-view-btn" onClick={() => navigate(`/teachers/${teacher.id}`)}>
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
                                <th>ID <IconSortAscending size={12} /></th>
                                <th>Name <IconSortAscending size={12} /></th>
                                <th>Class <IconSortAscending size={12} /></th>
                                <th>Subject <IconSortAscending size={12} /></th>
                                <th>Email <IconSortAscending size={12} /></th>
                                <th>Phone <IconSortAscending size={12} /></th>
                                <th>Date of Join <IconSortAscending size={12} /></th>
                                <th>Status <IconSortAscending size={12} /></th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentTeachers.map(teacher => (
                                <tr key={teacher.id}>
                                    <td className="checkbox-col"><input type="checkbox" /></td>
                                    <td><span className="teacher-id-text" onClick={() => navigate(`/teachers/${teacher.id}`)}>{teacher.id}</span></td>
                                    <td>
                                        <div className="teacher-cell">
                                            <img src={teacher.avatar} alt={teacher.name} className="avatar-small" />
                                            <span className="name-text">{teacher.name}</span>
                                        </div>
                                    </td>
                                    <td>{teacher.class}</td>
                                    <td>{teacher.subject}</td>
                                    <td>{teacher.email}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.joinDate}</td>
                                    <td>
                                        <span className={`status-badge-pill ${teacher.status.toLowerCase()}`}>
                                            <span className="dot"></span> {teacher.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-menu-container">
                                            <button
                                                className="action-btn"
                                                onClick={() => toggleMenu(teacher.id)}
                                            >
                                                <IconDotsVertical size={18} />
                                            </button>
                                            {activeMenu === teacher.id && <ActionMenu />}
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
