import React, { useRef } from 'react';
import { IconChevronLeft, IconChevronRight, IconBus, IconBook, IconClipboard, IconToolsKitchen2, IconHome } from '@tabler/icons-react';

const StudentFeesReminder = () => {
    const scrollRef = useRef(null);

    const fees = [
        {
            type: 'Transport Fees',
            amount: '$2500',
            lastDate: '25 May 2024',
            icon: IconBus,
            color: '#3d5ee1'
        },
        {
            type: 'Book Fees',
            amount: '$2500',
            lastDate: '25 May 2024',
            icon: IconBook,
            color: '#28c76f'
        },
        {
            type: 'Exam Fees',
            amount: '$2500',
            lastDate: '25 May 2024',
            icon: IconClipboard,
            color: '#ff9f43'
        },
        {
            type: 'Mess Fees Due',
            amount: '$2500 + $150',
            lastDate: '27 May 2024',
            icon: IconToolsKitchen2,
            color: '#ea5455'
        },
        {
            type: 'Hostel',
            amount: '$2500',
            lastDate: '25 May 2024',
            icon: IconHome,
            color: '#00cfe8'
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 220;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="dashboard-card fees-reminder-card">
            <div className="card-header">
                <h5>Fees Reminder</h5>
                <a href="/fees-assign" className="view-all">View All</a>
            </div>
            <div className="card-body">
                <div className="fees-scroll-container">
                    <button className="scroll-btn left" onClick={() => scroll('left')}>
                        <IconChevronLeft size={18} />
                    </button>
                    <div className="fees-list" ref={scrollRef}>
                        {fees.map((fee, index) => (
                            <div key={index} className="fee-card">
                                <div
                                    className="fee-icon"
                                    style={{ backgroundColor: `${fee.color}15`, color: fee.color }}
                                >
                                    <fee.icon size={22} />
                                </div>
                                <h6 className="fee-type">{fee.type}</h6>
                                <p className="fee-amount">{fee.amount}</p>
                                <div className="fee-date">
                                    <span>Last Date</span>
                                    <strong>{fee.lastDate}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="scroll-btn right" onClick={() => scroll('right')}>
                        <IconChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentFeesReminder;
