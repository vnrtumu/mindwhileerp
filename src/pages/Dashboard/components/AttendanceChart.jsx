import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const AttendanceChart = () => {
    const [activeTab, setActiveTab] = useState('students');

    const data = [
        { name: 'Present', value: 98.8, color: '#3d5ee1' },
        { name: 'Absent', value: 0.8, color: '#ea5455' },
        { name: 'Late', value: 0.4, color: '#ff9f43' }
    ];

    const stats = {
        students: { emergency: 28, absent: 1, late: 1, present: 98.8 },
        teachers: { emergency: 5, absent: 2, late: 0, present: 96.5 },
        staff: { emergency: 3, absent: 1, late: 2, present: 97.2 }
    };

    const currentStats = stats[activeTab];

    return (
        <div className="dashboard-card attendance-card">
            <div className="card-header">
                <h5>Attendance</h5>
            </div>

            <div className="attendance-tabs">
                <button
                    className={activeTab === 'students' ? 'active' : ''}
                    onClick={() => setActiveTab('students')}
                >
                    Students
                </button>
                <button
                    className={activeTab === 'teachers' ? 'active' : ''}
                    onClick={() => setActiveTab('teachers')}
                >
                    Teachers
                </button>
                <button
                    className={activeTab === 'staff' ? 'active' : ''}
                    onClick={() => setActiveTab('staff')}
                >
                    Staff
                </button>
            </div>

            <div className="attendance-chart">
                <ResponsiveContainer width="100%" height={180}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={55}
                            outerRadius={75}
                            dataKey="value"
                            startAngle={90}
                            endAngle={-270}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-center">
                    <span className="percentage">{currentStats.present}%</span>
                </div>
            </div>

            <div className="attendance-legend">
                <div className="legend-item">
                    <span className="dot emergency"></span>
                    <span>Emergency: {currentStats.emergency}</span>
                </div>
                <div className="legend-item">
                    <span className="dot absent"></span>
                    <span>Absent: {String(currentStats.absent).padStart(2, '0')}</span>
                </div>
                <div className="legend-item">
                    <span className="dot late"></span>
                    <span>Late: {String(currentStats.late).padStart(2, '0')}</span>
                </div>
            </div>
        </div>
    );
};

export default AttendanceChart;
