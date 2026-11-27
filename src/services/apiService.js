import axios from 'axios';

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

const supabaseApi = axios.create({
  baseURL: `${SUPABASE_URL}/rest/v1`,
  headers: {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
});

// READ: Fetch all users
export const fetchUsersApi = async () => {
  const response = await supabaseApi.get('/user?select=*&order=id.desc');
  return response.data;
};

// CREATE: Insert a new user
export const createUserApi = async (userData) => {
  const response = await supabaseApi.post('/user', userData);
  return response.data[0];
};

// UPDATE: Update an existing user by id
export const updateUserApi = async ({ id, ...updates }) => {
  const response = await supabaseApi.patch(`/user?id=eq.${id}`, updates);
  return response.data[0];
};

// DELETE: Delete a user by id
export const deleteUserApi = async (id) => {
  await supabaseApi.delete(`/user?id=eq.${id}`);
  return id;
};