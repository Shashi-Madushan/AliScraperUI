import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminStatsContent = ({ darkMode }) => {
    // Mock data - replace with real data from your API
    const monthlyStats = [
        { name: 'Jan', users: 4000, products: 2400, stores: 2400 },
        { name: 'Feb', users: 3000, products: 1398, stores: 2210 },
        { name: 'Mar', users: 2000, products: 9800, stores: 2290 },
        { name: 'Apr', users: 2780, products: 3908, stores: 2000 },
        { name: 'May', users: 1890, products: 4800, stores: 2181 },
        { name: 'Jun', users: 2390, products: 3800, stores: 2500 },
    ];

    return (
        <div className="space-y-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                System Statistics
            </h1>

            <div className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Monthly Growth
                </h2>
                <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={monthlyStats}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="users" fill="#8884d8" />
                            <Bar dataKey="products" fill="#82ca9d" />
                            <Bar dataKey="stores" fill="#ffc658" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminStatsContent;