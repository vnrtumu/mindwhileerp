import React, { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

const StudentExamResult = () => {
    const [filter, setFilter] = useState('1st Quarter');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const resultData = [
        { subject: 'Maths', marks: 92, color: '#3d5ee1' },
        { subject: 'Physics', marks: 85, color: '#28c76f' },
        { subject: 'Chemistry', marks: 88, color: '#ff9f43' },
        { subject: 'English', marks: 90, color: '#ea5455' },
        { subject: 'Biology', marks: 78, color: '#00cfe8' }
    ];

    const totalMarks = resultData.reduce((sum, r) => sum + r.marks, 0);
    const totalPossible = resultData.length * 100;
    const percentage = ((totalMarks / totalPossible) * 100).toFixed(0);

    return (
        <div className="dashboard-card student-exam-result-card">
            <div className="card-header">
                <h5>Exam Result</h5>
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
                            {['1st Quarter', '2nd Quarter'].map((option) => (
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
                <div className="exam-result-chart">
                    <div className="result-summary-compact">
                        <div className="percentage-badge">
                            <span className="percentage-value">{percentage}%</span>
                        </div>
                        <div className="result-info">
                            <p className="result-marks">{totalMarks} / {totalPossible}</p>
                            <span className="result-label">Total Marks</span>
                        </div>
                    </div>
                    <div className="result-bar-chart">
                        <ResponsiveContainer width="100%" height={180}>
                            <BarChart data={resultData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" horizontal={false} />
                                <XAxis type="number" domain={[0, 100]} hide />
                                <YAxis
                                    dataKey="subject"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6e6b7b', fontSize: 12 }}
                                    width={70}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e9ecef',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Bar
                                    dataKey="marks"
                                    radius={[0, 4, 4, 0]}
                                    barSize={16}
                                >
                                    {resultData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentExamResult;
