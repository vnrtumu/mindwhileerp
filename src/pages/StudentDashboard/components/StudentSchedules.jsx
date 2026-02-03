import React, { useState } from 'react';
import { IconPlus, IconClock, IconCalendarEvent, IconDoor, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const StudentSchedules = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [activeTab, setActiveTab] = useState('Exams');

    const exams = [
        {
            quarter: '1st Quarterly',
            subject: 'Mathematics',
            time: '01:30 - 02:15 PM',
            date: '06 May 2024',
            room: '15'
        },
        {
            quarter: '2nd Quarterly',
            subject: 'Physics',
            time: '01:30 - 02:15 PM',
            date: '07 May 2024',
            room: '15'
        }
    ];

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
        <div className="dashboard-card student-schedules-card">
            <div className="card-header">
                <h5>Schedules</h5>
                <button className="add-btn-sm">
                    <IconPlus size={16} />
                    Add New
                </button>
            </div>
            <div className="card-body">
                <div className="schedules-layout">
                    {/* Left - Calendar */}
                    <div className="schedules-calendar">
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

                    {/* Right - Exams */}
                    <div className="schedules-exams">
                        <div className="schedule-tabs">
                            <button
                                className={`tab-btn ${activeTab === 'Exams' ? 'active' : ''}`}
                                onClick={() => setActiveTab('Exams')}
                            >
                                Exams
                            </button>
                        </div>

                        <div className="exam-list">
                            {exams.map((exam, index) => (
                                <div key={index} className="exam-card">
                                    <div className="exam-quarter">{exam.quarter}</div>
                                    <h6 className="exam-subject">{exam.subject}</h6>
                                    <div className="exam-details">
                                        <div className="exam-detail">
                                            <IconClock size={14} />
                                            <span>{exam.time}</span>
                                        </div>
                                        <div className="exam-detail">
                                            <IconCalendarEvent size={14} />
                                            <span>{exam.date}</span>
                                        </div>
                                        <div className="exam-detail">
                                            <IconDoor size={14} />
                                            <span>Room No : {exam.room}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentSchedules;
