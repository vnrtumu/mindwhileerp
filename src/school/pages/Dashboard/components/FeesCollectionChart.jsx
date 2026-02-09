import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FeesCollectionChart = () => {
    const data = [
        { name: 'Q1 2023', collected: 45000, total: 50000 },
        { name: 'Q2 2023', collected: 48000, total: 52000 },
        { name: 'Q3 2023', collected: 42000, total: 55000 },
        { name: 'Q4 2023', collected: 52000, total: 58000 },
        { name: 'Q1 2024', collected: 55000, total: 60000 },
        { name: 'Q2 2024', collected: 58000, total: 62000 },
        { name: 'Q3 2024', collected: 54000, total: 65000 },
        { name: 'Q4 2024', collected: 60000, total: 68000 }
    ];

    return (
        <div className="dashboard-card fees-chart-card">
            <div className="card-header">
                <h5>Fees Collection</h5>
                <select className="period-select">
                    <option>Last 8 Quarter</option>
                    <option>Last 4 Quarter</option>
                    <option>Last Year</option>
                </select>
            </div>

            <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} barSize={12}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6e6b7b' }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6e6b7b' }}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            formatter={(value) => [`$${value.toLocaleString()}`, '']}
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                        />
                        <Legend iconType="circle" />
                        <Bar dataKey="collected" name="Collected Fee" fill="#3d5ee1" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" name="Total Fee" fill="#a855f7" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default FeesCollectionChart;
