import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const FinanceCards = () => {
    const earningsData = [
        { value: 30 }, { value: 45 }, { value: 35 }, { value: 50 },
        { value: 40 }, { value: 55 }, { value: 45 }, { value: 60 }
    ];

    const expensesData = [
        { value: 40 }, { value: 35 }, { value: 45 }, { value: 30 },
        { value: 50 }, { value: 35 }, { value: 55 }, { value: 40 }
    ];

    return (
        <div className="finance-cards-wrapper">
            <div className="dashboard-card finance-card earnings">
                <div className="finance-header">
                    <span className="finance-label">Total Earnings</span>
                    <span className="finance-trend up">
                        <IconArrowUpRight size={14} /> 1.2%
                    </span>
                </div>
                <h3 className="finance-value">$64,522,24</h3>
                <div className="mini-chart">
                    <ResponsiveContainer width="100%" height={50}>
                        <LineChart data={earningsData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#22c55e"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="dashboard-card finance-card expenses">
                <div className="finance-header">
                    <span className="finance-label">Total Expenses</span>
                    <span className="finance-trend down">
                        <IconArrowDownRight size={14} /> 0.8%
                    </span>
                </div>
                <h3 className="finance-value">$60,522,24</h3>
                <div className="mini-chart">
                    <ResponsiveContainer width="100%" height={50}>
                        <LineChart data={expensesData}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default FinanceCards;
