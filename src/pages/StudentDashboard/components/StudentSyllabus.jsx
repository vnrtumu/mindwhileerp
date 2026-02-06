import React from 'react';
import { IconDownload } from '@tabler/icons-react';

const StudentSyllabus = () => {
    const subjects = [
        { name: 'Mathematics', color: '#3d5ee1', completed: 85 },
        { name: 'Physics', color: '#28c76f', completed: 72 },
        { name: 'Chemistry', color: '#ff9f43', completed: 68 },
        { name: 'Biology', color: '#ea5455', completed: 90 },
        { name: 'English', color: '#00cfe8', completed: 95 },
        { name: 'Hindi', color: '#7367f0', completed: 78 },
        { name: 'Computer Science', color: '#ff6b6b', completed: 60 }
    ];

    return (
        <div className="dashboard-card student-syllabus-card">
            <div className="card-header">
                <h5>Syllabus Completion</h5>
            </div>
            <div className="card-body">
                <div className="syllabus-progress-list">
                    {subjects.map((subject, index) => (
                        <div key={index} className="syllabus-progress-item">
                            <div className="syllabus-progress-header">
                                <div className="syllabus-subject-info">
                                    <span
                                        className="syllabus-color-dot"
                                        style={{ backgroundColor: subject.color }}
                                    ></span>
                                    <span className="syllabus-subject-name">{subject.name}</span>
                                </div>
                                <span className="syllabus-percent" style={{ color: subject.color }}>
                                    {subject.completed}%
                                </span>
                            </div>
                            <div className="syllabus-progress-bar">
                                <div
                                    className="syllabus-progress-fill"
                                    style={{
                                        width: `${subject.completed}%`,
                                        backgroundColor: subject.color
                                    }}
                                ></div>
                            </div>
                            <div className="syllabus-progress-footer">
                                <span className="syllabus-status">
                                    {subject.completed >= 90 ? 'Almost Complete' :
                                        subject.completed >= 70 ? 'On Track' :
                                            subject.completed >= 50 ? 'In Progress' : 'Getting Started'}
                                </span>
                                <button className="download-btn" title="Download Syllabus">
                                    <IconDownload size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentSyllabus;

