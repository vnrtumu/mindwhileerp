import React from 'react';

const TopSubjects = () => {
    const subjects = [
        { name: 'Mathematics', percentage: 95, color: '#3d5ee1' },
        { name: 'Physics', percentage: 88, color: '#22c55e' },
        { name: 'Chemistry', percentage: 82, color: '#f59e0b' },
        { name: 'Biology', percentage: 78, color: '#06b6d4' },
        { name: 'English', percentage: 75, color: '#a855f7' }
    ];

    return (
        <div className="dashboard-card top-subjects-card">
            <div className="card-header">
                <h5>Top Subjects</h5>
            </div>

            <div className="subjects-list">
                {subjects.map((subject, index) => (
                    <div key={index} className="subject-item">
                        <div className="subject-info">
                            <span className="subject-name">{subject.name}</span>
                            <span className="subject-percentage">{subject.percentage}%</span>
                        </div>
                        <div className="subject-progress">
                            <div
                                className="progress-bar"
                                style={{ width: `${subject.percentage}%`, backgroundColor: subject.color }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopSubjects;
