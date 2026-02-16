import React, { useState } from 'react';
import { IconChevronDown, IconUrgent, IconFirstAidKit } from '@tabler/icons-react';

const LeaveStatus = () => {
    const [filter, setFilter] = useState('This Month');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const leaves = [
        {
            type: 'Emergency Leave',
            date: '15 Jun 2024',
            icon: IconUrgent,
            color: '#ea5455'
        },
        {
            type: 'Medical Leave',
            date: '15 Jun 2024',
            icon: IconFirstAidKit,
            color: '#ff9f43'
        },
        {
            type: 'Medical Leave',
            date: '16 Jun 2024',
            icon: IconFirstAidKit,
            color: '#ff9f43'
        },
        {
            type: 'Fever',
            date: '16 Jun 2024',
            icon: IconFirstAidKit,
            color: '#00cfe8'
        }
    ];

    return (
        <div className="dashboard-card leave-status-card">
            <div className="card-header">
                <h5>Leave Status</h5>
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
                            {['This Month', 'This Year', 'Last Week'].map((option) => (
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
                <div className="leave-list">
                    {leaves.map((leave, index) => (
                        <div key={index} className="leave-item">
                            <div
                                className="leave-icon"
                                style={{ backgroundColor: `${leave.color}15`, color: leave.color }}
                            >
                                <leave.icon size={18} />
                            </div>
                            <div className="leave-info">
                                <h6 className="leave-type">{leave.type}</h6>
                                <span className="leave-date">Date : {leave.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeaveStatus;
