import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { Shield } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await login(username, password, true); // true for admin login
            if (response.userRole === 'ADMIN') {
                navigate("/admin");
            } else {
                setError("Unauthorized access. Admin privileges required.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid credentials");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                {/* Header with Icon */}
                <div className="flex flex-col items-center mb-6">
                    <div className="p-3 rounded-full bg-blue-100 mb-2">
                        <Shield size={24} className="text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Admin Login</h2>
                    <p className="text-sm text-gray-600 mt-1">Access admin dashboard</p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 rounded bg-red-100 border border-red-400 text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                        {isLoading ? 'Signing in...' : 'Sign in to Admin'}
                    </button>
                </form>

                {/* Back to User Login Link */}
                <div className="mt-4 text-center">
                    <a 
                        href="/login"
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        Back to User Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;