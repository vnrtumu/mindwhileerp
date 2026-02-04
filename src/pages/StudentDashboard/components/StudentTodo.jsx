import React, { useState } from 'react';
import { IconChevronDown, IconCircleCheck, IconClock, IconCircleDashed } from '@tabler/icons-react';

const StudentTodo = () => {
    const [filter, setFilter] = useState('Today');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const todos = [
        {
            title: 'Send Reminder to Students',
            time: '01:00 PM',
            status: 'completed',
            statusLabel: 'Completed'
        },
        {
            title: 'Create Routine to new staff',
            time: '04:50 PM',
            status: 'inprogress',
            statusLabel: 'Inprogress'
        },
        {
            title: 'Extra Class Info to Students',
            time: '04:55 PM',
            status: 'pending',
            statusLabel: 'Yet to Start'
        },
        {
            title: 'Fees for Upcoming Academics',
            time: '04:55 PM',
            status: 'pending',
            statusLabel: 'Yet to Start'
        },
        {
            title: 'English - Essay on Visit',
            time: '05:55 PM',
            status: 'pending',
            statusLabel: 'Yet to Start'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed':
                return <IconCircleCheck size={18} />;
            case 'inprogress':
                return <IconClock size={18} />;
            default:
                return <IconCircleDashed size={18} />;
        }
    };

    return (
        <div className="dashboard-card student-todo-card">
            <div className="card-header">
                <h5>Todo</h5>
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
                            {['Today', 'This Month', 'This Year', 'Last Week'].map((option) => (
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
                <div className="todo-list">
                    {todos.map((todo, index) => (
                        <div key={index} className={`todo-item ${todo.status}`}>
                            <div className="todo-checkbox">
                                {getStatusIcon(todo.status)}
                            </div>
                            <div className="todo-content">
                                <h6 className="todo-title">{todo.title}</h6>
                                <span className="todo-time">{todo.time}</span>
                            </div>
                            <span className={`todo-status status-${todo.status}`}>
                                {todo.statusLabel}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentTodo;
