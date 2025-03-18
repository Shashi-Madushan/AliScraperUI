import axios from "axios";

const API_URL = "http://localhost:8080/api";


export const login = async (username, password, isAdminLogin = false) => {
    const endpoint = isAdminLogin ? '/auth/login' : '/auth/login';
    const response = await axios.post(`${API_URL}${endpoint}`, { username, password });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", response.data.role); 
    }
    return response.data;
};

export const register = async (username, email, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, email, password });
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUserRole = () => {
    return localStorage.getItem("userRole");
};

export const isAdmin = () => {
    return localStorage.getItem("userRole") === "ADMIN";
};
export const apiClient = axios.create({
    baseURL: `${API_URL}`,
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const confirmLogout = window.confirm("Your session has expired. Would you like to log out?");
            if (confirmLogout) {
                logout();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
