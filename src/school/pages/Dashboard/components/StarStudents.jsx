import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const StarStudents = () => {
    const students = [
        {
            name: 'Tenesa',
            class: 'XII, A',
            img: 'https://randomuser.me/api/portraits/women/44.jpg',
            rank: 1
        },
        {
            name: 'Michael',
            class: 'XI, B',
            img: 'https://randomuser.me/api/portraits/men/45.jpg',
            rank: 2
        }
    ];

    return (
        <div className="dashboard-card star-students-card">
            <div className="card-header">
                <h5>Star Students</h5>
                <div className="nav-arrows">
                    <button className="nav-arrow-btn">
                        <IconChevronLeft size={18} color="#6e6b7b" />
                    </button>
                    <button className="nav-arrow-btn">
                        <IconChevronRight size={18} color="#6e6b7b" />
                    </button>
                </div>
            </div>

            <div className="star-student-carousel">
                <div className="star-student-item">
                    <div className="star-badge">★</div>
                    <img src={students[0].img} alt={students[0].name} className="student-photo" />
                    <h6>{students[0].name}</h6>
                    <p>{students[0].class}</p>
                </div>
            </div>
        </div>
    );
};

export default StarStudents;
