// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
import ProductEdit from "../components/ProductEdit";
import VerticalNavBar from "../components/VerticalNavBar";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const path = location.pathname.split('/').pop() || 'dashboard';
        setActiveItem(path);
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
            case 'product-edit':
                return <ProductEdit />;
            default:
                return <DashboardContent darkMode={darkMode} />;
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
                    title={navItems.find(item => item.id === activeItem)?.label || "Dashboard"}
                />

                <div className="min-h-0 pt-16 p-4 flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;