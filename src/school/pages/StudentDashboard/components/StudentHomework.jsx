import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';

const StudentHomework = () => {
    const [filter, setFilter] = useState('All Subject');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const homeworks = [
        {
            subject: 'Physics',
            subjectColor: '#3d5ee1',
            title: 'Write about Theory of Pendulum',
            teacher: 'Aaron',
            teacherImg: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-01.jpg',
            dueDate: '16 Jun 2024',
            progress: 90
        },
        {
            subject: 'Chemistry',
            subjectColor: '#ff9f43',
            title: 'Chemistry - Change of Elements',
            teacher: 'Hellana',
            teacherImg: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-02.jpg',
            dueDate: '16 Jun 2024',
            progress: 65
        },
        {
            subject: 'Maths',
            subjectColor: '#28c76f',
            title: 'Maths - Problems to Solve Page 21',
            teacher: 'Morgan',
            teacherImg: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-03.jpg',
            dueDate: '21 Jun 2024',
            progress: 30
        },
        {
            subject: 'English',
            subjectColor: '#ea5455',
            title: 'English - Vocabulary Introduction',
            teacher: 'Daniel Josua',
            teacherImg: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-04.jpg',
            dueDate: '21 Jun 2024',
            progress: 10
        }
    ];

    return (
        <div className="dashboard-card student-homework-card">
            <div className="card-header">
                <h5>Home Works</h5>
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
                            {['All Subject', 'Physics', 'Chemistry', 'Maths', 'English'].map((option) => (
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
                <div className="homework-list">
                    {homeworks.map((hw, index) => (
                        <div key={index} className="homework-item">
                            <div className="homework-header">
                                <span
                                    className="subject-tag"
                                    style={{ backgroundColor: `${hw.subjectColor}15`, color: hw.subjectColor }}
                                >
                                    {hw.subject}
                                </span>
                            </div>
                            <h6 className="homework-title">{hw.title}</h6>
                            <div className="homework-meta">
                                <div className="teacher-info">
                                    <img src={hw.teacherImg} alt={hw.teacher} className="teacher-avatar" />
                                    <span>{hw.teacher}</span>
                                </div>
                                <span className="due-date">Due by : {hw.dueDate}</span>
                            </div>
                            <div className="homework-progress">
                                <div className="progress-bar">
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${hw.progress}%`,
                                            backgroundColor: hw.progress >= 70 ? '#28c76f' : hw.progress >= 40 ? '#ff9f43' : '#ea5455'
                                        }}
                                    ></div>
                                </div>
                                <span className="progress-text">{hw.progress}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentHomework;
