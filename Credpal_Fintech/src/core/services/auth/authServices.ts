import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/auth'; // Replace with your backend URL if different

export const authServices = {
  async register(data: { name: string; email: string; password: string }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, data);
      return response.data; // Return the response data
    } catch (error) {
      throw error; // Rethrow error for handling in the UI
    }
  },

  async login(data: { email: string; password: string }) {
    const response = await axios.post(`${API_BASE_URL}/login`, data, {
      withCredentials: true, // Include cookies for JWT
    });
    return response.data; // Return the response data
  },

  async logout() {
    const response = await axios.post(`${API_BASE_URL}/logout`, {}, {
      withCredentials: true, // Include cookies for JWT
    });
    return response.data; // Return the response data
  },
};
