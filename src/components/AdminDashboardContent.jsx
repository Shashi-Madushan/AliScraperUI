import React, { useEffect, useState } from 'react';
import { Users, Package, ShoppingBag, TrendingUp } from 'lucide-react';
import { getSystemStats } from '../services/adminService';

const AdminDashboardContent = ({ darkMode }) => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalStores: 0,
        newUsersThisWeek: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await getSystemStats();
                setStats({
                    totalUsers: data.totalUsers || 0,
                    totalProducts: data.totalProducts || 0,
                    totalStores: data.totalStores || 0,
                    newUsersThisWeek: data.newUsersThisWeek || 0
                });
                setError(null);
            } catch (err) {
                setError('Failed to load system statistics');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-red-900' : 'bg-red-100'} text-center`}>
                <p className={darkMode ? 'text-red-200' : 'text-red-700'}>{error}</p>
                <button 
                    className={`mt-2 px-4 py-2 rounded ${darkMode ? 'bg-red-800 hover:bg-red-700' : 'bg-red-200 hover:bg-red-300'}`}
                    onClick={() => window.location.reload()}
                >
                    Retry
                </button>
            </div>
        );
    }

    const statCards = [
        { 
            title: 'Total Users', 
            value: stats.totalUsers, 
            icon: Users, 
            color: 'blue' 
        },
        { 
            title: 'Total Products', 
            value: stats.totalProducts, 
            icon: Package, 
            color: 'green' 
        },
        { 
            title: 'Total Stores', 
            value: stats.totalStores, 
            icon: ShoppingBag, 
            color: 'purple' 
        },
        { 
            title: 'New Users (Week)', 
            value: stats.newUsersThisWeek, 
            icon: TrendingUp, 
            color: 'orange' 
        }
    ];

    return (
        <div className="space-y-6">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Admin Dashboard
            </h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((card, index) => (
                    <div 
                        key={index} 
                        className={`p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-transform hover:scale-105`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{card.title}</p>
                                <p className={`text-2xl font-bold mt-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>{card.value}</p>
                            </div>
                            <div className={`p-3 rounded-full bg-${card.color}-100 text-${card.color}-600`}>
                                <card.icon size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activities Section */}
            <div className={`mt-8 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h2>
                
                <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} pb-4 mb-4`}>
                    <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>System is running normally. All services are operational.</p>
                </div>
                
                <div className="flex justify-end">
                    <button className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-700'}`}>
                        View All Activities
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardContent;