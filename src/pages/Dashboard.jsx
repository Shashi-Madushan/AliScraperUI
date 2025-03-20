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
import VerticalNavBar from "../components/VerticalNavBar";
import ProductEdit from "../components/ProductEdit";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [darkMode, setDarkMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeItem, setActiveItem] = useState('dashboard');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        // Update to handle both direct URLs and navigation
        const path = location.pathname.split('/').pop() || 'dashboard';
        setActiveItem(path);
        // Reset selected product when not on products page
        if (path !== 'products') {
            setSelectedProduct(null);
        }
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


    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };
 
    const handleBackToProducts = () => {
        setSelectedProduct(null);
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };

    // Update the navigation handler to use full paths
    const handleNavItemClick = (itemId) => {
        setActiveItem(itemId);
        setSelectedProduct(null);
        navigate(`/${itemId}`);
    };
 
    const renderContent = () => {
        if (selectedProduct && activeItem === 'products') {
            return <ProductEdit product={selectedProduct} onBack={handleBackToProducts} darkMode={darkMode} />;
        }
 
        switch (activeItem) {
            case 'dashboard':
                return <DashboardContent darkMode={darkMode} />;
            case 'products':
                return <ProductsContent darkMode={darkMode} onProductSelect={handleProductSelect} searchTerm={searchTerm} />;
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
            <VerticalNavBar
                darkMode={darkMode}
                isExpanded={isExpanded}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                activeItem={activeItem}
                setActiveItem={handleNavItemClick} // Updated to use new handler
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
                    onSearch={handleSearch}
                />

                <div className="min-h-0 pt-16 p-4 flex-1 overflow-auto">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
