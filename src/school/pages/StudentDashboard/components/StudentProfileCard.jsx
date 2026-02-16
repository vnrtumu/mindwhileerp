import React from 'react';
import { IconEdit, IconBook, IconFlask, IconAtom } from '@tabler/icons-react';

const StudentProfileCard = () => {
    const todaysClasses = [
        { subject: 'English', icon: IconBook, color: '#3d5ee1' },
        { subject: 'Chemistry', icon: IconFlask, color: '#ff9f43' },
        { subject: 'Physics', icon: IconAtom, color: '#28c76f' }
    ];

    return (
        <div className="student-profile-card">
            <div className="profile-header">
                <div className="profile-badge">1st Quarterly</div>
                <div className="profile-photo-container">
                    <img
                        src="https://preskool.developer24.org/html/template/assets/img/students/student-01.jpg"
                        alt="Student"
                        className="profile-photo"
                    />
                </div>
                <h3 className="profile-name">Angelo Riana</h3>
                <p className="profile-class">III, A</p>
                <button className="edit-profile-btn">
                    <IconEdit size={16} />
                    Edit Profile
                </button>
            </div>

            <div className="todays-class">
                <h4 className="section-title">Today's Class</h4>
                <div className="class-list">
                    {todaysClasses.map((item, index) => (
                        <div key={index} className="class-item">
                            <div className="class-icon" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                                <item.icon size={20} />
                            </div>
                            <span className="class-name">{item.subject}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentProfileCard;
