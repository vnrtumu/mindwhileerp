import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const StudentExamResult = () => {
    const [filter, setFilter] = useState('1st Quarter');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const results = [
        { subject: 'Mathematics', marks: 92, total: 100, grade: 'A+' },
        { subject: 'Physics', marks: 85, total: 100, grade: 'A' },
        { subject: 'Chemistry', marks: 88, total: 100, grade: 'A' },
        { subject: 'English', marks: 90, total: 100, grade: 'A+' },
        { subject: 'Biology', marks: 78, total: 100, grade: 'B+' },
        { subject: 'History', marks: 82, total: 100, grade: 'A-' }
    ];

    const totalMarks = results.reduce((sum, r) => sum + r.marks, 0);
    const totalPossible = results.reduce((sum, r) => sum + r.total, 0);
    const percentage = ((totalMarks / totalPossible) * 100).toFixed(1);

    return (
        <div className="dashboard-card student-exam-result-card">
            <div className="card-header">
                <h5>Exam Result</h5>
                <div className="dropdown-container">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {filter}
                        <IconChevronDown size={16} />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {['1st Quarter', '2nd Quarter'].map((option) => (
                                <button
                                    key={option}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setFilter(option);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="card-body">
                <div className="result-summary">
                    <div className="percentage-circle">
                        <span className="percentage-value">{percentage}%</span>
                    </div>
                    <div className="result-totals">
                        <p><strong>{totalMarks}</strong> / {totalPossible}</p>
                        <span>Total Marks</span>
                    </div>
                </div>
                <div className="result-list">
                    {results.map((result, index) => (
                        <div key={index} className="result-item">
                            <span className="res-subject">{result.subject}</span>
                            <span className="res-marks">{result.marks}/{result.total}</span>
                            <span className={`res-grade grade-${result.grade.replace('+', '-plus').replace('-', '-minus').toLowerCase()}`}>
                                {result.grade}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentExamResult;
