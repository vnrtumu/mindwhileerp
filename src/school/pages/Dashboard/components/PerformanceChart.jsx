import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const PerformanceChart = () => {
    const data = [
        { name: 'Top', value: 45, color: '#3d5ee1' },
        { name: 'Average', value: 11, color: '#ff9f43' },
        { name: 'Below Avg', value: 2, color: '#ea5455' }
    ];

    return (
        <div className="dashboard-card performance-chart-card">
            <div className="card-header">
                <h5>Performance</h5>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                        <Pie
                            data={data}
                            innerRadius={60}
                            outerRadius={85}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Legend
                            verticalAlign="bottom"
                            iconType="circle"
                            formatter={(value, entry) => (
                                <span style={{ color: '#6e6b7b', fontSize: '13px' }}>
                                    {value}: {entry.payload.value}
                                </span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PerformanceChart;
