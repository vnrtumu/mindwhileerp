import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicsContext } from '../../../context/AcademicsContext';
import {
    IconPlus,
    IconEdit,
    IconTrash,
    IconHome,
    IconClipboardList,
    IconDeviceDesktop,
    IconSearch,
    IconCalendar,
    IconCopy,
    IconFileText,
    IconTable,
    IconFile as IconPdf,
    IconPrinter,
    IconEye,
    IconPencil,
    IconSelector,
    IconFilter,
    IconChevronDown,
    IconStar,
    IconUsers
} from '@tabler/icons-react';
import './Academics.css';

const Homework = () => {
    const { classes, sections, subjects, homework, deleteHomework } = useContext(AcademicsContext);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRows, setSelectedRows] = useState([]);
    const [viewingHomework, setViewingHomework] = useState(null);

    // Filter States
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [filters, setFilters] = useState({ class: '', section: '', status: '' });
    const [tempFilters, setTempFilters] = useState({ class: '', section: '', status: '' });
    const [visibleColumns, setVisibleColumns] = useState({
        id: true,
        class: true,
        section: true,
        subject: true,
        homeworkDate: true,
        submissionDate: true,
        evaluationDate: true,
        status: true
    });

    const filteredHomework = homework.filter(h => {
        const matchesSearch = h.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            h.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
            h.section.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesClass = !filters.class || h.class === filters.class;
        const matchesSection = !filters.section || h.section === filters.section;
        const matchesStatus = !filters.status || (h.academicStatus || 'Active') === filters.status;

        return matchesSearch && matchesClass && matchesSection && matchesStatus;
    });

    const toggleColumnVisibility = (column) => {
        setVisibleColumns(prev => ({ ...prev, [column]: !prev[column] }));
    };

    const handleApplyFilters = () => {
        setFilters(tempFilters);
        setShowFilterMenu(false);
    };

    const handleResetFilters = () => {
        const reset = { class: '', section: '', status: '' };
        setTempFilters(reset);
        setFilters(reset);
        setShowFilterMenu(false);
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedRows(filteredHomework.map(hw => hw.id));
        } else {
            setSelectedRows([]);
        }
    };

    const toggleSelectRow = (id) => {
        setSelectedRows(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleCopy = () => {
        const text = filteredHomework.map(hw => `${hw.id}\t${hw.class}\t${hw.section}\t${hw.subject}\t${hw.homeworkDate}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('Table data copied to clipboard!');
    };

    const handleExportCSV = () => {
        const headers = ['ID', 'Class', 'Section', 'Subject', 'Homework Date', 'Submission Date', 'Status'];
        const csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + filteredHomework.map(hw => `${hw.id},"${hw.class}","${hw.section}","${hw.subject}",${hw.homeworkDate},${hw.submissionDate},${hw.academicStatus || 'Active'}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "homework_assignments.csv");
        document.body.appendChild(link);
        link.click();
    };

    const handleExportExcel = () => {
        alert('Export to Excel functionality not yet implemented.');
    };

    const handleExportPDF = () => {
        alert('Export to PDF functionality not yet implemented.');
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="academics-page" style={{ padding: '28px 20px', minHeight: '100vh' }}>
            <div style={{ maxWidth: 'none', width: '100%' }}>
                {/* Page Header */}
                <div className="page-header">
                    <div className="page-title">
                        <h4>Homework</h4>
                        <nav className="breadcrumb">
                            <span>Dashboard</span> / <span>Academics</span> / <span className="current">Homework</span>
                        </nav>
                    </div>
                    <div className="page-header-actions">
                        <button
                            onClick={() => navigate('/school/academics')}
                            className="btn btn-primary"
                        >
                            <IconHome size={18} />
                            Back to Academics
                        </button>
                        <button
                            onClick={() => navigate('/school/academics/homework/add')}
                            className="btn btn-primary"
                        >
                            <IconPlus size={18} />
                            New Homework
                        </button>
                    </div>
                </div>

                {/* Table Card */}
                <div className="card soft-card fade-in">
                    {/* Toolbar */}
                    <div className="table-toolbar-wrapper">
                        <div className="toolbar-search">
                            <IconSearch size={16} />
                            <input
                                type="text"
                                placeholder="Search by class, section or subject..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input-field"
                            />
                        </div>
                        <div className="toolbar-actions flex items-center gap-2">
                            <div className="relative inline-block text-left h-full">
                                <button
                                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                                    className={`export-mini-btn !flex-row gap-2 h-full ${showFilterMenu ? 'active' : ''}`}
                                >
                                    <IconFilter size={16} /> Filter <IconChevronDown size={14} className={`transition-transform duration-200 ${showFilterMenu ? 'rotate-180' : ''}`} />
                                </button>

                                {showFilterMenu && (
                                    <div className="filter-menu fade-in">
                                        <div className="filter-header">
                                            <h3>Filter</h3>
                                        </div>
                                        <div className="filter-body">
                                            <div className="filter-section">
                                                <span className="filter-section-label">Show Columns</span>
                                                <div className="column-checkboxes">
                                                    {Object.keys(visibleColumns).map(col => (
                                                        <label key={col} className="checkbox-label">
                                                            <input
                                                                type="checkbox"
                                                                checked={visibleColumns[col]}
                                                                onChange={() => toggleColumnVisibility(col)}
                                                            />
                                                            <span>{col === 'homeworkDate' ? 'Homework Date' : col === 'submissionDate' ? 'Submission Date' : col === 'evaluationDate' ? 'Evaluation Date' : col.charAt(0).toUpperCase() + col.slice(1)}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="filter-group">
                                                <div className="filter-item">
                                                    <label>Class</label>
                                                    <select
                                                        className="filter-select"
                                                        value={tempFilters.class}
                                                        onChange={(e) => setTempFilters({ ...tempFilters, class: e.target.value })}
                                                    >
                                                        <option value="">All Classes</option>
                                                        <option value="One">One</option>
                                                        <option value="Two">Two</option>
                                                        <option value="Three">Three</option>
                                                    </select>
                                                </div>
                                                <div className="filter-item">
                                                    <label>Section</label>
                                                    <select
                                                        className="filter-select"
                                                        value={tempFilters.section}
                                                        onChange={(e) => setTempFilters({ ...tempFilters, section: e.target.value })}
                                                    >
                                                        <option value="">All Sections</option>
                                                        <option value="A">A</option>
                                                        <option value="B">B</option>
                                                        <option value="C">C</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="filter-group-vertical">
                                                <label>Status</label>
                                                <select
                                                    className="filter-select"
                                                    value={tempFilters.status}
                                                    onChange={(e) => setTempFilters({ ...tempFilters, status: e.target.value })}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Active">Active</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="filter-footer">
                                            <button className="btn-reset" onClick={handleResetFilters}>Reset</button>
                                            <button className="btn-apply" onClick={handleApplyFilters}>Apply</button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={handleCopy} className="export-mini-btn">
                                Copy
                            </button>
                            <button onClick={handleExportCSV} className="export-mini-btn">
                                CSV
                            </button>
                            <button onClick={handleExportExcel} className="export-mini-btn">
                                Excel
                            </button>
                            <button onClick={handleExportPDF} className="export-mini-btn">
                                PDF
                            </button>
                            <button onClick={handlePrint} className="export-mini-btn">
                                Print
                            </button>
                        </div>
                    </div>

                    {/* Table Stats */}
                    <div className="table-stats">
                        <span><strong>{filteredHomework.length}</strong> assignments {selectedRows.length > 0 && <strong>| {selectedRows.length} selected</strong>}</span>
                    </div>

                    <table className="premium-table">
                        <thead>
                            <tr>
                                <th className="w-12">
                                    <input
                                        type="checkbox"
                                        className="premium-checkbox"
                                        onChange={handleSelectAll}
                                        checked={filteredHomework.length > 0 && selectedRows.length === filteredHomework.length}
                                    />
                                </th>
                                {visibleColumns.id && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            ID <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.class && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Class <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.section && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Section <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.subject && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Subject <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.homeworkDate && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Homework Date <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.submissionDate && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Submission Date <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.evaluationDate && (
                                    <th>
                                        <div className="flex items-center gap-2">
                                            Evaluation Date <IconSelector size={14} className="opacity-50" />
                                        </div>
                                    </th>
                                )}
                                {visibleColumns.status && (
                                    <th className="text-center">Status</th>
                                )}
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHomework.length > 0 ? (
                                filteredHomework.map((h) => (
                                    <tr key={h.id}>
                                        <td>
                                            <input
                                                type="checkbox"
                                                className="premium-checkbox"
                                                checked={selectedRows.includes(h.id)}
                                                onChange={() => toggleSelectRow(h.id)}
                                            />
                                        </td>
                                        {visibleColumns.id && <td>{h.id}</td>}
                                        {visibleColumns.class && <td>{h.class}</td>}
                                        {visibleColumns.section && <td>{h.section}</td>}
                                        {visibleColumns.subject && (
                                            <td>
                                                <span className="font-semibold text-gray-800">{h.subject}</span>
                                            </td>
                                        )}
                                        {visibleColumns.homeworkDate && <td>{h.homeworkDate}</td>}
                                        {visibleColumns.submissionDate && <td>{h.submissionDate}</td>}
                                        {visibleColumns.evaluationDate && <td>{h.evaluationDate || '-'}</td>}
                                        {visibleColumns.status && (
                                            <td className="text-center">
                                                <span className={h.academicStatus === 'Completed' ? "status-badge-active" : "status-badge-inactive"}>
                                                    {h.academicStatus || 'Active'}
                                                </span>
                                            </td>
                                        )}
                                        <td>
                                            <div className="flex justify-center gap-3">
                                                <button
                                                    onClick={() => setViewingHomework(h)}
                                                    className="action-icon-btn btn-action-view"
                                                >
                                                    <IconEye size={18} stroke={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/school/academics/homework/edit/${h.id}`)}
                                                    className="action-icon-btn btn-action-edit"
                                                >
                                                    <IconPencil size={18} stroke={2.5} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this homework?')) {
                                                            deleteHomework(h.id);
                                                        }
                                                    }}
                                                    className="action-icon-btn btn-action-delete"
                                                >
                                                    <IconTrash size={18} stroke={2.5} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={Object.values(visibleColumns).filter(v => v).length + 2} className="p-20 text-center text-gray-400 italic">
                                        <div className="flex flex-col items-center gap-4">
                                            <IconUsers size={48} className="text-gray-200" />
                                            No homework found matching your search.
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View Modal - Premium Refactor */}
            {viewingHomework && (
                <div className="fixed inset-0 z-[1000] flex justify-center items-center bg-black/40 backdrop-blur-sm p-6 font-sans" onClick={() => setViewingHomework(null)}>
                    <div className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl text-center border border-slate-200 relative animate-in fade-in zoom-in duration-300" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setViewingHomework(null)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            ✕
                        </button>

                        <div className="mb-8 flex justify-center text-blue-500">
                            <div className="p-5 bg-blue-50 rounded-3xl">
                                <IconStar size={64} stroke={1.5} />
                            </div>
                        </div>

                        <h1 className="text-3xl font-black text-slate-800 mb-2">
                            Homework Details
                        </h1>
                        <p className="text-slate-500 mb-10 font-medium">
                            Details for homework <span className="text-blue-600 font-bold">#{viewingHomework.id}</span>
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-left">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Class & Section</span>
                                <span className="text-slate-700 font-bold">{viewingHomework.class} ({viewingHomework.section})</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Subject</span>
                                <span className="text-slate-700 font-bold">{viewingHomework.subject}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Homework Date</span>
                                <span className="text-slate-700 font-bold">{viewingHomework.homeworkDate}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Submission Date</span>
                                <span className="text-slate-700 font-bold">{viewingHomework.submissionDate}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Evaluation Date</span>
                                <span className="text-slate-700 font-bold">{viewingHomework.evaluationDate || 'Not Evaluated'}</span>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold ${viewingHomework.academicStatus === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                    {viewingHomework.academicStatus || 'Active'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => {
                                    setViewingHomework(null);
                                    navigate(`/school/academics/homework/edit/${viewingHomework.id}`);
                                }}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <IconPencil size={20} stroke={2.5} />
                                Edit Homework
                            </button>
                            <button
                                onClick={() => setViewingHomework(null)}
                                className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl font-bold transition-all shadow-sm active:scale-[0.98]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homework;
