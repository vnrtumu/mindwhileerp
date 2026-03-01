import React, { useContext, useState, useMemo, useRef } from 'react';
import { StudentContext } from '../../../context/StudentContext';
import { FeeContext } from '../../../context/FeeContext';
import { useNavigate } from 'react-router-dom';
import './FeeTypes.css';
import HeaderActionButton from '../StudentInformation/components/HeaderActionButton';
import BackButton from '../StudentInformation/components/BackButton';
import { EyeIcon, CreditCardIcon, PlaceholderAvatar } from '../../../components/Icons';
import TableFilter from '../../../components/common/TableFilter';
import TableToolbar from '../../../components/common/TableToolbar';
import FilterPanel from '../../../components/common/FilterPanel';
import {
  copyToClipboard,
  exportToCSV,
  exportToExcel,
  exportToPDF,
  printTable
} from '../../../utils/exportUtils';

const CollectFees = () => {
    const navigate = useNavigate();
    const { students } = useContext(StudentContext);
    
    // Local state
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleColumns, setVisibleColumns] = useState(new Set([
        'checkbox', 'photo', 'admission', 'name', 'class', 'section', 'father', 'due', 'status', 'actions'
    ]));
    const [selectedFilters, setSelectedFilters] = useState({});
    const [sortBy, setSortBy] = useState('name-asc');
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const filterButtonRef = useRef(null);

    // Column definitions
    const columns = [
        { key: 'checkbox', label: 'Checkbox' },
        { key: 'photo', label: 'Photo' },
        { key: 'admission', label: 'Adm No' },
        { key: 'name', label: 'Name' },
        { key: 'class', label: 'Class' },
        { key: 'section', label: 'Section' },
        { key: 'father', label: 'Father Name' },
        { key: 'due', label: 'Total Due' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: 'Actions' }
    ];

    // Sample fee collection data (combining students with their due fees)
    const feeCollectionData = useMemo(() => {
        return students.map(student => ({
            id: student.id,
            admissionNo: student.admissionNo || student.id,
            name: student.name || '—',
            class: student.class || student.className || '—',
            section: student.section || '—',
            fatherName: student.fatherName || '—',
            photo: student.image,
            gender: student.gender,
            totalDue: student.totalDue || 0,
            totalAssigned: student.totalAssigned || 0,
            status: (student.totalDue || 0) > 0 ? 'Unpaid' : 'Paid',
            lastPaymentDate: student.lastPaymentDate || null,
            dueDate: student.dueDate || new Date().toISOString().split('T')[0]
        }));
    }, [students]);

    // Get unique classes and sections for filters
    const uniqueClasses = useMemo(() => {
        return [...new Set(feeCollectionData.map(item => item.class))].filter(c => c !== '—').sort();
    }, [feeCollectionData]);
    
    const uniqueSections = useMemo(() => {
        return [...new Set(feeCollectionData.map(item => item.section))].filter(s => s !== '—').sort();
    }, [feeCollectionData]);

    // Filter definitions
    const filterOptions = [
        { 
            key: 'class', 
            label: 'Class',
            type: 'select',
            options: uniqueClasses
        },
        {
            key: 'section',
            label: 'Section',
            type: 'select',
            options: uniqueSections
        },
        {
            key: 'status',
            label: 'Payment Status',
            type: 'select',
            options: ['Paid', 'Unpaid']
        }
    ];

    // Filter and search
    const filteredData = useMemo(() => {
        let data = [...feeCollectionData];

        // Search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            data = data.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.admissionNo.toLowerCase().includes(query) ||
                item.fatherName.toLowerCase().includes(query)
            );
        }

        // Status filter
        if (selectedFilters.status) {
            data = data.filter(item => item.status === selectedFilters.status);
        }

        // Class filter
        if (selectedFilters.class) {
            data = data.filter(item => item.class === selectedFilters.class);
        }

        // Section filter
        if (selectedFilters.section) {
            data = data.filter(item => item.section === selectedFilters.section);
        }

        // Sorting
        data.sort((a, b) => {
            switch (sortBy) {
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'due-asc':
                    return a.totalDue - b.totalDue;
                case 'due-desc':
                    return b.totalDue - a.totalDue;
                default:
                    return 0;
            }
        });

        return data;
    }, [feeCollectionData, searchQuery, selectedFilters, sortBy]);

    // Selection handlers
    const handleRowCheckboxChange = (id) => {
        setSelectedIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allIds = new Set(filteredData.map(item => item.id));
            setSelectedIds(allIds);
        } else {
            setSelectedIds(new Set());
        }
    };

    const isAllSelected = filteredData.length > 0 && filteredData.every(item => selectedIds.has(item.id));

    // Export handlers
    const getExportData = () => {
        if (selectedIds.size > 0) {
            return filteredData.filter(item => selectedIds.has(item.id));
        }
        return filteredData;
    };

    const handleExportCopy = async () => {
        try {
            const dataToExport = getExportData();
            if (dataToExport.length === 0) {
                alert('No data to copy');
                return;
            }
            
            await copyToClipboard(
                dataToExport,
                ['admissionNo', 'name', 'class', 'section', 'fatherName', 'totalDue', 'status'],
                { admissionNo: 'Adm No', name: 'Name', class: 'Class', section: 'Section', fatherName: 'Father Name', totalDue: 'Total Due', status: 'Status' }
            );
            alert(`${dataToExport.length} row(s) copied to clipboard`);
        } catch (err) {
            alert(err.message || 'Failed to copy');
        }
    };

    const handleExportCSV = async () => {
        try {
            const dataToExport = getExportData();
            if (dataToExport.length === 0) {
                alert('No data to export');
                return;
            }
            
            await exportToCSV(
                dataToExport,
                ['admissionNo', 'name', 'class', 'section', 'fatherName', 'totalDue', 'status'],
                { admissionNo: 'Adm No', name: 'Name', class: 'Class', section: 'Section', fatherName: 'Father Name', totalDue: 'Total Due', status: 'Status' },
                'collect-fees.csv'
            );
        } catch (err) {
            alert(err.message || 'Failed to export CSV');
        }
    };

    const handleExportExcel = async () => {
        try {
            const dataToExport = getExportData();
            if (dataToExport.length === 0) {
                alert('No data to export');
                return;
            }
            
            await exportToExcel(
                dataToExport,
                ['admissionNo', 'name', 'class', 'section', 'fatherName', 'totalDue', 'status'],
                { admissionNo: 'Adm No', name: 'Name', class: 'Class', section: 'Section', fatherName: 'Father Name', totalDue: 'Total Due', status: 'Status' },
                'collect-fees.xlsx',
                'Fees'
            );
        } catch (err) {
            alert(err.message || 'Failed to export Excel');
        }
    };

    const handleExportPDF = async () => {
        try {
            const dataToExport = getExportData();
            if (dataToExport.length === 0) {
                alert('No data to export');
                return;
            }
            
            await exportToPDF(
                dataToExport,
                ['admissionNo', 'name', 'class', 'section', 'fatherName', 'totalDue', 'status'],
                { admissionNo: 'Adm No', name: 'Name', class: 'Class', section: 'Section', fatherName: 'Father Name', totalDue: 'Total Due', status: 'Status' },
                'collect-fees.pdf',
                'Collect Fees Report'
            );
        } catch (err) {
            alert(err.message || 'Failed to export PDF');
        }
    };

    const handlePrint = async () => {
        try {
            const dataToExport = getExportData();
            if (dataToExport.length === 0) {
                alert('No data to print');
                return;
            }
            
            await printTable(
                dataToExport,
                ['admissionNo', 'name', 'class', 'section', 'fatherName', 'totalDue', 'status'],
                { admissionNo: 'Adm No', name: 'Name', class: 'Class', section: 'Section', fatherName: 'Father Name', totalDue: 'Total Due', status: 'Status' },
                'Collect Fees Report'
            );
        } catch (err) {
            alert(err.message || 'Failed to print');
        }
    };

    return (
        <div className="fee-types-page">
            <div className="container">
                {/* Page Header */}
                <div className="page-header">
                    <div className="page-title">
                        <div className="back-button-wrapper">
                            <BackButton title="Go back to Finance" />
                            <div>
                                <h4>Collect Fees</h4>
                                <nav className="breadcrumb">
                                    <span>Finance</span> / <span className="current">Collect Fees</span>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="page-header-actions">
                        <HeaderActionButton to={'/school/dashboard'} label={'Back to Dashboard'} />
                    </div>
                </div>

                {/* Empty State */}
                {feeCollectionData.length === 0 ? (
                    <div className="empty-state-container">
                        <div className="empty-state-card">
                            <div className="empty-state-icon">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <h3>No Students Found</h3>
                            <p>Add students first to collect fees</p>
                        </div>
                    </div>
                ) : (
                    <div className="card table-card soft-card">
                        {/* New Table Toolbar with FilterPanel */}
                        <TableToolbar
                            ref={filterButtonRef}
                            title="Collect Fees"
                            onColumnsClick={() => setShowFilterPanel(true)}
                            onFilterClick={() => setShowFilterPanel(true)}
                            showColumnsButton={true}
                            showSortButton={true}
                        />

                        {/* FilterPanel Component */}
                        <FilterPanel
                            columns={columns}
                            visibleColumns={visibleColumns}
                            onColumnsChange={setVisibleColumns}
                            filterOptions={filterOptions}
                            filterValues={selectedFilters}
                            onFilterChange={setSelectedFilters}
                            isOpen={showFilterPanel}
                            onClose={() => setShowFilterPanel(false)}
                            triggerRef={filterButtonRef}
                        />

                        {/* Search Bar */}
                        <div className="filter-bar">
                            <div className="filter-inputs">
                                <input
                                    type="text"
                                    placeholder="Search by student name, admission number, or father name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '8px 12px',
                                        border: '1px solid var(--sl-border-color)',
                                        borderRadius: '6px',
                                        fontSize: '13px',
                                        color: 'var(--sl-text-color)',
                                        backgroundColor: 'var(--sl-input-bg)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-wrap">
                            <table className="fee-types-table">
                                <thead>
                                    <tr>
                                        {visibleColumns.has('checkbox') && (
                                            <th className="checkbox-col">
                                                <input
                                                    type="checkbox"
                                                    checked={isAllSelected}
                                                    onChange={handleSelectAll}
                                                    title="Select all"
                                                />
                                            </th>
                                        )}
                                        {visibleColumns.has('photo') && <th>Photo</th>}
                                        {visibleColumns.has('admission') && <th>Adm No</th>}
                                        {visibleColumns.has('name') && <th>Name</th>}
                                        {visibleColumns.has('class') && <th>Class</th>}
                                        {visibleColumns.has('section') && <th>Section</th>}
                                        {visibleColumns.has('father') && <th>Father Name</th>}
                                        {visibleColumns.has('due') && <th>Total Due</th>}
                                        {visibleColumns.has('status') && <th>Status</th>}
                                        {visibleColumns.has('actions') && <th className="actions-col">Actions</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.length === 0 ? (
                                        <tr>
                                            <td colSpan={visibleColumns.size} style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--ft-text-muted)' }}>
                                                No records found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredData.map(item => (
                                            <tr key={item.id}>
                                                {visibleColumns.has('checkbox') && (
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedIds.has(item.id)}
                                                            onChange={() => handleRowCheckboxChange(item.id)}
                                                        />
                                                    </td>
                                                )}
                                                {visibleColumns.has('photo') && (
                                                    <td>
                                                        {item.photo ? (
                                                            <img src={item.photo} alt={item.name} style={{width: 36, height: 36, borderRadius: '50%', objectFit: 'cover'}} />
                                                        ) : (
                                                            <PlaceholderAvatar gender={item.gender} size={36} />
                                                        )}
                                                    </td>
                                                )}
                                                {visibleColumns.has('admission') && <td>{item.admissionNo || '—'}</td>}
                                                {visibleColumns.has('name') && <td className="name-cell">{item.name}</td>}
                                                {visibleColumns.has('class') && <td>{item.class}</td>}
                                                {visibleColumns.has('section') && <td>{item.section}</td>}
                                                {visibleColumns.has('father') && <td>{item.fatherName}</td>}
                                                {visibleColumns.has('due') && <td><strong>₹ {item.totalDue.toFixed(2)}</strong></td>}
                                                {visibleColumns.has('status') && (
                                                    <td>
                                                        <span className={`status-badge status-${item.status === 'Paid' ? 'active' : 'inactive'}`}>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                )}
                                                {visibleColumns.has('actions') && (
                                                    <td className="actions-cell">
                                                        <div className="action-icons">
                                                            <button className="icon-btn view-btn" title="View Details" onClick={() => navigate(`/school/student-profile/${item.id}`)}>
                                                                <EyeIcon size={16} />
                                                            </button>
                                                            <button className="icon-btn edit-btn" title="Collect Fees" onClick={() => navigate(`/school/collect-fees/${item.id}`)}>
                                                                <CreditCardIcon size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                )}
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CollectFees;
