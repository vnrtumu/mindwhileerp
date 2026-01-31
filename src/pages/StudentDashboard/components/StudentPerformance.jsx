import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const StudentPerformance = () => {
    const [year, setYear] = useState('2024 - 2025');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const performanceData = [
        { subject: 'Maths', score: 85, color: '#3d5ee1' },
        { subject: 'Physics', score: 78, color: '#28c76f' },
        { subject: 'Chemistry', score: 92, color: '#ff9f43' },
        { subject: 'English', score: 88, color: '#ea5455' },
        { subject: 'Biology', score: 75, color: '#00cfe8' },
        { subject: 'History', score: 70, color: '#7367f0' }
    ];

    const maxScore = 100;

    return (
        <div className="dashboard-card student-performance-card">
            <div className="card-header">
                <h5>Performance</h5>
                <div className="dropdown-container">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {year}
                        <IconChevronDown size={16} />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {['2024 - 2025', '2023 - 2024', '2022 - 2023'].map((option) => (
                                <button
                                    key={option}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setYear(option);
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
                <div className="performance-chart">
                    {performanceData.map((item, index) => (
                        <div key={index} className="performance-bar-container">
                            <div className="bar-wrapper">
                                <div
                                    className="performance-bar"
                                    style={{
                                        height: `${(item.score / maxScore) * 100}%`,
                                        backgroundColor: item.color
                                    }}
                                >
                                    <span className="bar-value">{item.score}%</span>
                                </div>
                            </div>
                            <span className="bar-label">{item.subject}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
