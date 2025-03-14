import React, { useState, useEffect } from 'react';
import { Search, Bell, Moon, ChevronDown, User } from 'lucide-react';

const TopBar = ({ darkMode, toggleDarkMode, title = "Dashboard", onSearch }) => {
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (onSearch) {
            onSearch(searchValue);
        }
    }, [searchValue, onSearch]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div
            className={`h-12 m-1 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex items-center justify-between px-4 fixed top-0 right-0 left-16 z-10 transition-all duration-300 ease-in-out`}
            style={{ left: 'var(--sidebar-width, 4rem)' }}
        >
            {/* Page Title */}
            <div>
                <h1 className="text-lg font-semibold">{title}</h1>
            </div>

            {/* Search */}
            <div className={`flex-1 max-w-md mx-6 relative ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <Search size={14} />
                </div>
                <input
                    type="text"
                    className={`block w-full pl-8 pr-2 py-1.5 text-sm rounded-lg ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="Search..."
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
                {/* Notification Icon */}
                <button className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                    <Bell size={16} />
                </button>

                {/* Dark Mode Toggle */}
                <button
                    onClick={toggleDarkMode}
                    className={`p-1.5 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                    <Moon size={16} />
                </button>

                {/* User Profile */}
                <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={14} />
                    </div>
                    <ChevronDown size={14} className="ml-1" />
                </div>
            </div>
        </div>
    );
};

export default TopBar;