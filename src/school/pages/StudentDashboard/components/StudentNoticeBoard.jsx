import React from 'react';
import { IconBell } from '@tabler/icons-react';

const StudentNoticeBoard = () => {
    const notices = [
        {
            title: 'New Syllabus Instructions',
            date: '11 Mar 2024'
        },
        {
            title: 'World Environment Day Program.....!!!',
            date: '21 Apr 2024'
        },
        {
            title: 'Exam Preparation Notification!',
            date: '13 Mar 2024'
        },
        {
            title: 'Online Classes Preparation',
            date: '24 May 2024'
        },
        {
            title: 'Exam Time Table Release',
            date: '24 May 2024'
        },
        {
            title: 'English Exam Preparation',
            date: '23 Mar 2024'
        }
    ];

    return (
        <div className="dashboard-card student-notice-card">
            <div className="card-header">
                <h5>Notice Board</h5>
                <a href="/notice-board" className="view-all">View All</a>
            </div>
            <div className="card-body">
                <div className="notice-list">
                    {notices.map((notice, index) => (
                        <div key={index} className="notice-item">
                            <div className="notice-icon">
                                <IconBell size={16} />
                            </div>
                            <div className="notice-content">
                                <h6 className="notice-title">{notice.title}</h6>
                                <span className="notice-date">Added on : {notice.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentNoticeBoard;
