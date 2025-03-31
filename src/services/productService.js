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
};

export const deleteProduct = async (id) => {
  try {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productDto) => {
    try {
        // The productDto parameter is sent as the request body in this PUT request
        const response = await apiClient.put(`/products/${id}`, productDto);
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error.response ? error.response.data : error;
    }
};