import React from 'react';
import { Search, Bell, Moon, ChevronDown, User } from 'lucide-react';

const TopBar = ({ darkMode, toggleDarkMode, title = "Dashboard" }) => {
    return (
        <div
            className={`h-14 m-2 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm flex items-center justify-between px-6 fixed top-0 right-0 left-16 z-10 transition-all duration-300 ease-in-out`}
            style={{ left: 'var(--sidebar-width, 5rem)' }}
        >
            {/* Page Title */}
            <div>
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>

            {/* Search */}
            <div className={`flex-1 max-w-md mx-8 relative ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search size={16} />
                </div>
                <input
                    type="text"
                    className={`block w-full pl-10 pr-3 py-2 rounded-lg ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
                    } border focus:outline-none focus:ring-1 focus:ring-blue-500`}
                    placeholder="Search..."
                />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                    <Moon size={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                    <Bell size={20} />
                </button>
                <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                        <User size={16} />
                    </div>
                    <ChevronDown size={16} />
                </div>
            </div>
        </div>
    );
};

export default TopBar;