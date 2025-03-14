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
    const product = {
        "id": "67c7ef07888f520de6ae03ad",
        "productID": "1005006342015089",
        "productName": "Portable SSD 1TB/2TB External Solid State Drive USB 3.0/Type-C Hard Disk High-Speed Storage Device For Laptops/Desktop/Mac/Phone",
        "currentPrice": "LKR2,755.18",
        "originalPrice": "LKR6,122.62",
        "discount": "55% off",
        "rating": "  3.9  ",
        "soldCount": "1,000+ sold",
        "imageLinks": [
            "https://ae-pic-a1.aliexpress-media.com/kf/Sc7650b587fe346b49c6f32c2927c8ee10.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/S4dda726dc65e4372a0835a9b0bbe70a7S.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/S00dae51dc7a840f0afd83345ff9f9f41O.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/Se96226a15f2746a794fa80f1bfbca82ae.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/Sa50836f58a2f4aaba4f8551cf02b68ce7.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/S5c431a7aba0b48c78233af13f4e6db37O.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/S8e703b814958492ba066f72dd72036a1c.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/S4a8389f096af4c03b61346e5807975a9o.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/Sec6adccaac3540e99ea99e71e734f368O.jpg_220x220q75.jpg_.avif",
            "https://ae-pic-a1.aliexpress-media.com/kf/Sdf43a4e882814cde987d7a3b9ae9233b9.jpg_220x220q75.jpg_.avif"
        ],
        "videoLinks": [],
        "description": [
            {
                "attributes": {
                    "class": "description--wrap--LscZ0He",
                    "id": "nav-description"
                },
                "images": [],
                "text": "Description\nReport Item\nView more"
            }
        ],
        "specifications": {
            "Brand Name": "FULCOL",
            "Origin": "Mainland China",
            "USB Type": "USB 3.1 Type-C",
            "Use": "SSD",
            "Package": "Yes",
            "Certification": "CE,FCC,RoHS,weee"
        },
        "userName": "shashi"
    }

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };
 
    const handleBackToProducts = () => {
        setSelectedProduct(null);
    };

    const handleSearch = (searchValue) => {
        setSearchTerm(searchValue);
    };
 
    const renderContent = () => {
        if (selectedProduct) {
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