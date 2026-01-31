import React from 'react';
import { IconPlus, IconClock, IconCalendarEvent, IconDoor } from '@tabler/icons-react';

const StudentSchedules = () => {
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
                <div className="schedule-tabs">
                    <button className="tab-btn active">Exams</button>
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
    );
};

export default StudentSchedules;
