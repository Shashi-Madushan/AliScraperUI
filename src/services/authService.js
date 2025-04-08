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

// Create a function to show custom session expiration popup
export const showSessionExpiredPopup = () => {
    // Create elements for the popup
    const overlay = document.createElement('div');
    const popup = document.createElement('div');
    const message = document.createElement('p');
    const logoutBtn = document.createElement('button');
    const stayBtn = document.createElement('button');

    // Set styles for overlay
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    // Set styles for popup
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
    popup.style.maxWidth = '400px';
    popup.style.textAlign = 'center';

    // Set content
    message.textContent = 'Your session has expired. Please log in again.';
    message.style.marginBottom = '20px';
    
    logoutBtn.textContent = 'Log Out';
    logoutBtn.style.padding = '8px 16px';
    logoutBtn.style.backgroundColor = '#dc3545';
    logoutBtn.style.color = 'white';
    logoutBtn.style.border = 'none';
    logoutBtn.style.borderRadius = '4px';
    logoutBtn.style.marginRight = '10px';
    logoutBtn.style.cursor = 'pointer';
    
    stayBtn.textContent = 'Stay on Page';
    stayBtn.style.padding = '8px 16px';
    stayBtn.style.backgroundColor = '#6c757d';
    stayBtn.style.color = 'white';
    stayBtn.style.border = 'none';
    stayBtn.style.borderRadius = '4px';
    stayBtn.style.cursor = 'pointer';

    // Add event listeners
    logoutBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
        logout();
        window.location.href = '/login';
    });

    stayBtn.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });

    // Append elements
    popup.appendChild(message);
    popup.appendChild(logoutBtn);
    popup.appendChild(stayBtn);
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Return a promise that resolves when user makes a choice
    return new Promise((resolve) => {
        logoutBtn.onclick = () => resolve(true);
        stayBtn.onclick = () => resolve(false);
    });
};

// Update the axios interceptor to use the custom popup
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            const shouldLogout = await showSessionExpiredPopup();
            if (shouldLogout) {
                logout();
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);
