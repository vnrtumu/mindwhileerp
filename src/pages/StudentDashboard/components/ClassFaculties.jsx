import React from 'react';
import { IconMail, IconMessageCircle } from '@tabler/icons-react';

const ClassFaculties = () => {
    const faculties = [
        {
            name: 'Aaron',
            subject: 'Chemistry',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-01.jpg'
        },
        {
            name: 'Hellana',
            subject: 'English',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-02.jpg'
        },
        {
            name: 'Morgan',
            subject: 'Physics',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-03.jpg'
        },
        {
            name: 'Daniel Josua',
            subject: 'Spanish',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-04.jpg'
        },
        {
            name: 'Teresa',
            subject: 'Maths',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-05.jpg'
        },
        {
            name: 'Jacquelin',
            subject: 'Biology',
            img: 'https://preskool.developer24.org/html/template/assets/img/teachers/teacher-06.jpg'
        }
    ];

    return (
        <div className="dashboard-card class-faculties-card">
            <div className="card-header">
                <h5>Class Faculties</h5>
            </div>
            <div className="card-body">
                <div className="faculties-list">
                    {faculties.map((faculty, index) => (
                        <div key={index} className="faculty-item">
                            <div className="faculty-info">
                                <img src={faculty.img} alt={faculty.name} className="faculty-avatar" />
                                <div className="faculty-details">
                                    <h6 className="faculty-name">{faculty.name}</h6>
                                    <span className="faculty-subject">{faculty.subject}</span>
                                </div>
                            </div>
                            <div className="faculty-actions">
                                <button className="action-btn email-btn">
                                    <IconMail size={16} />
                                    Email
                                </button>
                                <button className="action-btn chat-btn">
                                    <IconMessageCircle size={16} />
                                    Chat
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClassFaculties;
