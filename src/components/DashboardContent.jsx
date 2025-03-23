import React, { useState, useEffect } from 'react';
import { Sun, Moon, Plus, Package, ShoppingBag, User, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { apiClient } from '../services/authService';

const DashboardContent = ({ darkMode }) => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productUrl, setProductUrl] = useState('');
    const [isScrapingUrl, setIsScrapingUrl] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/dashboard');
                setDashboardData(response.data);
                setError(null);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleScrapeUrl = async () => {
        if (!productUrl.trim()) return;

        try {
            setIsScrapingUrl(true);
            await apiClient.post(`/scrape/aliexpress?url=${encodeURIComponent(productUrl)}`);
            setProductUrl('');
            const response = await apiClient.get('/dashboard');
            setDashboardData(response.data);
        } catch (err) {
            console.error('Error scraping product:', err);
            alert('Failed to scrape product. Please check the URL and try again.');
        } finally {
            setIsScrapingUrl(false);
        }
    };

    const chartData = dashboardData?.dailyProductCounts.map(item => {
        const date = new Date(item.date);
        return {
            date: `${date.getMonth() + 1}/${date.getDate()}`,
            count: item.count
        };
    }) || [];

    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`flex items-center justify-center h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="text-red-500 text-xl">{error}</div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-6 transition-colors duration-200 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <p className={`text-lg mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Welcome back, {dashboardData?.productCount?.userName || 'User'}!
                    </p>
                </div>
            </div>

            <div className={`mb-8 p-6 rounded-xl shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                        placeholder="eg:- https://www.aliexpress.com/item/1005007688294161.html"
                        className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                            darkMode 
                                ? 'bg-gray-700 text-white placeholder-gray-400 border-gray-600' 
                                : 'bg-white text-gray-900 placeholder-gray-500 border-gray-300'
                        }`}
                    />
                    <button
                        onClick={handleScrapeUrl}
                        disabled={isScrapingUrl || !productUrl.trim()}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isScrapingUrl ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Scraping...
                            </span>
                        ) : (
                            <span className="flex items-center">
                                <Plus className="mr-2" size={18} />
                                Add Product
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[ {
                        icon: <User className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-purple-600'}`} />,
                        title: "User",
                        value: dashboardData?.productCount?.userName || 'N/A',
                        bgColor: darkMode ? 'bg-gray-800' : 'bg-white',
                        iconBg: darkMode ? 'bg-purple-900' : 'bg-purple-100'
                    },
                    {
                        icon: <Package className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-indigo-600'}`} />,
                        title: "Total Products",
                        value: dashboardData?.productCount?.count || 0,
                        bgColor: darkMode ? 'bg-gray-800' : 'bg-white',
                        iconBg: darkMode ? 'bg-indigo-900' : 'bg-indigo-100'
                    },
                    {
                        icon: <ShoppingBag className={`h-6 w-6 ${darkMode ? 'text-white' : 'text-green-600'}`} />,
                        title: "Connected Stores",
                        value: dashboardData?.connectedStores?.length || 0,
                        bgColor: darkMode ? 'bg-gray-800' : 'bg-white',
                        iconBg: darkMode ? 'bg-green-900' : 'bg-green-100'
                    }
                   
                ].map((item, index) => (
                    <div key={index} className={`${item.bgColor} p-6 rounded-xl shadow-md`}>
                        <div className="flex items-center">
                            <div className={`p-3 rounded-full ${item.iconBg} mr-4`}>
                                {item.icon}
                            </div>
                            <div>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.title}</p>
                                <h3 className="text-2xl font-bold">{item.value}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className=" p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Product Imports - Last 30 Days</h2>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'} />
                            <XAxis dataKey="date" tick={{ fill: darkMode ? '#e5e7eb' : '#1f2937' }} />
                            <YAxis tick={{ fill: darkMode ? '#e5e7eb' : '#1f2937' }} />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                                    color: darkMode ? '#e5e7eb' : '#1f2937',
                                    border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb'
                                }}
                            />
                            <Legend wrapperStyle={{ color: darkMode ? '#e5e7eb' : '#1f2937' }} />
                            <Bar dataKey="count" name="Product Imports" fill={darkMode ? 'rgba(99, 102, 241, 0.8)' : 'rgba(79, 70, 229, 0.8)'} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className=" p-6 rounded-xl shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Connected Stores</h2>
                {dashboardData?.connectedStores?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {dashboardData.connectedStores.map((store, index) => (
                            <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                                <h3 className="font-medium">{store.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{store.type}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">No stores connected yet.</p>
                )}
            </div>

            <div className=" p-6 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
                <div className="flex items-center mb-4">
                    <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-white mr-2" />
                    <span className="font-medium">Product Tracking Overview</span>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    {dashboardData?.productCount?.count > 0
                        ? `You have ${dashboardData.productCount.count} products tracked.`
                        : 'No products tracked yet. Add your first product using the form above.'}
                </p>
            </div>
            
        </div>
    );
};

export default DashboardContent;
