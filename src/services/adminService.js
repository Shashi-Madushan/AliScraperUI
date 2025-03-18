import { apiClient } from "./authService";

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await apiClient.get("/admin/users");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Change user role
export const changeUserRole = async (userId, role) => {
  try {
    const response = await apiClient.post(`/admin/users/${userId}/change-role?role=${role}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get all products (from all users)
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/admin/products");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a product
export const deleteProduct = async (productId) => {
  try {
    const response = await apiClient.delete(`/admin/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Get system statistics
export const getSystemStats = async () => {
  try {
    const response = await apiClient.get("/admin/stats");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};