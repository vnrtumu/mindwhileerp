import React, { useState } from 'react';
import { IconChevronDown, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const StudentAttendance = () => {
    const [filter, setFilter] = useState('This Week');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());

    const attendanceStats = {
        totalDays: 28,
        present: 25,
        absent: 2,
        halfday: 1
    };

    // Calculate percentages for donut chart
    const total = attendanceStats.present + attendanceStats.absent + attendanceStats.halfday;
    const presentPercent = (attendanceStats.present / total) * 100;
    const absentPercent = (attendanceStats.absent / total) * 100;

    // Calendar helper functions
    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const getMonthName = (date) => {
        return date.toLocaleString('default', { month: 'long' });
    };

    const navigateMonth = (direction) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + direction);
        setCurrentDate(newDate);
    };

    const generateCalendarDays = () => {
        const daysInMonth = getDaysInMonth(currentDate);
        const firstDay = getFirstDayOfMonth(currentDate);
        const days = [];

        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        const prevMonthDays = prevMonth.getDate();

        for (let i = firstDay - 1; i >= 0; i--) {
            days.push({ day: prevMonthDays - i, isCurrentMonth: false });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, isCurrentMonth: true });
        }

        const remainingDays = 42 - days.length;
        for (let i = 1; i <= remainingDays; i++) {
            days.push({ day: i, isCurrentMonth: false });
        }

        return days;
    };

    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const calendarDays = generateCalendarDays();
    const today = new Date();

    const isToday = (day) => {
        return day.isCurrentMonth &&
            day.day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const isWeekend = (dayIndex) => {
        const colIndex = dayIndex % 7;
        return colIndex === 5 || colIndex === 6;
    };

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
                <div className="attendance-content">
                    {/* Left Side - Stats */}
                    <div className="attendance-left">
                        <p className="working-days-text">
                            No of total working days <strong>{attendanceStats.totalDays} Days</strong>
                        </p>

                        <div className="attendance-stats-vertical">
                            <div className="stat-row present">
                                <span className="stat-label">Present</span>
                                <span className="stat-value">{attendanceStats.present}</span>
                            </div>
                            <div className="stat-row absent">
                                <span className="stat-label">Absent</span>
                                <span className="stat-value">{attendanceStats.absent}</span>
                            </div>
                            <div className="stat-row halfday">
                                <span className="stat-label">Halfday</span>
                                <span className="stat-value">{attendanceStats.halfday}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Donut Chart */}
                    <div className="attendance-right">
                        <div className="donut-chart">
                            <svg viewBox="0 0 36 36" className="circular-chart">
                                {/* Background circle */}
                                <circle
                                    className="circle-bg"
                                    cx="18" cy="18" r="15.9155"
                                    fill="none"
                                    stroke="#ff9f43"
                                    strokeWidth="3"
                                />
                                {/* Absent segment */}
                                <circle
                                    className="circle-absent"
                                    cx="18" cy="18" r="15.9155"
                                    fill="none"
                                    stroke="#ea5455"
                                    strokeWidth="3"
                                    strokeDasharray={`${absentPercent} ${100 - absentPercent}`}
                                    strokeDashoffset="0"
                                />
                                {/* Present segment */}
                                <circle
                                    className="circle-present"
                                    cx="18" cy="18" r="15.9155"
                                    fill="none"
                                    stroke="#28c76f"
                                    strokeWidth="3"
                                    strokeDasharray={`${presentPercent} ${100 - presentPercent}`}
                                    strokeDashoffset={`-${absentPercent}`}
                                />
                            </svg>
                            <div className="donut-center">
                                <span className="donut-percent">{Math.round(presentPercent)}%</span>
                            </div>
                        </div>
                        <div className="chart-legend">
                            <div className="legend-item">
                                <span className="legend-dot present"></span>
                                <span>Present</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot absent"></span>
                                <span>Absent</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-dot halfday"></span>
                                <span>Halfday</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full Calendar */}
                <div className="attendance-calendar">
                    <div className="calendar-header">
                        <button
                            className="calendar-nav-btn"
                            onClick={() => navigateMonth(-1)}
                        >
                            <IconChevronLeft size={20} />
                        </button>
                        <h6 className="calendar-month-title">
                            {getMonthName(currentDate)} {currentDate.getFullYear()}
                        </h6>
                        <button
                            className="calendar-nav-btn"
                            onClick={() => navigateMonth(1)}
                        >
                            <IconChevronRight size={20} />
                        </button>
                    </div>

                    <div className="calendar-weekdays">
                        {weekDays.map((day, index) => (
                            <div
                                key={day}
                                className={`weekday-cell ${index === 0 ? 'sunday' : ''} ${index === 6 ? 'saturday' : ''}`}
                            >
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="calendar-grid">
                        {calendarDays.map((dayObj, index) => (
                            <div
                                key={index}
                                className={`calendar-day-cell 
                                    ${!dayObj.isCurrentMonth ? 'other-month' : ''} 
                                    ${isToday(dayObj) ? 'today' : ''}
                                    ${isWeekend(index) ? 'weekend' : ''}
                                `}
                            >
                                <span className="day-number">{dayObj.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentAttendance;
