import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const StudentPerformance = () => {
    const [year, setYear] = useState('2024 - 2025');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const performanceData = [
        { month: 'Jan', quiz: 30, exam: 40 },
        { month: 'Feb', quiz: 45, exam: 55 },
        { month: 'Mar', quiz: 35, exam: 48 },
        { month: 'Apr', quiz: 50, exam: 60 },
        { month: 'May', quiz: 55, exam: 65 },
        { month: 'Jun', quiz: 40, exam: 52 },
        { month: 'Jul', quiz: 60, exam: 70 },
        { month: 'Aug', quiz: 48, exam: 58 },
        { month: 'Sep', quiz: 65, exam: 75 },
        { month: 'Oct', quiz: 55, exam: 68 },
        { month: 'Nov', quiz: 70, exam: 80 },
        { month: 'Dec', quiz: 58, exam: 72 }
    ];

    return (
        <div className="dashboard-card student-performance-card">
            <div className="card-header">
                <h5>Performance</h5>
                <div className="dropdown-container">
                    <button
                        className="dropdown-toggle"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        {year}
                        <IconChevronDown size={16} />
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            {['2024 - 2025', '2023 - 2024', '2022 - 2023'].map((option) => (
                                <button
                                    key={option}
                                    className="dropdown-item"
                                    onClick={() => {
                                        setYear(option);
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
                <div className="performance-area-chart">
                    <ResponsiveContainer width="100%" height={280}>
                        <AreaChart data={performanceData}>
                            <defs>
                                <linearGradient id="colorQuiz" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3d5ee1" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3d5ee1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorExam" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#28c76f" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#28c76f" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                            <XAxis
                                dataKey="month"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6e6b7b', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6e6b7b', fontSize: 12 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#fff',
                                    border: '1px solid #e9ecef',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                            />
                            <Area
                                type="monotone"
                                dataKey="quiz"
                                stroke="#3d5ee1"
                                fillOpacity={1}
                                fill="url(#colorQuiz)"
                                strokeWidth={2}
                                name="Quiz Per Month"
                            />
                            <Area
                                type="monotone"
                                dataKey="exam"
                                stroke="#28c76f"
                                fillOpacity={1}
                                fill="url(#colorExam)"
                                strokeWidth={2}
                                name="Exam Per Month"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentPerformance;
