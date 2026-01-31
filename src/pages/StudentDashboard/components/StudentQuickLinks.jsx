import React from 'react';
import { IconCash, IconClipboardCheck, IconCalendar, IconUserCheck } from '@tabler/icons-react';

const StudentQuickLinks = () => {
    const links = [
        {
            title: 'Pay Fees',
            icon: IconCash,
            color: '#3d5ee1',
            bgColor: '#e8f0ff',
            link: '/student-fees'
        },
        {
            title: 'Exam Result',
            icon: IconClipboardCheck,
            color: '#28c76f',
            bgColor: '#e5f8ed',
            link: '/student-result'
        },
        {
            title: 'Calendar',
            icon: IconCalendar,
            color: '#ff9f43',
            bgColor: '#fff5e8',
            link: '/student-time-table'
        },
        {
            title: 'Attendance',
            icon: IconUserCheck,
            color: '#ea5455',
            bgColor: '#fce8e8',
            link: '/student-leaves'
        }
    ];

    return (
        <div className="student-quick-links">
            {links.map((item, index) => (
                <a key={index} href={item.link} className="quick-link-card">
                    <div
                        className="quick-link-icon"
                        style={{ backgroundColor: item.bgColor, color: item.color }}
                    >
                        <item.icon size={24} />
                    </div>
                    <span className="quick-link-title">{item.title}</span>
                </a>
            ))}
        </div>
    );
};

export default StudentQuickLinks;
