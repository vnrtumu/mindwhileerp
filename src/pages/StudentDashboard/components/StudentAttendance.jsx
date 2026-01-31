import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const StudentAttendance = () => {
    const [filter, setFilter] = useState('This Week');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const attendanceStats = {
        totalDays: 28,
        present: 25,
        absent: 2,
        halfday: 0
    };

    const weekDays = [
        { day: 'M', status: 'present' },
        { day: 'T', status: 'present' },
        { day: 'W', status: 'absent' },
        { day: 'T', status: 'present' },
        { day: 'F', status: 'present' },
        { day: 'S', status: 'present' },
        { day: 'S', status: 'holiday' }
    ];

    return (
        <div className="dashboard-card student-attendance-card">
            <div className="card-header">
                <h5>Attendance</h5>
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
                            {['This Week', 'Last Week', 'Last Month'].map((option) => (
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
                <p className="working-days-text">
                    No of total working days <strong>{attendanceStats.totalDays} Days</strong>
                </p>

                <div className="attendance-stats">
                    <div className="stat-box present">
                        <span className="stat-label">Present</span>
                        <span className="stat-value">{attendanceStats.present}</span>
                    </div>
                    <div className="stat-box absent">
                        <span className="stat-label">Absent</span>
                        <span className="stat-value">{attendanceStats.absent}</span>
                    </div>
                    <div className="stat-box halfday">
                        <span className="stat-label">Halfday</span>
                        <span className="stat-value">{attendanceStats.halfday}</span>
                    </div>
                </div>

                <div className="weekly-attendance">
                    <div className="week-header">
                        <h6>Last 7 Days</h6>
                        <span className="date-range">14 May 2024 - 21 May 2024</span>
                    </div>
                    <div className="week-days">
                        {weekDays.map((item, index) => (
                            <div
                                key={index}
                                className={`day-circle ${item.status}`}
                            >
                                {item.day}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;
