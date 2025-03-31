import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { User, Sun, Moon } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode ? JSON.parse(savedMode) : false;
    });
    const navigate = useNavigate();

    // Effect to apply dark mode to document root
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem('darkMode', JSON.stringify(newMode));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await login(username, password);
            // Navigate based on user role
            if (response && response.role === 'ADMIN') {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} transition-colors duration-200`}>
            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleDarkMode}
                className={`fixed top-4 right-4 p-2 rounded-full ${
                    darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-white text-gray-800 shadow-md'
                }`}
                aria-label="Toggle dark mode"
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <div className={`w-full max-w-md px-4 py-8 mx-auto rounded-lg shadow-md ${
                darkMode ? 'bg-gray-800' : 'bg-white'
            } transition-colors duration-200`}>
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-6">
                    <div className={`p-3 rounded-full ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'} mb-2`}>
                        <User size={24} className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Login</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Access your account</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className={`mb-4 p-3 rounded ${
                        darkMode ? 'bg-red-900/30 border-red-800 text-red-400' : 'bg-red-100 border border-red-400 text-red-700'
                    } text-sm`}>
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className={`block text-sm font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}>
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            className={`w-full p-2 border rounded-md focus:outline-none ${
                                darkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className={`block text-sm font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}>
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className={`w-full p-2 border rounded-md focus:outline-none ${
                                darkMode 
                                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500' 
                                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                {/* Links */}
                <div className="mt-4 flex flex-col items-center space-y-2">
                    <a 
                        href="/register" 
                        className={`text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'}`}
                    >
                        Don't have an account? Register
                    </a>
                    <div className={`border-t w-full my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                    <a 
                        href="/admin/login"
                        className={`text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-500'}`}
                    >
                        Admin Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
