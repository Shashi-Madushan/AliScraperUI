import { apiClient } from "./authService";

export const getProducts = async () => {
    try {
        const response = await apiClient.get("/products"); // Assuming your API endpoint is `/products`
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};
