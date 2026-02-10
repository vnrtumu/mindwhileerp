import React, { useContext, useState } from 'react';
import { StudentContext } from '../../context/StudentContext';
import { AcademicsContext } from '../../context/AcademicsContext';
import './BulkEdit.css';
import HeaderActionButton from './components/HeaderActionButton';
import BackButton from './components/BackButton';
import { SortIcon } from '../../components/Icons';

const BulkEdit = () => {
    const { students } = useContext(StudentContext);
    const { classes: academicClasses } = useContext(AcademicsContext);
    
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [editingRowId, setEditingRowId] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [editedValues, setEditedValues] = useState({});
    const [selectedFields, setSelectedFields] = useState(new Set());
    const [changedRows, setChangedRows] = useState(new Set());

    // Filter students based on search query
    const filteredStudents = students.filter(s => {
        const searchLower = searchQuery.toLowerCase();
        return (
            (s.name || '').toLowerCase().includes(searchLower) ||
            (s.admissionNo || s.id || '').toLowerCase().includes(searchLower) ||
            (s.fatherName || '').toLowerCase().includes(searchLower) ||
            (s.fatherPhone || s.phone || '').toLowerCase().includes(searchLower)
        );
    });

    const isAllSelected = filteredStudents.length > 0 && filteredStudents.every(s => selectedIds.has(s.id));

    // Handle checkbox selection
    const handleRowCheckboxChange = (studentId) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(studentId)) {
                newSet.delete(studentId);
            } else {
                newSet.add(studentId);
            }
            return newSet;
        });
    };

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = new Set(filteredStudents.map(s => s.id));
            setSelectedIds(allIds);
        } else {
            setSelectedIds(new Set());
        }
    };

    // Start editing a cell
    const handleCellEdit = (studentId, field, currentValue) => {
        if (!selectedIds.has(studentId)) return;
        setEditingRowId(studentId);
        setEditingField(field);
        setEditedValues({
            ...editedValues,
            [field]: currentValue
        });
    };

    // Handle input change
    const handleInputChange = (e, field) => {
        setEditedValues({
            ...editedValues,
            [field]: e.target.value
        });
    };

    // Validate field value
    const validateField = (field, value) => {
        switch (field) {
            case 'rollNo':
                return /^\d*$/.test(value);
            case 'dob':
                return value === '' || /^\d{4}-\d{2}-\d{2}$/.test(value);
            case 'phone':
            case 'whatsapp':
                return /^\d*$/.test(value);
            case 'aadhaar':
                return /^\d{12}$/.test(value) || value === '';
            case 'name':
            case 'firstName':
            case 'lastName':
            case 'fatherName':
                return value.trim() !== '';
            default:
                return true;
        }
    };

    // Save cell edit
    const handleSaveCell = (studentId, field) => {
        const newValue = editedValues[field];
        
        // Validate
        if (!validateField(field, newValue)) {
            alert(`Invalid value for ${field}`);
            return;
        }

        // Update local state
        const student = students.find(s => s.id === studentId);
        if (student) {
            student[field] = newValue;
            
            // Mark row as changed
            setChangedRows(prev => new Set(prev).add(studentId));
        }

        setEditingRowId(null);
        setEditingField(null);
    };

    // Cancel cell edit
    const handleCancelCell = () => {
        setEditingRowId(null);
        setEditingField(null);
        setEditedValues({});
    };

    // Save all changes
    const handleSaveAll = () => {
        if (changedRows.size === 0) {
            alert('No changes to save');
            return;
        }

        alert(`Saved changes for ${changedRows.size} student(s)`);
        setChangedRows(new Set());
    };

    // Export functions
    const handleExportCopy = () => {
        if (selectedFields.size === 0) { alert('Select fields to export'); return; }
        const target = selectedIds.size > 0 ? filteredStudents.filter(s => selectedIds.has(s.id)) : filteredStudents;
        const headers = fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => f.label);
        const data = target.map(s => fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => {
            const val = getFieldValue(s, f.key);
            return typeof val === 'string' ? val : (val || '');
        }).join('\t')).join('\n');
        navigator.clipboard.writeText([headers.join('\t'), data].join('\n'));
        alert('Copied to clipboard');
    };

    const handleExportCSV = () => {
        if (selectedFields.size === 0) { alert('Select fields to export'); return; }
        const target = selectedIds.size > 0 ? filteredStudents.filter(s => selectedIds.has(s.id)) : filteredStudents;
        const headers = fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => f.label);
        const rows = target.map(s => fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => {
            const v = getFieldValue(s, f.key);
            return typeof v === 'string' ? `"${v.replace(/"/g,'""') }"` : v || '';
        }));
        const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
        downloadFile(csv, 'bulk-edit-students.csv', 'text/csv');
    };

    const handleExportExcel = () => {
        if (selectedFields.size === 0) { alert('Select fields to export'); return; }
        alert('Excel export functionality would be added with a library like xlsx');
    };

    const handleExportPDF = () => {
        if (selectedFields.size === 0) { alert('Select fields to export'); return; }
        alert('PDF export functionality would be added with a library like jspdf');
    };

    const handlePrint = () => {
        window.print();
    };

    const downloadFile = (content, filename, type) => {
        const element = document.createElement('a');
        element.setAttribute('href', `data:${type};charset=utf-8,${encodeURIComponent(content)}`);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    // Field definitions and helpers
    const fieldsOrder = [
        { key: 'class', label: 'Class', type: 'select' },
        { key: 'section', label: 'Section', type: 'select' },
        { key: 'firstName', label: 'First Name', type: 'text' },
        { key: 'lastName', label: 'Last Name', type: 'text' },
        { key: 'rollNo', label: 'Roll No', type: 'number' },
        { key: 'fatherName', label: 'Father Name', type: 'text' },
        { key: 'gender', label: 'Gender', type: 'select' },
        { key: 'aadhaar', label: 'Aadhaar Number', type: 'text' },
        { key: 'phone', label: 'Phone Number', type: 'text' },
        { key: 'whatsapp', label: 'WhatsApp Number', type: 'text' },
        { key: 'dob', label: 'Date of Birth', type: 'date' },
        { key: 'photo', label: 'Photo', type: 'photo' }
    ];

    const getFieldValue = (s, key) => {
        switch (key) {
            case 'firstName': return s.firstName || (s.name ? s.name.split(' ')[0] : '');
            case 'lastName': return s.lastName || (s.name ? s.name.split(' ').slice(1).join(' ') : '');
            case 'phone': return s.phone || s.fatherPhone || '';
            case 'whatsapp': return s.whatsapp || '';
            case 'aadhaar': return s.aadhaar || '';
            case 'photo': return s.photo || s.image || '';
            default: return s[key] != null ? s[key] : '';
        }
    };

    const classList = academicClasses || [];
    const sections = ['A', 'B', 'C', 'D'];
    const genders = ['Male', 'Female', 'Other'];
    const toggleField = (key) => {
        setSelectedFields(prev => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key); else next.add(key);
            return next;
        });
    };

    const selectAllFields = () => {
        setSelectedFields(new Set(fieldsOrder.map(f => f.key)));
    };

    const clearAllFields = () => {
        setSelectedFields(new Set());
    };

    // Editable cell component
    const EditableCell = ({ studentId, field, value, type, options }) => {
        const isEditing = editingRowId === studentId && editingField === field;
        const isSelected = selectedIds.has(studentId);

        if (!isSelected) {
            return <span>{value || '—'}</span>;
        }

        if (isEditing) {
            return (
                <div className="editable-cell-input">
                    {type === 'select' ? (
                        <select
                            value={editedValues[field] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            className="edit-input edit-select"
                            autoFocus
                        >
                            <option value="">Select...</option>
                            {options.map((opt, idx) => (
                                <option key={idx} value={typeof opt === 'string' ? opt : opt.id}>
                                    {typeof opt === 'string' ? opt : opt.name}
                                </option>
                            ))}
                        </select>
                    ) : type === 'date' ? (
                        <input
                            type="date"
                            value={editedValues[field] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            className="edit-input edit-date"
                            autoFocus
                        />
                    ) : (
                        <input
                            type={type === 'number' ? 'number' : 'text'}
                            value={editedValues[field] || ''}
                            onChange={(e) => handleInputChange(e, field)}
                            className="edit-input"
                            autoFocus
                        />
                    )}
                    <div className="edit-actions">
                        <button
                            className="edit-btn save-btn"
                            title="Save"
                            onClick={() => handleSaveCell(studentId, field)}
                        >
                            ✔
                        </button>
                        <button
                            className="edit-btn cancel-btn"
                            title="Cancel"
                            onClick={handleCancelCell}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <span
                className={`editable-cell ${isSelected ? 'clickable' : ''} ${changedRows.has(studentId) ? 'changed' : ''}`}
                onClick={() => handleCellEdit(studentId, field, value || '')}
            >
                {value || '—'}
            </span>
        );
    };

    return (
        <div className="bulk-edit-page">
            <div className="container">
                {/* Page Header */}
                <div className="page-header">
                    <div className="page-title">
                        <div className="back-button-wrapper">
                            <BackButton title="Go back to Students" />
                            <div>
                                <h4>Bulk Edit Students</h4>
                                <nav className="breadcrumb">
                                    <span>Student Management</span> / <span className="current">Bulk Edit</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-header-actions">
                        <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
                    </div>
                </div>

                {/* Selection Helper */}
                {selectedIds.size === 0 && (
                    <div className="selection-helper">
                        📋 Select students below to edit their information
                    </div>
                )}

                {/* Main Table Card */}
                {students.length === 0 ? (
                    <div className="empty-state-container">
                        <div className="empty-state-card">
                            <div className="empty-state-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>No Students Found</h3>
                            <p>Add students first before using bulk edit</p>
                        </div>
                    </div>
                ) : (
                    <div className="card soft-card fade-in">
                        {/* Toolbar */}
                        <div className="table-toolbar-wrapper">
                            <div className="toolbar-search">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.35-4.35"></path>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search by name, ID, father name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input-field"
                                />
                            </div>
                            <div className="toolbar-actions">
                                <button className="toolbar-btn save-all-btn" onClick={handleSaveAll} disabled={selectedFields.size === 0 || changedRows.size === 0}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                                        <polyline points="17 21 17 13 7 13 7 21"></polyline>
                                        <polyline points="7 3 7 8 15 8"></polyline>
                                    </svg>
                                    Save All ({changedRows.size})
                                </button>
                                <button className="toolbar-btn" title="Copy Selected" onClick={handleExportCopy} disabled={selectedFields.size === 0 || filteredStudents.length === 0}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                                    </svg>
                                    Copy
                                </button>
                                <button className="toolbar-btn" title="Export as CSV" onClick={handleExportCSV} disabled={selectedFields.size === 0 || filteredStudents.length === 0}>
                                    CSV
                                </button>
                                <button className="toolbar-btn" title="Export as Excel" onClick={handleExportExcel} disabled={selectedFields.size === 0 || filteredStudents.length === 0}>
                                    Excel
                                </button>
                                <button className="toolbar-btn" title="Export as PDF" onClick={handleExportPDF} disabled={selectedFields.size === 0 || filteredStudents.length === 0}>
                                    PDF
                                </button>
                                <button className="toolbar-btn" title="Print" onClick={handlePrint} disabled={selectedFields.size === 0 || filteredStudents.length === 0}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="6 9 6 2 18 2 18 9"></polyline>
                                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                        <rect x="6" y="14" width="12" height="8"></rect>
                                    </svg>
                                    Print
                                </button>
                            </div>
                        </div>

                        {/* Field selector panel (above table) */}
                        <div className="field-selector">
                            <div className="field-selector-actions">
                                <button className="toolbar-btn" onClick={selectAllFields}>Select All</button>
                                <button className="toolbar-btn" onClick={clearAllFields}>Clear All</button>
                            </div>
                            <div className="field-selector-list">
                                {fieldsOrder.map(f => (
                                    <label key={f.key} className="field-checkbox">
                                        <input type="checkbox" checked={selectedFields.has(f.key)} onChange={() => toggleField(f.key)} />
                                        <span>{f.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="field-selector-help">Select the fields you want to edit in bulk.</div>
                        </div>

                        <div className="table-stats">
                            <span><strong>{filteredStudents.length}</strong> students | {selectedIds.size > 0 && <strong>{selectedIds.size} selected</strong>} {changedRows.size > 0 && <strong className="changed-count">{changedRows.size} modified</strong>}</span>
                        </div>

                        {/* Table */}
                        <div className="table-wrap">
                            <table className="bulk-edit-table">
                                <thead>
                                    <tr>
                                        <th className="col-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={isAllSelected}
                                                onChange={handleSelectAll}
                                                title="Select all"
                                            />
                                        </th>
                                        {selectedFields.size === 0 ? (
                                            <th className="col-note">Select fields to begin editing</th>
                                        ) : (
                                            fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => (
                                                <th key={f.key} className={`col-${f.key}`}>{f.label}</th>
                                            ))
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedFields.size === 0 ? (
                                        <tr className="empty-table-row">
                                            <td colSpan={1 + fieldsOrder.length}>
                                                <div className="empty-message">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight:8}}>
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <path d="M12 8v4"></path>
                                                        <path d="M12 16h.01"></path>
                                                    </svg>
                                                    <span>No fields selected. Please choose fields above to start bulk editing.</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredStudents.map(s => (
                                            <tr
                                                key={s.id}
                                                className={`table-row ${selectedIds.has(s.id) ? 'selected' : ''} ${changedRows.has(s.id) ? 'changed-row' : ''}`}
                                            >
                                                <td className="checkbox-td">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedIds.has(s.id)}
                                                        onChange={() => handleRowCheckboxChange(s.id)}
                                                        disabled={selectedFields.size === 0}
                                                    />
                                                </td>
                                                {fieldsOrder.filter(f => selectedFields.has(f.key)).map(f => (
                                                    <td key={f.key} className={`${f.key}-cell`}>
                                                        {f.type === 'photo' ? (
                                                            <label className="photo-upload" title="Click to upload photo">
                                                                {getFieldValue(s, 'photo') ? (
                                                                    <img src={getFieldValue(s, 'photo')} alt="photo" className="photo-thumbnail" />
                                                                ) : (
                                                                    <div className="photo-placeholder-icon">
                                                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                                                            <path d="M21 15l-5-5L5 21"></path>
                                                                        </svg>
                                                                    </div>
                                                                )}
                                                                <input type="file" accept="image/*" onChange={(e) => {
                                                                    const file = e.target.files && e.target.files[0];
                                                                    if (!file) return;
                                                                    const reader = new FileReader();
                                                                    reader.onload = (ev) => {
                                                                        const student = students.find(x => x.id === s.id);
                                                                        if (student) {
                                                                            student.photo = ev.target.result;
                                                                            setChangedRows(prev => new Set(prev).add(s.id));
                                                                            setEditedValues(prev => ({ ...prev }));
                                                                        }
                                                                    };
                                                                    reader.readAsDataURL(file);
                                                                }} />
                                                            </label>
                                                        ) : (
                                                            <EditableCell
                                                                studentId={s.id}
                                                                field={f.key}
                                                                value={getFieldValue(s, f.key)}
                                                                type={f.type === 'select' ? 'select' : f.type}
                                                                options={f.key === 'class' ? classList.map(c => c.name || c) : (f.key === 'gender' ? genders : (f.key === 'section' ? sections : null))}
                                                            />
                                                        )}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* No Search Results */}
                        {filteredStudents.length === 0 && (
                            <div className="no-results">
                                No students found matching your search
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkEdit;
