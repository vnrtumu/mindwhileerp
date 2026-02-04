import React from 'react';
import { IconDownload } from '@tabler/icons-react';

const StudentSyllabus = () => {
    const subjects = [
        { name: 'Maths', color: '#3d5ee1' },
        { name: 'Physics', color: '#28c76f' },
        { name: 'Chemistry', color: '#ff9f43' },
        { name: 'Botany', color: '#ea5455' },
        { name: 'English', color: '#00cfe8' },
        { name: 'Spanish', color: '#7367f0' },
        { name: 'Japanese', color: '#ff6b6b' }
    ];

    return (
        <div className="dashboard-card student-syllabus-card">
            <div className="card-header">
                <h5>Syllabus</h5>
            </div>
            <div className="card-body">
                <div className="syllabus-list">
                    {subjects.map((subject, index) => (
                        <div key={index} className="syllabus-item">
                            <div className="syllabus-info">
                                <span
                                    className="syllabus-dot"
                                    style={{ backgroundColor: subject.color }}
                                ></span>
                                <span className="syllabus-name">{subject.name}</span>
                            </div>
                            <button className="download-btn">
                                <IconDownload size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentSyllabus;
