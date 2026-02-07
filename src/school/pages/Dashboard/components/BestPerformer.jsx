import React from 'react';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

const BestPerformer = () => {
    const performers = [
        {
            name: 'Rubell',
            subject: 'Physics Teacher',
            img: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
    ];

    return (
        <div className="dashboard-card best-performer-card">
            <div className="card-header">
                <h5>Best Performer</h5>
                <div className="nav-arrows">
                    <button className="nav-arrow-btn">
                        <IconChevronLeft size={18} color="#6e6b7b" />
                    </button>
                    <button className="nav-arrow-btn">
                        <IconChevronRight size={18} color="#6e6b7b" />
                    </button>
                </div>
            </div>

            <div className="performer-carousel">
                <div className="performer-item">
                    <img src={performers[0].img} alt={performers[0].name} className="performer-photo" />
                    <h6>{performers[0].name}</h6>
                    <p>{performers[0].subject}</p>
                    <span className="performer-badge">🏆</span>
                </div>
            </div>
        </div>
    );
};

export default BestPerformer;
