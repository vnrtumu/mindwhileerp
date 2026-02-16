import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconPlus, IconChevronDown, IconChevronLeft
} from '@tabler/icons-react';
import '../Accounts/Accounts.css';

const AssignExam = () => {
    const navigate = useNavigate();
    const [selectedClass, setSelectedClass] = useState('');
    const [showAddSectionModal, setShowAddSectionModal] = useState(false);
    const [newSection, setNewSection] = useState('');

    const classesList = ['1st class', '2nd class', '3rd class', '4th class', '5th class', '6th class', '7th class', '8th class', '9th class', '10th class'];

    // Mock sections data
    const [classSections, setClassSections] = useState({
        '1st class': ['A', 'B'],
        '2nd class': ['A'],
    });

    const handleAddSection = (e) => {
        e.preventDefault();
        if (selectedClass && newSection) {
            const currentSections = classSections[selectedClass] || [];
            setClassSections({
                ...classSections,
                [selectedClass]: [...currentSections, newSection]
            });
            setNewSection('');
            setShowAddSectionModal(false);
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
                        <h4>Assign Exam</h4>
                    </div>
                    <nav className="breadcrumb">
                        <span>Dashboard</span> / <span>Exam</span> / <span className="current">Assign</span>
                    </nav>
                </div>
            </div>

            {/* Redesigned Selection Area - Side by Side */}
            <div className="exam-redesign-container">
                <div className="criteria-row-side-by-side">
                    <div className="criteria-column">
                        <label className="criteria-label">Class :</label>
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
                    </div>

                    {selectedClass && (
                        <div className="criteria-column">
                            <label className="criteria-label">Section :</label>
                            <div className="section-combo-wrapper">
                                <div className="section-select-wrapper flex-grow-1">
                                    <select className="select-minimal section-select-dropdown w-100">
                                        {(classSections[selectedClass] || []).length > 0 ? (
                                            <>
                                                <option value="">Select Section</option>
                                                {classSections[selectedClass].map((sec, idx) => (
                                                    <option key={idx} value={sec}>{sec}</option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value="">No sections added yet</option>
                                        )}
                                    </select>
                                    <IconChevronDown size={16} className="dropdown-icon" />
                                </div>
                                <button className="btn-add-section-minimal" title="Add Section" onClick={() => setShowAddSectionModal(true)}>
                                    <IconPlus size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Placeholder for Assignment Table/Content */}
            <div className="accounts-card">
                <div className="card-header">
                    <h5>Exam Assignments</h5>
                </div>
                <div className="card-body">
                    <div className="p-5 text-center text-muted">
                        Select a class and section to manage exam assignments.
                    </div>
                </div>
            </div>

            {/* Add Section Modal */}
            {showAddSectionModal && (
                <div className="modal-overlay">
                    <div className="modal-content small-modal">
                        <div className="modal-header">
                            <h3>Add Section for {selectedClass}</h3>
                            <button className="close-btn" onClick={() => setShowAddSectionModal(false)}>
                                <IconPlus size={20} style={{ transform: 'rotate(45deg)' }} />
                            </button>
                        </div>
                        <form className="modal-body" onSubmit={handleAddSection}>
                            <div className="form-group full-width">
                                <label>Section Name <span style={{ color: '#ea5455' }}>*</span></label>
                                <input
                                    type="text"
                                    placeholder="e.g. A, B, C or Jasmine"
                                    required
                                    value={newSection}
                                    onChange={(e) => setNewSection(e.target.value)}
                                    autoFocus
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn-cancel" onClick={() => setShowAddSectionModal(false)}>Cancel</button>
                                <button type="submit" className="btn-submit btn-success">Save Section</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignExam;
