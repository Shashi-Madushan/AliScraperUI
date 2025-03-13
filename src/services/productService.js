import { apiClient } from "./authService";

export const getProducts = async () => {
    try {
        const response = await apiClient.get("/products");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export const getProduct = async (id) => {
    try {
        const response =  await apiClient.get(`/products/${id}`)
        return response.data
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}