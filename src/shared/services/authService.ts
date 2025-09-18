import apiClient from '@/shared/api/apiClient';

// Import your pre-configured Axios instance

// This function's only job is to fetch products
const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Export all product-related functions in one object
export const authService = {
  login,
};
