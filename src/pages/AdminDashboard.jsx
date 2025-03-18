// src/pages/AdminDashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Users, Package, Home, Settings, LogOut, BarChart4, Shield
} from 'lucide-react';
import TopBar from "../components/TopBar";
import VerticalNavBar from "../components/VerticalNavBar";
import AdminDashboardContent from "../components/AdminDashboardContent.jsx";
import AdminUsersContent from "../components/AdminUsersContent.jsx";
import AdminProductsContent from "../components/AdminProductsContent.jsx";
import AdminStatsContent from "../components/AdminStatsContent.jsx";


function AdminSettingsContent(props) {
    return null;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('admin-dashboard');
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const path = location.pathname.split('/').pop() || 'admin-dashboard';
        setActiveItem(path === 'admin' ? 'admin-dashboard' : path);
    }, [location.pathname]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            '--sidebar-width',
            isExpanded ? '12rem' : '4rem'
        );
    }, [isExpanded]);

    const handleMouseEnter = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    const navItems = [
        { id: 'admin-dashboard', label: 'Dashboard', icon: Home, path: '/admin' },
        { id: 'admin-users', label: 'Users', icon: Users, path: '/admin/users' },
        { id: 'admin-products', label: 'Products', icon: Package, path: '/admin/products' },
        { id: 'admin-stats', label: 'Statistics', icon: BarChart4, path: '/admin/stats' },
        { id: 'admin-settings', label: 'Settings', icon: Settings, path: '/admin/settings' },
    ];

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
 
    const renderContent = () => {
        switch (activeItem) {
            case 'admin-dashboard':
                return <AdminDashboardContent darkMode={darkMode} />;
            case 'admin-users':
                return <AdminUsersContent darkMode={darkMode} searchTerm={searchTerm} />;
            case 'admin-products':
                return <AdminProductsContent darkMode={darkMode} searchTerm={searchTerm} />;
            case 'admin-stats':
                return <AdminStatsContent darkMode={darkMode} />;
            case 'admin-settings':
                return <AdminSettingsContent darkMode={darkMode} />;
            default:
                return <AdminDashboardContent darkMode={darkMode} />;
        }
    };

    return (
        <div className={`flex h-screen w-full ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
            {/* Vertical Navigation Bar */}
            <VerticalNavBar
                darkMode={darkMode}
                isExpanded={isExpanded}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                navItems={navItems}
                logoText="ADMIN"
            />

            {/* Main Content Area */}
            <div
                className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
                style={{ marginLeft: isExpanded ? '14rem' : '4rem' }}
            >
                {/* Top Bar Component */}
                <TopBar
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    title={navItems.find(item => item.id === activeItem)?.label || "Admin Dashboard"}
                    onSearch={handleSearch}
                />

                <div className="min-h-0 pt-16 p-4 flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;