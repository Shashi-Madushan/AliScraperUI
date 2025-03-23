import React, { useState } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const VerticalNavBar = ({ darkMode, isExpanded, handleMouseEnter, handleMouseLeave, activeItem, setActiveItem, navItems }) => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div
        className={`h-full fixed left-0 top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg flex flex-col transition-all duration-300 ease-in-out z-20 overflow-hidden`}
        style={{ width: isExpanded ? '12rem' : '4rem' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'} `}>
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
                  className={`flex items-center text-sm p-2 rounded-lg transition-all duration-200 ${
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
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span className={`ml-3 whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 absolute'}`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Logout Confirmation Popup */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-3">
              <button 
                className={`px-4 py-2 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VerticalNavBar;