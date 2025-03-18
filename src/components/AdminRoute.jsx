import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";
import { useState, useEffect } from "react";
import { apiClient } from "../services/authService";

const AdminRoute = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!getToken()) {
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get("/auth/check-admin");
                setIsAdmin(response.data.isAdmin);
            } catch (error) {
                console.error("Failed to verify admin status:", error);
                setIsAdmin(false);
            } finally {
                setLoading(false);
            }
        };

        checkAdminStatus();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;