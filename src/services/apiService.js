import axios from 'axios';

// Create a dedicated Axios instance pointing to JSONPlaceholder API
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Service function to fetch users list
export const fetchUsersApi = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};