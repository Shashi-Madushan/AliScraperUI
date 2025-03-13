import axios from "axios";

const API_URL = "http://localhost:8080";


export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, { username, password });
    if (response.data.token) {
        localStorage.setItem("token", response.data.token);
    }
    return response.data;
};

export const register = async (username, email, password) => {
    return await axios.post(`${API_URL}/auth/register`, { username, email, password });
};

export const logout = () => {
    localStorage.removeItem("token");
};

export const getToken = () => {
    return localStorage.getItem("token");
};
export const apiClient = axios.create({
    baseURL: `${API_URL}/api`,
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
                localStorage.removeItem("token");
                window.location.href = "/login"; // Redirect to login page
            }
        }
        return Promise.reject(error);
    }
);