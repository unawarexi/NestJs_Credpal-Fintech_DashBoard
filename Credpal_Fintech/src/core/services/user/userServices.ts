/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/user';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const updateAllUsers = async (updateData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating all users:', error);
    throw error;
  }
};

export const updateUserById = async (id: string, updateData: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteAllUsers = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting all users:', error);
    throw error;
  }
};

export const deleteUserById = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
export const createUser = async (userData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const getUserByEmail = async (email: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/email/${email}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with email ${email}:`, error);
    throw error;
  }
}