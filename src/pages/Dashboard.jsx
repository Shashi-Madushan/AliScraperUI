import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {  logout } from "../services/authService";
import {
  Search, Bell, Settings, User, Moon, ChevronDown, Grid,
  Package, CreditCard, Home, Store, LogOut
} from 'lucide-react';
import TopBar from "../components/TopBar";
import DashboardContent from "../components/DashboardContent";
import ProductsContent from "../components/ProductsContent";
import AccountContent from "../components/AccountContent";
import SettingsContent from "../components/SettingsContent";
import StoresContent from "../components/StoresContent";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    // // Check for authentication token
    // useEffect(() => {
    //     if (!getToken()) {
    //         navigate("/");
    //     }
    // }, [navigate]);

    // Set active item based on URL path only when location changes
    useEffect(() => {
        const path = location.pathname.split('/').pop() || 'dashboard';
        setActiveItem(path);
    }, [location.pathname]);

    // Update CSS variable for sidebar width
    useEffect(() => {
        document.documentElement.style.setProperty(
            '--sidebar-width',
            isExpanded ? '16rem' : '5rem'
        );
    }, [isExpanded]);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
        { id: 'products', label: 'Products', icon: Package, path: '/products' },
        { id: 'stores', label: 'My Stores', icon: Store, path: '/stores' },
        { id: 'account', label: 'My Account', icon: User, path: '/account' },
        { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
    ];

    const renderContent = () => {
        switch (activeItem) {
            case 'dashboard':
                return <DashboardContent darkMode={darkMode} />;
            case 'products':
                return <ProductsContent darkMode={darkMode} />;
            case 'account':
                return <AccountContent darkMode={darkMode} />;
            case 'settings':
                return <SettingsContent darkMode={darkMode} />;
            case 'stores':
                return <StoresContent darkMode={darkMode} />;
            default:
                return <DashboardContent darkMode={darkMode} />;
        }
    };


    return (
        <div className={`flex h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Vertical Navigation Bar */}
            <div
                className={`h-full fixed left-0 top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col transition-all duration-300 ease-in-out z-20 overflow-hidden`}
                style={{ width: isExpanded ? '16rem' : '5rem' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* Logo */}
                <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} `}>
                        <span className="text-white font-bold">AS</span>
                    </div>
                    <span className={`ml-2 font-bold text-lg whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        FREE SCRAPER
                    </span>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-2 px-2">
                        {navItems.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.path}
                                    className={`flex items-center p-2 rounded-lg transition-all duration-200 ${
                                        activeItem === item.id 
                                            ? darkMode 
                                                ? 'bg-blue-700 text-white' 
                                                : 'bg-blue-100 text-blue-700' 
                                            : darkMode 
                                                ? 'text-white hover:bg-gray-700' 
                                                : 'text-gray-800 hover:bg-gray-200'
                                    } ${isExpanded ? 'justify-start' : 'justify-center'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setActiveItem(item.id);
                                    }}
                                >
                                    <item.icon size={18} />
                                    <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 absolute'}`}>
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>



                {/* Logout Button */}
                <div className="p-2 mb-4">
                    <button
                        className={`w-full flex items-center p-2 rounded-lg ${
                            darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-800 hover:bg-gray-200'
                        } ${isExpanded ? 'justify-start' : 'justify-center'}`}
                        onClick={() => {
                            logout();
                            navigate("/login");
                        }}
                    >
                        <LogOut size={18} />
                        <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 absolute'}`}>
                            Logout
                        </span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div
                className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
                style={{ marginLeft: isExpanded ? '16rem' : '5rem' }}
            >
                {/* Top Bar Component */}
                <TopBar
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    title={navItems.find(item => item.id === activeItem)?.label || "Dashboard"}
                />

                <div className="min-h-0 pt-24 p-6 flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;