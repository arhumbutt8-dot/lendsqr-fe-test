import axios, { AxiosError } from 'axios';
import type { User } from '@/types';
import { generateMockUsers } from './mockData';

const API_URL = import.meta.env.VITE_API_URL as string;
const IS_PLACEHOLDER = !API_URL || API_URL.includes('YOUR_MOCK_ID');

const apiClient = axios.create({
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const message =
      error.response?.status === 404
        ? 'Data endpoint not found. Please check your VITE_API_URL.'
        : error.message || 'An unexpected error occurred.';
    return Promise.reject(new Error(message));
  }
);

export async function fetchUsers(): Promise<User[]> {
  // Use built-in mock data when no real API URL is configured
  if (IS_PLACEHOLDER) {
    return new Promise((resolve) =>
      setTimeout(() => resolve(generateMockUsers(500)), 800)
    );
  }

  try {
    const response = await apiClient.get<User[]>(API_URL);
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid data format: expected an array of users.');
    }
    return response.data;
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
    throw new Error('Failed to fetch users.');
  }
}
